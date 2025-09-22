<script setup lang="ts">
import { fetchFile } from '@ffmpeg/util';
import type { FileManager } from '~/types/models';
const {
  file,
  thumbnailCount = 6,
  limitDuration = 120
} = defineProps<{
  file: File
  thumbnailCount?: number
  limitDuration?: number //180 second
}>()
const emit = defineEmits<{
  'on-submit': [f: FileManager]
}>()
const { $FFmpeg } = useNuxtApp()
const FFmpeg = $FFmpeg
const ffmpeg = new FFmpeg()
const { required } = useValidation()
const { appLoading } = useBase()
const videoEditorHiddenRef = ref<HTMLVideoElement | null>(null)
const posterRef = ref<HTMLCanvasElement | null>(null)

const thumbnailFiles = ref<File[]>([])
const thumbnailBase64Items = ref<string[]>([])
const showThumbnailSelect = ref<boolean>(false)
const entity = ref<FileManager>()
const showPreview = ref<boolean>(false)
const previewTimeout = ref<any>()

// trim video
const duration = ref<number>(0)
const range = ref<{ min: number; max: number }>({ min: 0, max: 0 })
const trimmedUrl = ref<string | null>(null)
const trimBlob = ref<Blob>()
/*
const captureFrameAt = (timeInSeconds: number) => {
  if (!videoEditorHiddenRef.value || !posterRef.value) return

  // Seek video to requested time
  videoEditorHiddenRef.value.currentTime = timeInSeconds

  // When seeked → capture frame
  videoEditorHiddenRef.value.addEventListener(
    'seeked',
    () => {
      const canvas = posterRef.value!
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = videoEditorHiddenRef.value!.videoWidth
      canvas.height = videoEditorHiddenRef.value!.videoHeight
      ctx.drawImage(videoEditorHiddenRef.value as HTMLVideoElement, 0, 0)

      posterUrl.value = canvas.toDataURL('image/jpeg')
    },
    { once: true }
  )
}
const handleFileChange = (): Promise<void> => {
  // Load video into hidden player
  if (!file) {
    return new Promise(resolve => resolve(undefined))
  }
  const videoUrl = URL.createObjectURL(file)
  console.log('videoUrl', videoUrl)
  if (videoEditorHiddenRef.value) {
    videoEditorHiddenRef.value.src = videoUrl
    videoEditorHiddenRef.value.load()

    // Wait until video metadata is loaded so we know duration, dimensions
    videoEditorHiddenRef.value.addEventListener(
      'loadedmetadata',
      () => {
        const captureTime = Math.min(3, videoEditorHiddenRef.value!.duration - 0.5) // pick 3s or near end
        captureFrameAt(captureTime)
      },
      { once: true }
    )
  }
  return new Promise(resolve => resolve(undefined))
}
*/

const validateDuration = computed<boolean>(() => {
  if (!entity.value || !entity.value?.duration) return false
  if (entity.value.duration <= limitDuration) return true
  return false
})
const validateTrimDuration = computed<boolean>(() => {
  const trimDuration = range.value.max - range.value.min
  if (trimDuration <= limitDuration) return true
  return false
})
const canTrimVideo = computed<boolean>(() => {
  const trimDuration = range.value.max - range.value.min
  return validateTrimDuration.value && trimDuration > 0 && trimDuration !== duration.value
})
const canSubmit = computed<boolean>(() => {
  return validateDuration.value && validateTrimDuration.value
})

const initialFile = async () => {
  if (!videoEditorHiddenRef.value || !file) throw new Error('videoRef not ready')
  appLoading()

  thumbnailBase64Items.value = []
  const video = videoEditorHiddenRef.value
  const videoUrl = URL.createObjectURL(file)
  video.src = videoUrl
  video.preload = 'auto'
  video.muted = true

  return new Promise((resolve, reject) => {
    video.onloadedmetadata = async () => {
      try {
        duration.value = video.duration
        range.value = { min: 0, max: duration.value }

        const frames: File[] = []
        const interval = duration.value / (thumbnailCount + 1)

        for (let i = 1; i <= thumbnailCount; i++) {
          const time = Math.min(i * interval, duration.value - 0.1)
          const base64 = await captureFrameFromVideo(video, time)
          //   const thumbFile = base64ToFile(base64, `thumb_${i}.jpg`)
          //   frames.push(thumbFile)
          thumbnailBase64Items.value.push(base64)
        }

        entity.value = {
          id: null,
          fileMime: file.type,
          fileName: file.name,
          filePath: videoUrl,
          // fileThumbnailPath: thumbnailBase64Items.value[0] || '',
          fileThumbnailPath: '',
          fileSize: file.size + '',
          file: null,
          fileMimeType: 'VIDEO',
          thumbnailFile: null,
          duration: duration.value,
          title: '',
          description: '',
          width: video.videoWidth,
          height: video.videoHeight
        }

        // ✅ cleanup video
        video.pause()
        // URL.revokeObjectURL(video.src)
        video.removeAttribute('src')
        video.load()

        resolve(frames)
      } catch (err) {
        reject(err)
      } finally {
        appLoading(false)
      }
    }

    video.onerror = err => reject(err)
  })
}

