<script setup lang="ts">
import type { FileManager } from '~/types/models'

const {
  file,
  thumbnailCount = 4,
  limitDuration = 120
} = defineProps<{
  file: File
  thumbnailCount?: number
  limitDuration?: number //180 second
}>()

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
  if (!entity.value || !entity.value.videoDetail?.duration) return false
  if (entity.value.videoDetail.duration <= limitDuration) return true
  return false
})

const canSubmit = computed<boolean>(() => {
  return validateDuration.value
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
        const duration = video.duration

        const frames: File[] = []
        const interval = duration / (thumbnailCount + 1)

        for (let i = 1; i <= thumbnailCount; i++) {
          const time = Math.min(i * interval, duration - 0.1)
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
          fileThumbnailPath: thumbnailBase64Items.value[0] || '',
          fileSize: formatBytes(file.size),
          fileSizeNo: file.size,
          video: true,
          videoDetail: {
            thumbnailFile: null,
            duration: duration,
            title: '',
            description: ''
          }
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
  console.log('onThumbnailAdd', files)
  if (files[0] && entity.value && entity.value.videoDetail) {
    const tnUrl = URL.createObjectURL(files[0])
    if (tnUrl) {
      entity.value.fileThumbnailPath = tnUrl
      entity.value.videoDetail.thumbnailFile = files[0]
      onReloadPreview()
    }
  }
}
const onSelectThumbnail = async (index: number) => {
  if (index >= 0 && entity.value && entity.value.videoDetail) {
    const tnbase64 = thumbnailBase64Items.value[index]
    if (tnbase64) {
      entity.value.fileThumbnailPath = tnbase64
      const tnFile = await base64ToFile(tnbase64, `thumb_${index}.jpg`)
      if (tnFile) {
        entity.value.videoDetail.thumbnailFile = tnFile
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
  showPreview.value = false
}
onMounted(async () => {
  await nextTick()
  console.log('BaseVideoEditor', file)
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
  <div class="row">
    <div class="col-12 col-md-7 q-pa-md">
      <template v-if="entity">
        <BaseTextHeader :title="$t('base.detail')" />
        <BaseInput
          v-if="entity.videoDetail"
          v-model="entity.videoDetail.title"
          required
          :label="$t('base.title')"
          :rules="[required]"
        />
        <BaseInput
          v-if="entity.videoDetail"
          v-model="entity.videoDetail.description"
          required
          type="textarea"
          :label="$t('base.description')"
          :rules="[required]"
        />
        <BaseTextHeader title="Thumbnails" />
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
                class="col-12 col-md-3 q-pa-sm"
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
          <div class="col-12 col-md-4 text-center q-pa-sm">
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
                v-model="thumbnailFiles"
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
        <div class="q-pb-md">
          <BaseVideoPlayer
            v-if="showPreview && entity.filePath"
            :options="{
              autoSetSource: true
            }"
            :file="entity"
          >
          </BaseVideoPlayer>
          <SkeletonCard v-else height="170px" />
        </div>

        <q-list dense>
          <q-item>
            <q-item-section avatar>
              <BaseIcon name="hugeicons:cursor-text" icon-set="nuxt" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>{{ $t('drive.filename') }}</q-item-label>
              <q-item-label>{{ entity.fileName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <BaseIcon name="hugeicons:time-04" icon-set="nuxt" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>{{ $t('drive.duration') }}</q-item-label>
              <q-item-label>{{
                formatDurationHMS(entity.videoDetail?.duration || 0)
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <LazyBaseAlert v-if="!canSubmit" type="is-warning">
          <p v-if="!validateDuration">{{ $t('drive.longVideoAlert', [limitDuration]) }}</p>
        </LazyBaseAlert>
      </template>
      <!-- Hidden video (for capturing frame) -->
      <video ref="videoEditorHiddenRef" style="display: none"></video>
      <canvas ref="posterRef" style="display: none"></canvas>
    </div>
  </div>
</template>
<style lang="css" scoped>
.thumbnail-selectd {
  border: 4px solid var(--video-player-color) !important;
}
</style>
