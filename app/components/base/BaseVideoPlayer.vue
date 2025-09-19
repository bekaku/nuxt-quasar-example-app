<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import 'plyr/dist/plyr.css'
import type { FileManager } from '~/types/models'
import type { VideoSrc, VideoTrack } from '~/types/common'

interface PlyrOptions {
  autoSetSource?: boolean
  autoplay?: boolean
  controls?: string[]
  ratio?: string
  poster?: string
  settings?: string[]
}

const defaultOptions = {
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
  // poster: 'http://127.0.0.1:8080/cdn/files/202509/dummy.jpg',
  settings: ['captions', 'quality', 'speed', 'loop']
}
const { file, options } = defineProps<{
  file: FileManager
  options?: PlyrOptions
}>()
const { $plyr } = useNuxtApp()
const Plyr = $plyr
const videoRef = useTemplateRef<HTMLVideoElement | null>('videoRef')
const plyrInstance = ref<Plyr | null>(null)
const sourceRef = useTemplateRef<HTMLSourceElement | null>('sourceRef')
let observer: IntersectionObserver | null = null
// const { downloadFile } = useFileDownload()

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
      const opt = { ...defaultOptions, ...options }
      plyrInstance.value = new Plyr(videoRef.value, { ...defaultOptions, ...options })
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
  // if (videoRef.value) {
  //   videoRef.value.addEventListener('loadstart', () => {
  //     console.log('loadstart')
  //   })
  // }

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = videoRef.value
        if (!video) return

        if (entry.isIntersecting) {
          // Video is in view
          // video.play().catch(() => {})
          console.log('Video is in view')
        } else {
          // Video is out of view
          // video.pause()
          console.log('out of view')
        }
      })
    },
    {
      threshold: 0.25 // video must be at least 25% visible
    }
  )

  observer.observe(videoRef.value as any)
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
const onSetSource = (): Promise<void> => {
  return new Promise<void>(resolve => {
    if (plyrInstance.value && videoRef.value) {
      // Set source manually
      plyrInstance.value.source = {
        type: 'video',
        title: file?.title || 'My Video',
        sources: [
          {
            src: file.filePath,
            type: file.fileMime //'video/mp4'
          }
        ]
      }
    }
    resolve()
  })
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
  if (!file) {
    return
  }
  if (!options?.autoSetSource) {
    await onSetSource()
  }

  play()
  // onSetSource({
  //   src: 'http://127.0.0.1:8080/api/fileManager/video/stream?path=files/2022_1204_140014.MP4',
  //   type: 'video/mp4'
  // })
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
  initialEvent()
  // if (options) {
  //   if (options.autoplay) {
  //     onPlay()
  //   } else if (options.autoSetSource) {
  //     await onSetSource({
  //       src: file.filePath,
  //       type: file.fileMime
  //     })
  //   }
  // }
})

onBeforeUnmount(() => {
  if (plyrInstance.value) {
    plyrInstance.value.destroy()
    plyrInstance.value = null
  }
  if (observer && videoRef.value) {
    observer.unobserve(videoRef.value)
    observer.disconnect()
  }
})
</script>

<template>
  <ClientOnly>
    <div class="video-container">
      <video
        ref="videoRef"
        playsinline
        controls
        crossorigin=""
        class="plyr"
        style="--plyr-color-main: var(--video-player-color)"
        :data-poster="file.fileThumbnailPath || '/images/no_picture.jpg'"
        @play="onPlay"
        @seeking="onSeeking"
        @pause="onPause"
        @stop="onStop"
        @restart="onRestart"
      >
        <template v-if="options?.autoSetSource">
          <!-- Video files -->
          <template v-if="file.videoSources && file.videoSources.length > 0">
            <source
              v-for="(s, sourceIndex) in file.videoSources"
              :key="`${sourceIndex}-${s.src}`"
              :src="s.src"
              :type="s.type"
              :size="s.size"
            />
          </template>
          <source v-else-if="file.filePath" :src="file.filePath" :type="file.fileMime" />
        </template>
        <!-- Caption files -->
        <template v-if="file.videoTracks && file.videoTracks.length > 0">
          <track
            v-for="(t, tracIndex) in file.videoTracks"
            :key="`${tracIndex}-${t.src}`"
            :src="t.src"
            :kind="t.kind"
            :label="t.label"
            :srclang="t.srclang"
            :default="t.default"
          />
        </template>
      </video>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
</style>
