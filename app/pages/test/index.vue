<script setup lang="ts">
import { biArrowLeft } from '@quasar/extras/bootstrap-icons'
import type { FileManager } from '~/types/models'
import { FileExtensionVdoAccept } from '~/libs/constants'
useSeoMeta({
  title: 'Test Page'
})
definePageMeta({
  layout: 'empty'
})
const {
  isDownloading,
  downloadProgress,
  downloadHistory,
  error,
  downloadFile,
  cancleDownload,
  formatBytes
} = useFileDownload()
const files = ref<FileManager[]>([])
const showEditor = ref(false)
const videoOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  poster: 'https://images.pexels.com/photos/21384273/pexels-photo-21384273.jpeg',
  // sources: [{ src: 'http://localhost:8080/cdn/files/2022_1204_140014.MP4', type: 'video/mp4' }]
  sources: [
    {
      src: 'http://127.0.0.1:8080/api/fileManager/files/stream?path=files/2022_1204_140014.MP4',
      type: 'video/mp4'
    }
  ]
}
// Plyr options
const plyrOptions: any = {
  autoplay: false,
  controls: [
    'play-large',
    'play',
    'progress',
    'current-time',
    'mute',
    'volume',
    'captions',
    'settings',
    'pip',
    'airplay',
    'fullscreen'
  ],
  ratio: '16:9',
  poster: 'http://127.0.0.1:8080/cdn/files/202509/dummy.jpg',
  settings: ['captions', 'quality', 'speed', 'loop']
}
const onDownload = async () => {
  await downloadFile({
    url: 'http://127.0.0.1:8080/api/fileManager/files/stream?path=files/2022_1204_140014.MP4',
    filename: 'sample.mp4',
    historyable: false
  })
}

const showVideo = ref(true)

const showVido = () => {
  showVideo.value = false
  setTimeout(() => {
    showVideo.value = true
  }, 100)
}

const onFileAdd = (items: File[]) => {
  console.log('onFildAdd', items)
  showEditor.value = false
  setTimeout(() => {
    showEditor.value = true
  }, 100)
}
</script>
<template>
  <BasePage>
    <BaseCard title="Test Page" subtitle="This is a test page">
      <template #start>
        <BaseButton :icon="biArrowLeft" flat to="/" />
      </template>
    </BaseCard>
    <BaseCard title="Streaming download large files">
      <BaseCardSection class="q-gutter-lg">
        <BaseButton :label="$t('drive.download')" :disable="isDownloading" @click="onDownload" />
        <BaseButton
          color="negative"
          :disable="!isDownloading"
          :label="$t('drive.cancelDownload')"
          @click="cancleDownload"
        />
        <BaseDownloadProgress
          :error="error"
          :is-downloading="isDownloading"
          :progress="downloadProgress"
        />
      </BaseCardSection>
    </BaseCard>

    <!-- <BaseCard title="Video Editor">
      <BaseCardSection>
        <BaseFilePicker
          v-model="files"
          video-editor
          label="Select vdo"
          preview-style="CARD"
          preview-col="col-2"
          @on-file-add="onFileAdd"
        />
      </BaseCardSection>
    </BaseCard> -->
    <BaseCard title="Video Player">
      <BaseCardSection>
        <div class="row">
          <div class="col-12">
            <BaseButton color="green" label="Reload Vdo" @click="showVido" />
            <ClientOnly>
              <BaseVideoPlayer
                v-if="showVideo"
                :options="{
                  autoSetSource: false,
                }"
                :file="{
                  id: 1,
                  fileMime: 'video/mp4',
                  fileName: 'Car dash cam.',
                  filePath:
                    'http://127.0.0.1:8080/api/fileManager/video/stream?path=files/2022_1204_140014.MP4',
                  fileThumbnailPath: 'http://127.0.0.1:8080/cdn/files/202509/dummy.jpg',
                  fileSize: '2 MB',
                  fileMimeType: 'VIDEO'
                }"
              >
              </BaseVideoPlayer>
            </ClientOnly>
          </div>
        </div>
      </BaseCardSection>
    </BaseCard> 
  </BasePage>
</template>