const onThumbnailAdd = (files: File[]) => {
  if (files[0] && entity.value) {
    const tnUrl = URL.createObjectURL(files[0])
    if (tnUrl) {
      entity.value.fileThumbnailPath = tnUrl
      entity.value.thumbnailFile = files[0]
      onReloadPreview()
    }
  }
}
const onSelectThumbnail = async (index: number) => {
  if (index >= 0 && entity.value) {
    const tnbase64 = thumbnailBase64Items.value[index]
    if (tnbase64) {
      entity.value.fileThumbnailPath = tnbase64
      const tnFile = await base64ToFile(tnbase64, `thumb_${index}.jpg`)
      if (tnFile) {
        entity.value.thumbnailFile = tnFile
      }

      onReloadPreview()
    }
  }
}
const onReloadPreview = () => {
  showPreview.value = false
  previewTimeout.value = setTimeout(() => {
    showPreview.value = true
  }, 500)
}

// Trimg video
const loadFFmpeg = async () => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load()
  }
}
const trimVideo = async () => {
  if (!file) return
  appLoading()
  await loadFFmpeg()
  const start = range.value.min
  const trimDuration = range.value.max - range.value.min
  // Write input
  await ffmpeg.writeFile('input.mp4', await fetchFile(file))
  // Run ffmpeg
  await ffmpeg.exec([
    '-ss',
    start.toString(),
    '-t',
    trimDuration.toString(),
    '-i',
    'input.mp4',
    '-c',
    'copy',
    'output.mp4'
  ])
  // Read output
  const data = await ffmpeg.readFile('output.mp4') // returns FileData
  if (data) {
    trimBlob.value = new Blob([(data as any).buffer], { type: 'video/mp4' }) // use .data
    if (trimBlob.value) {
      const trimmedUrl = URL.createObjectURL(trimBlob.value)
      if (trimmedUrl && entity.value) {
        // const trimFile = await blobToFile(blob, entity.value.fileName)
        entity.value.duration = trimDuration
        entity.value.filePath = trimmedUrl
        onReloadPreview()
      }
    }
  }

  appLoading(false)
}
const onSubmit = async () => {
  if (!canSubmit.value || !entity.value) {
    return
  }

  if (trimBlob.value) {
    const trimFile = await blobToFile(trimBlob.value, entity.value.fileName)
    if (trimFile) {
      entity.value.file = trimFile
    }
  }
  if (!entity.value.file) {
    entity.value.file = file
  }

  entity.value.fileSize = entity.value.file.size + ''
  emit('on-submit', entity.value)
}
const onClearProcess = () => {
  if (previewTimeout.value) {
    clearTimeout(previewTimeout.value)
    previewTimeout.value = undefined
  }
  if (entity.value) {
    if (entity.value.filePath) {
      URL.revokeObjectURL(entity.value.filePath)
    }
  }
  if (trimmedUrl.value) {
    URL.revokeObjectURL(trimmedUrl.value)
  }
  showPreview.value = false
}
onMounted(async () => {
  await nextTick()
  await initialFile()
  if (entity.value && !entity.value.fileThumbnailPath && thumbnailBase64Items.value.length > 0) {
    onSelectThumbnail(0)
  } else {
    onReloadPreview()
  }
})
onUnmounted(() => {
  onClearProcess()
})
</script>
<template>
  <div :style="{minHeight: '350px'}">
    <q-form @submit="onSubmit">
      <div class="row">
        <div class="col-12 col-md-7 q-pa-md">
          <template v-if="entity">
            <BaseTextHeader :title="$t('base.detail')" />
            <BaseInput
              v-model="entity.title"
              required
              :label="$t('base.title')"
              :rules="[required]"
              class="q-mb-md"
            />
            <BaseInput
              v-model="entity.description"
              type="textarea"
              :label="$t('base.description')"
            />
            <q-list dense class="q-py-md">
              <q-item>
                <q-item-section avatar>
                  <BaseIcon name="lucide:text-cursor-input" icon-set="nuxt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>{{ $t('drive.filename') }}</q-item-label>
                  <q-item-label>{{ entity.fileName }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <BaseIcon name="lucide:clock" icon-set="nuxt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>{{ $t('drive.duration') }}</q-item-label>
                  <q-item-label>{{ formatDurationHMS(entity?.duration || 0) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <BaseTextHeader :title="$t('drive.thumbnails')" />
            <template v-if="showThumbnailSelect && thumbnailBase64Items.length > 0">
              <BaseCard flat :subtitle="$t('drive.selectThumbnailFromVideo2')">
                <template #end>
                  <BaseButton flat round @click="showThumbnailSelect = false">
                    <BaseIcon name="hugeicons:cancel-01" icon-set="nuxt" />
                  </BaseButton>
                </template>
                <div class="row q-my-md">
                  <div
                    v-for="(tn, tnIndex) in thumbnailBase64Items"
                    :key="`${tnIndex}-${tn}`"
                    class="col-12 col-md-2 q-pa-sm"
                  >
                    <div style="overflow: hidden" class="app-border-radius">
                      <BaseImage
                        class="app-border-radius cursor-pointer"
                        :class="{ 'thumbnail-selectd': entity.fileThumbnailPath === tn }"
                        :src="tn"
                        :ratio="16 / 9"
                        fit="contain"
                        image-bg
                        hover-zoom
                        style="width: 100%; max-height: 120px"
                        @click="onSelectThumbnail(tnIndex)"
                      >
                        <BaseIcon
                          v-if="entity.fileThumbnailPath === tn"
                          name="hugeicons:checkmark-circle-02"
                          icon-set="nuxt"
                          color="white"
                          size="40px"
                          class="absolute-center"
                        />
                      </BaseImage>
                    </div>
                  </div>
                </div>
              </BaseCard>
            </template>
            <div class="row">
              <div class="col-12 col-md-4 text-center q-pa-md">
                <BaseImage
                  v-if="entity.fileThumbnailPath"
                  :src="entity.fileThumbnailPath"
                  :ratio="16 / 9"
                  fit="contain"
                  image-bg
                  style="width: 100%"
                  class="app-border-radius"
                >
                  <BaseIcon
                    name="hugeicons:play-circle-02"
                    icon-set="nuxt"
                    color="white"
                    size="40px"
                    class="absolute-center"
                  />
                </BaseImage>
              </div>
              <div class="col-12 col-md-4 text-center q-pa-sm">
                <div class="row justify-end">
                  <BaseFilePicker
                    :multiple="false"
                    :show-preview="false"
                    accept=".jpg,.png"
                    @on-file-add="onThumbnailAdd"
                  >
                    <div
                      class="text-center app-border-radius q-py-md"
                      style="border: 1px dashed #ccc; width: 200px; height: 120px; overflow: hidden"
                    >
                      <q-avatar square>
                        <BaseIcon name="lucide:image-plus" icon-set="nuxt" />
                      </q-avatar>
                      <p class="text-muted">{{ $t('drive.newFile') }}</p>
                    </div>
                  </BaseFilePicker>
                </div>
              </div>
              <div v-if="!showThumbnailSelect" class="col-12 col-md-4 text-center q-pa-sm">
                <div
                  class="app-border-radius cursor-pointer q-py-md"
                  style="border: 1px dashed #ccc; height: 120px"
                  @click="showThumbnailSelect = true"
                >
                  <q-avatar square>
                    <BaseIcon name="lucide:wand-sparkles" icon-set="nuxt" />
                  </q-avatar>
                  <p class="text-muted">{{ $t('drive.selectThumbnailFromVideo') }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="col-12 col-md-5 q-pa-md">
          <template v-if="entity">
            <div class="row q-pb-md justify-center">
              <LazyBaseVideoPlayer
                v-if="showPreview && entity.filePath"
                :options="{
                  autoSetSource: true
                }"
                :file="entity"
                style="width: 90%"
              >
              </LazyBaseVideoPlayer>
              <LazyBaseSpinner v-else/>
            </div>

            <BaseCard :title="$t('drive.trimVideo')">
              <BaseCardSection>
                <LazyBaseAlert v-if="!canSubmit" type="is-danger" :closeable="false">
                  <p v-if="!validateDuration || !validateTrimDuration">
                    {{ $t('drive.longVideoAlert', [limitDuration]) }}
                  </p>
                </LazyBaseAlert>

                <div class="q-pt-lg">
                  <q-range
                    v-model="range"
                    :min="0"
                    :max="duration"
                    :step="1"
                    label-always
                    drag-range
                    :left-label-value="formatDurationHMS(range.min)"
                    :right-label-value="formatDurationHMS(range.max)"
                    :color="validateTrimDuration ? 'positive' : 'danger'"
                  />
                  <q-item>
                    <q-item-section avatar>
                      <BaseIcon
                        :name="validateTrimDuration ? 'lucide:check' : 'lucide:file-warning'"
                        icon-set="nuxt"
                        :color="validateTrimDuration ? 'positive' : 'danger'"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption> {{ $t('drive.trimTextHelp2') }} </q-item-label>
                      <q-item-label>
                        {{
                          $t('drive.trimTextHelp', [
                            formatDurationHMS(range.min),
                            formatDurationHMS(range.max),
                            removeDecimal(range.max - range.min)
                          ])
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <BaseButton :disable="!canTrimVideo" full color="dark" @click="trimVideo">
                    <BaseIcon name="lucide:scissors" icon-set="nuxt" />
                    <span>{{ $t('base.cut') }}</span>
                  </BaseButton>
                </div>
              </BaseCardSection>
            </BaseCard>
          </template>
          <!-- Hidden video (for capturing frame) -->
          <video ref="videoEditorHiddenRef" style="display: none"></video>
          <canvas ref="posterRef" style="display: none"></canvas>

          <div class="col-12">
            <BaseButton
              full
              :label="$t('base.okay')"
              :disable="!canSubmit"
              size="lg"
              type="submit"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>
<style lang="css" scoped>
.thumbnail-selectd {
  border: 4px solid var(--video-player-color) !important;
}
</style>
