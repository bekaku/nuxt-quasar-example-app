<script setup lang="ts">
import type {FileManager} from '~/types/models'

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

    <LayerOneCard/>
  </BasePage>
</template>
