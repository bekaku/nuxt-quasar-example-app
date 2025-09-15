<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import 'plyr/dist/plyr.css'
import type { FileManager } from '~/types/models'

interface PlyrOptions {
  autoplay: boolean
  controls: string[]
  ratio: string
  poster: string
  settings: string[]
}

const {
  file,
  options = {
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
} = defineProps<{
  file: FileManager
  options?: PlyrOptions
}>()
const { $plyr } = useNuxtApp()
const Plyr = $plyr
const videoRef = useTemplateRef<HTMLVideoElement | null>('videoRef')
const plyrInstance = ref<Plyr | null>(null)
const sourceRef = useTemplateRef<HTMLSourceElement | null>('sourceRef')

// const { downloadFile } = useFileDownload()
const videoUrl =
  'http://127.0.0.1:8080/api/fileManager/video/stream?path=files/2022_1204_140014.MP4'

// Plyr options
// const options: any = {
//   autoplay: false,
//   controls: [
//     'play-large',
//     'play',
//     'progress',
//     'current-time',
//     'mute',
//     'volume',
//     'captions',
//     'settings',
//     'pip',
//     'airplay',
//     'fullscreen'
//   ],
//   ratio: '16:9',
//   poster: 'http://127.0.0.1:8080/cdn/files/202509/dummy.jpg',
//   settings: ['captions', 'quality', 'speed', 'loop']
// }

const initPlyr = (): Promise<void> => {
  return new Promise(resolve => {
    if (videoRef.value) {
      plyrInstance.value = new Plyr(videoRef.value, options)
    }
    resolve(undefined)
  })
}

const initialEvent = () => {
  if (plyrInstance.value) {
    // plyrInstance.value.on('seeking', event => {
    //   console.log('seeking', event)
    //   event.preventDefault()
    // })
  }

  // Attach JWT token to all video requests
  if (videoRef.value) {
    videoRef.value.addEventListener('loadstart', () => {
      console.log('loadstart')
    })
  }
}

const play = () => {
  if (plyrInstance.value) {
    plyrInstance.value.play()
  }
}
const pause = () => {
  if (plyrInstance.value) {
    plyrInstance.value.pause()
  }
}
const stop = () => {
  if (plyrInstance.value) {
    plyrInstance.value.stop()
  }
}
const restart = () => {
  if (plyrInstance.value) {
    plyrInstance.value.restart()
  }
}
const onSetPreviewThumbnail = () => {
  if (plyrInstance.value) {
    plyrInstance.value.setPreviewThumbnails({
      enabled: true,
      src: 'http://127.0.0.1:8080/cdn/files/202509/dummy.vtt',
      withCredentials: true
    })
  }
}
const onSetSource = (config: { src: string; type: string }) => {
  if (plyrInstance.value && videoRef.value) {
    // Set source manually
    plyrInstance.value.source = {
      type: 'video',
      title: 'My Video',
      sources: [
        {
          src: config.src,
          type: config.type //'video/mp4'
        }
      ]
    }
    play()
  }
}
const onPlay = async () => {
  console.log('onPlay')
  // const response = await downloadFile({
  //   url: videoUrl,
  //   filename: 'sample.mp4',
  //   downloadable: false
  // })
  // console.log('res', response)
  // if (response && response.src && response.type) {
  //   onSetSource({ src: response.src, type: response.type })
  // }
  // initialEvent()
  onSetSource({
    src: videoUrl,
    type: 'video/mp4'
  })
}
const onSeeking = () => {
  console.log('onSeeking')
}
const onPause = () => {
  console.log('onPause')
}
const onStop = () => {
  console.log('onStop')
}
const onRestart = () => {
  console.log('onRestart')
}
onMounted(async () => {
  await nextTick()
  await initPlyr()
  //   // initialEvent()
})

onBeforeUnmount(() => {
  if (plyrInstance.value) {
    plyrInstance.value.destroy()
    plyrInstance.value = null
  }
})
</script>

<template>
  <ClientOnly>
    <div class="video-container">
      <video
        ref="videoRef"
        class="plyr"
        style="--plyr-color-main: var(--color-danger-500)"
        :data-poster="options.poster"
        playsinline
        controls
        @play="onPlay"
        @seeking="onSeeking"
      ></video>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
:root {
  --plyr-color-main: #1ac266 !important;
}
.plyr {
  --plyr-color-main: #1ac266;
}
</style>
