<script setup lang="ts">
import { rgb } from 'pdf-lib'
import FileManagerService from '~/api/FileManagerService'
import type { FileManager } from '~/types/models'
useHead({
  title: 'Image/Pdf View'
})
const { fethCdnData } = FileManagerService()
const { isDark } = useTheme()
const imageFromServer = ref<string>()

const pdfFromServer = ref<string>()
const videoPlayerDialog = ref(false)
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

const imageSelectIndex = ref<number>(0)
const showImageView = ref(false)
const imageItems = ref<FileManager[]>([
  {
    id: 1,
    fileMime: 'image/jpeg',
    fileName: 'Img001.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 2,
    fileMime: 'image/jpeg',
    fileName: 'Img002.jpg',
    filePath:
      'https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 3,
    fileMime: 'image/jpeg',
    fileName: 'Img003.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 4,
    fileMime: 'image/jpeg',
    fileName: 'Img004.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 5,
    fileMime: 'image/jpeg',
    fileName: 'Img005.jpg',
    filePath:
      'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 6,
    fileMime: 'image/jpeg',
    fileName: 'Img006.jpg',
    filePath:
      'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 7,
    fileMime: 'image/jpeg',
    fileName: 'Img007.jpg',
    filePath:
      'https://images.pexels.com/photos/27869817/pexels-photo-27869817/free-photo-of-two-women-sitting-on-a-couch-together.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 8,
    fileMime: 'image/jpeg',
    fileName: 'Img008.jpg',
    filePath:
      'https://images.pexels.com/photos/28924817/pexels-photo-28924817/free-photo-of-hong-kong-island-dazzling-night-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 9,
    fileMime: 'image/jpeg',
    fileName: 'Img009.jpg',
    filePath:
      'https://images.pexels.com/photos/29008754/pexels-photo-29008754/free-photo-of-scenic-desert-highway-at-sunrise-in-utah.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 10,
    fileMime: 'image/jpeg',
    fileName: 'Img010.jpg',
    filePath:
      'https://images.pexels.com/photos/25244460/pexels-photo-25244460/free-photo-of-a-fashionable-young-woman-standing-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 11,
    fileMime: 'image/jpeg',
    fileName: 'Img011.jpg',
    filePath:
      'https://images.pexels.com/photos/27467770/pexels-photo-27467770/free-photo-of-laptop-and-camera-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  },
  {
    id: 12,
    fileMime: 'image/jpeg',
    fileName: 'Img011.jpg',
    filePath:
      'https://images.pexels.com/photos/28271613/pexels-photo-28271613/free-photo-of-a-car-mirror-is-shown-in-the-side-view-of-a-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'IMAGE'
  }
])
const showPdfView = ref(false)
const pdfSrc = ref<string>()
const pdfName = ref<string>()
const showPdfViewWatermark1 = ref(false)
const showPdfViewWatermark2 = ref(false)
const showPdfViewWatermark3 = ref(false)
const dummyPdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
const pdfItems = ref<FileManager[]>([
  {
    id: 1,
    fileMime: 'application/pdf',
    fileName: 'Trace-based Just-in-Time Type Specialization for Dynamic Languages',
    filePath: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    fileMimeType: 'FILE'
  }
])

const showMixFiles = ref(false)
const fileMixImageSelectIndex = ref<number>(0)
const fileImageItemsForView = ref<FileManager[]>([])
const fileMixForView = ref<FileManager>()
const mixItems = ref<FileManager[]>(imageItems.value.concat(pdfItems.value))
mixItems.value.push(videoItem)

const onVideoClick = (index: number) => {
  console.log('onVideoClick', index)
  videoPlayerDialog.value = true
}
const onImgPreviewClick = async (index: number) => {
  imageSelectIndex.value = index
  showImageView.value = true
}
const onImgPreviewClose = () => {
  imageSelectIndex.value = 0
  showImageView.value = false
}
const onDeleteImage = (index: number) => {
  console.log('onDeleteImage', index)
}
const onPdfPreviewClick = async (index: number) => {
  const item = pdfItems.value[index]
  if (item) {
    pdfSrc.value = item.filePath
    pdfName.value = item.fileName
    showPdfView.value = true
  }
}
const onClosePefView = () => {
  pdfSrc.value = undefined
  pdfName.value = undefined
  showPdfView.value = false
}

const onMixPreviewClick = async (index: number) => {
  showMixFiles.value = false
  fileMixImageSelectIndex.value = 0
  fileImageItemsForView.value = []
  const file = mixItems.value[index]
  if (file) {
    if (file.fileMimeType == 'IMAGE') {
      await setImagesFileView(file)
    }
    fileMixForView.value = file
    showMixFiles.value = true
  }
}
const getImageItems = computed(() => mixItems.value.filter(f => f.fileMimeType == 'IMAGE'))
const setImagesFileView = (file: FileManager) => {
  return new Promise(resolve => {
    const index = getImageItems.value.findIndex(t => t.id == file.id)
    if (index >= 0) {
      const list = getImageItems.value
      for (const f of list) {
        if (f) {
          fileImageItemsForView.value.push(f)
        }
      }
      fileMixImageSelectIndex.value = index
    }
    resolve(true)
  })
}

const fetchImageFromServer = async () => {
  try {
    const response = await fethCdnData(
      'http://127.0.0.1:8080/api/fileManager/files/download?path=images/default-men-avatar.png'
    )
    if (response) {
      console.log('response', response)
      imageFromServer.value = response
    }
  } catch (e) {
    console.warn(e)
  }
}

const downloadImageFromServer = async () => {
  try {
    const response = await fethCdnData(
      'http://127.0.0.1:8080/api/fileManager/files/download?path=images/default-men-avatar.png',
      'download'
    )
    console.log('response', response)
  } catch (e) {
    console.warn(e)
  }
}

const fetchPdfFromServer = async () => {
  try {
    const response = await fethCdnData(
      'http://127.0.0.1:8080/api/fileManager/files/download?path=files/compressed.tracemonkey-pldi-09.pdf'
    )
    console.log('response', response)
    pdfFromServer.value = response
  } catch (e) {
    console.warn(e)
  }
}
</script>
<template>
  <BasePage class="content-limit">
    <BaseCard title="Video" :icon="{ name: 'lucide:video' }">
      <BaseCardSection>
        <div class="row">
          <div class="col col-md-4 q-pa-sm">
            <q-item-label header>Dialog player</q-item-label>
            <!-- <BaseFilesPreview
              :items="[videoItem]"
              preview-style="CARD"
              col="col-8"
              :show-delete="false"
              :show-size="false"
              @on-click="onVideoClick"
            /> -->
            <BaseFilesPreviewItem
              :item="videoItem"
              :index="0"
              :show-delete="false"
              :show-size="false"
              show-video-detail
              style="width: 200px;"
              @on-click="onVideoClick"
            />
            <BaseFilesPreviewItemAlt
              :item="videoItem"
              :index="0"
              :show-delete="false"
              image-size="125px"
              clickable
              show-video-detail
               :lines-name="2"
              :show-size="false"
              @on-click="onVideoClick"
            />
          </div>
          <div class="col col-md-5 q-pa-sm">
            <q-item-label header>Inline player</q-item-label>
            <ClientOnly>
              <BaseVideoPlayer
                :options="{
                  autoSetSource: true
                }"
                :file="videoItem"
              />
            </ClientOnly>
          </div>
        </div>
      </BaseCardSection>
    </BaseCard>
    <BaseCard title="Image" subtitle="This is subtitle" :icon="{ name: 'lucide:info' }">
      <q-card-section class="q-gutter-md">
        <BaseButton label="Fetch Image from server" @click="fetchImageFromServer" />
        <BaseButton label="Download Image from server" @click="downloadImageFromServer" />
        <BaseImage v-if="imageFromServer" :src="imageFromServer" style="width: 250px" />
      </q-card-section>

      <q-card-section>
        <BaseTextHeader title="Image Dialog" />
        <div class="row">
          <div class="col-12 col-md-6">
            <q-item-label header>Grid</q-item-label>
            <div class="row">
              <div
                v-for="(item, i) in imageItems"
                :key="`img-${i}-${item.fileName}`"
                class="col-4 col-md-3 q-pa-xs"
              >
                <BaseFilesPreviewItem
                  :item="item"
                  :index="i"
                  :show-delete="false"
                  hover-zoom
                  show-tooltip
                  :use-thumbnail="false"
                  rounded
                  image-size="100%"
                  :show-name="false"
                  :show-size="false"
                  @on-click="onImgPreviewClick"
                />
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 q-px-md">
            <q-item-label header>List</q-item-label>
            <BaseScrollArea height="310px">
              <BaseFilesPreviewItemAlt
                v-for="(itemAlt, iAlt) in imageItems"
                :key="`img-${iAlt}-${itemAlt.fileName}`"
                :item="itemAlt"
                :index="iAlt"
                clickable
                dense
                :show-delete="true"
                show-name
                show-size
                @on-click="onImgPreviewClick"
              />
            </BaseScrollArea>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <BaseTextHeader title="Image Slide" />
        <q-card flat bordered>
          <client-only>
            <base-image-view
              :files="imageItems"
              :selected-index="imageSelectIndex"
              :dark="isDark"
              :show-delete-image="false"
              show-arrow
              height="350px"
              :closeable="false"
            />
          </client-only>
        </q-card>
      </q-card-section>
    </BaseCard>

    <BaseCard class="q-my-md">
      <q-card-section>
        <BaseTextHeader title=" Pdf dialog View" />
        <div class="row">
          <div
            v-for="(pdf, pdfIndex) in pdfItems"
            :key="`impdfg-${pdfIndex}-${pdf.id}`"
            class="col-4 col-md-2 q-pa-xs"
          >
            <BaseFilesPreviewItem
              style="border-radius: 10px"
              :item="pdf"
              :index="pdfIndex"
              :show-delete="false"
              show-tooltip
              show-name
              show-size
              @on-click="onPdfPreviewClick"
            />
          </div>
        </div>

        <q-card flat>
          <BaseTextHeader title="Pdf watermark" />
          <q-card-section class="q-gutter-lg">
            <BaseButton label="Defult watermark" @click="showPdfViewWatermark1 = true" />
            <BaseButton label="Custom watermark" @click="showPdfViewWatermark2 = true" />
            <BaseButton
              label="Custom position, text, image"
              @click="showPdfViewWatermark3 = true"
            />
          </q-card-section>
        </q-card>
        <BaseTextHeader title="Pdf inline display" />
        <q-card flat bordered>
          <BasePdfView
            :src="dummyPdfUrl"
            :closeable="false"
            title="compressed.tracemonkey-pldi-09.pdf"
            :all-page="false"
            :watermark-options="{
              image: '/logo/logo.png'
            }"
          />
        </q-card>
      </q-card-section>

      <q-card-section>
        <BaseButton label="Fetch pdf from server" @click="fetchPdfFromServer" />

        <LazyBasePdfView
          v-if="pdfFromServer"
          :src="pdfFromServer"
          :closeable="false"
          title="compressed.tracemonkey-pldi-09.pdf"
        />
      </q-card-section>
    </BaseCard>

    <BaseCard class="q-my-md">
      <q-card-section>
        <BaseTextHeader title="Mix item View" />
        <div class="row">
          <div
            v-for="(m, mIndex) in mixItems"
            :key="`impdfg-${mIndex}-${m.fileName}`"
            class="col-4 col-md-2 q-pa-xs"
          >
            <BaseFilesPreviewItem
              style="border-radius: 10px"
              :item="m"
              :index="mIndex"
              :show-delete="false"
              show-tooltip
              show-name
              show-size
              image-size="100%"
              :lines-name="2"
              @on-click="onMixPreviewClick"
            />
          </div>
        </div>
      </q-card-section>
    </BaseCard>

    <LazyBaseVideoPlayerDialog
      v-if="videoPlayerDialog"
      v-model:show="videoPlayerDialog"
      :file="videoItem"
      :options="{ autoSetSource: true, autoplay: false }"
    />

    <LazyBaseImageViewDialog
      v-if="showImageView"
      v-model="showImageView"
      :files="imageItems"
      :selected-index="imageSelectIndex"
      :show-delete-image="true"
      :maximized="false"
      show-arrow
      @on-delete="onDeleteImage"
      @on-close="onImgPreviewClose"
    />

    <LazyBasePdfViewDialog
      v-if="showPdfView && pdfSrc"
      v-model="showPdfView"
      :src="pdfSrc"
      :title="pdfName"
      @on-close="() => onClosePefView"
    />

    <LazyBasePdfViewDialog
      v-if="showPdfViewWatermark1"
      v-model="showPdfViewWatermark1"
      :src="dummyPdfUrl"
      title="Defult watermark"
      :watermark-options="{
        text: 'Defult watermark'
      }"
    />

    <LazyBasePdfViewDialog
      v-if="showPdfViewWatermark2"
      v-model="showPdfViewWatermark2"
      :src="dummyPdfUrl"
      title="Custom watermark"
      :watermark-options="{
        text: 'Watermark',
        fontSize: 28,
        rows: 3,
        columns: 3,
        rotation: 0,
        opacity: 0.7,
        color: rgb(0.1, 1, 0.1)
      }"
    />
    <LazyBasePdfViewDialog
      v-if="showPdfViewWatermark3"
      v-model="showPdfViewWatermark3"
      :src="dummyPdfUrl"
      title="Custom position"
      :watermark-options="{
        image: '/logo/logo.png',
        items: [
          {
            text: 'Top left',
            position: 'top-left'
          },
          {
            text: 'Top right',
            position: 'top-right'
          },
          {
            text: 'Bottom left',
            position: 'bottom-left'
          },
          {
            text: 'Bottom right',
            position: 'bottom-right'
          }
        ]
      }"
    />
    <LazyBaseFileViewDialog
      v-if="showMixFiles && fileMixForView"
      v-model:show="showMixFiles"
      :item="fileMixForView"
      :image-list="fileImageItemsForView"
      :select-index="fileMixImageSelectIndex"
      title="Images"
      :show-arrow="true"
    />
  </BasePage>
</template>
<style lang="scss" scoped></style>
