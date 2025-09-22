<script setup lang="ts">
import { biMic, biMusicNote, biPerson, biPlay } from '@quasar/extras/bootstrap-icons'
import type { LabelValue } from '~/types/common'
import type { FileManager } from '~/types/models'

const videoItem: FileManager = {
  id: 1,
  fileMime: 'video/mp4',
  fileName: 'View_From_A_Blue_Moon_Trailer-HD.mp4',
  filePath: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
  fileThumbnailPath: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
  fileSize: '99 MB',
  fileMimeType: 'VIDEO',
  createdDate: '2025-05-31 18:31:00',
  duration: 185,
  view: 78945,
  title: 'This 525sqft House Has an Amazing Floor Plan! Full Tour!',
  description: `Today I talk/walk you through 24 hours of off-grid living in a cozy cabin, alone in the woods with my dog. I talk about my off-grid systems for heating, running water, electricity, cooking and more. I also find the time for some skiing, firewood chores, banjo pickin', and a wood fired sauna. Hope you enjoy! CHECK OUT MY WEBSITE for access to my channels original music or my Norman and cabin merchandise: 

https://alaskacabinadventures.com

Here's is the link to the EcoFlow fridge and power stations I use,
Check out the Delta 2 MAX and the Glacier Fridge: EcoFlow Website: https://bit.ly/3si1QDK`,
  videoSources: [
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
      size: 576
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
      size: 720
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
      size: 1080
    }
  ],
  videoTracks: [
    {
      kind: 'captions',
      label: 'English',
      srclang: 'en',
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      default: true
    },
    {
      kind: 'captions',
      label: 'Français',
      srclang: 'fr',
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
      default: false
    }
  ]
}
useSeoMeta({
  title: videoItem.title
})
const toggleModel = ref<string>('music')
const toggleOptions: LabelValue<string>[] = [
  { label: 'All', value: 'music', icon: biPlay as any },
  { label: 'From this user', value: 'podcasts', icon: biPerson as any },
  { label: 'Live', value: 'live', icon: biPlay as any }
]
</script>
<template>
  <BasePage>
    <div class="row">
      <div class="col col-md-8 q-pa-md">
        <ClientOnly>
          <BaseVideoPlayer
            style="width: 100%"
            :options="{
              autoSetSource: true
            }"
            :file="videoItem"
          />
        </ClientOnly>
        <BaseVideoPlayerDetail class="q-py-md" :file="videoItem" />
      </div>
      <div class="col col-md-4">
        <BaseCard flat :bordered="false">
          <BaseButtonToggle class="q-ml-lg" v-model="toggleModel" :options="toggleOptions" />
          <BaseCardSection>
            <BaseScrollArea height="80vh">
              <BaseFilesPreviewItemAlt
                v-for="(item, index) in 5"
                :key="index"
                :item="videoItem"
                :index="0"
                :ratio="16 / 9"
                :show-delete="false"
                :lines-name="2"
                :play-icon="false"
                show-video-detail
                 :show-size="false"
                image-size="120px"
                clickable
              />
            </BaseScrollArea>
          </BaseCardSection>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
