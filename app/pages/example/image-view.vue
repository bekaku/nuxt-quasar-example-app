<script setup lang="ts">
import { biInfoCircle } from '@quasar/extras/bootstrap-icons'
import type { FileManagerDto } from '~/types/models'
import FileManagerService from '~/api/FileManagerService'
useHead({
  title: 'Image/Pdf View'
})
const { fethCdnData } = FileManagerService()
const { isDark } = useTheme()
const imageFromServer = ref<string>()

const pdfFromServer = ref<string>()

const imageSelectIndex = ref<number>(0)
const showImageView = ref(false)
const imageItems = ref<FileManagerDto[]>([
   {
    id: 1,
    fileMime: 'image/jpeg',
    fileName: 'Img001.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 2,
    fileMime: 'image/jpeg',
    fileName: 'Img002.jpg',
    filePath:
      'https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 3,
    fileMime: 'image/jpeg',
    fileName: 'Img003.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 4,
    fileMime: 'image/jpeg',
    fileName: 'Img004.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 5,
    fileMime: 'image/jpeg',
    fileName: 'Img005.jpg',
    filePath:
      'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 6,
    fileMime: 'image/jpeg',
    fileName: 'Img006.jpg',
    filePath:
      'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true
  },
  {
    id: 7,
    fileMime: 'image/jpeg',
    fileName: 'Img007.jpg',
    filePath:
      'https://images.pexels.com/photos/27869817/pexels-photo-27869817/free-photo-of-two-women-sitting-on-a-couch-together.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true
  },
  {
    id: 8,
    fileMime: 'image/jpeg',
    fileName: 'Img008.jpg',
    filePath:
      'https://images.pexels.com/photos/28924817/pexels-photo-28924817/free-photo-of-hong-kong-island-dazzling-night-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true
  },
  {
    id: 9,
    fileMime: 'image/jpeg',
    fileName: 'Img009.jpg',
    filePath:
      'https://images.pexels.com/photos/29008754/pexels-photo-29008754/free-photo-of-scenic-desert-highway-at-sunrise-in-utah.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true
  },
  {
    id: 10,
    fileMime: 'image/jpeg',
    fileName: 'Img010.jpg',
    filePath:
      'https://images.pexels.com/photos/25244460/pexels-photo-25244460/free-photo-of-a-fashionable-young-woman-standing-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true
  },
  {
    id: 11,
    fileMime: 'image/jpeg',
    fileName: 'Img011.jpg',
    filePath:
      'https://images.pexels.com/photos/27467770/pexels-photo-27467770/free-photo-of-laptop-and-camera-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true
  },
  {
    id: 12,
    fileMime: 'image/jpeg',
    fileName: 'Img011.jpg',
    filePath:
      'https://images.pexels.com/photos/28271613/pexels-photo-28271613/free-photo-of-a-car-mirror-is-shown-in-the-side-view-of-a-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true
  }
])
const showPdfView = ref(false)
const pdfSrc = ref<string>()
const pdfName = ref<string>()
const pdfItems = ref<FileManagerDto[]>([
  {
    id: 1,
    fileMime: 'application/pdf',
    fileName: 'Trace-based Just-in-Time Type Specialization for Dynamic Languages',
    filePath: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: false
  }
])

const showMixFiles = ref(false)
const fileMixImageSelectIndex = ref<number>(0)
const fileImageItemsForView = ref<FileManagerDto[]>([])
const fileMixForView = ref<FileManagerDto>()
const mixItems = ref<FileManagerDto[]>(imageItems.value.concat(pdfItems.value))
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
    if (file.isImage) {
      await setImagesFileView(file)
    }
    fileMixForView.value = file
    showMixFiles.value = true
  }
}
const getImageItems = computed(() => mixItems.value.filter(f => f.isImage))
const setImagesFileView = (file: FileManagerDto) => {
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
  const response = await fethCdnData(
    '/api/fileManager/files/download?path=images/202502/1_1738834032363_35bb20615b61481dbca0a44c401e8d9b.jpg'
  )
  console.log('response', response)
  imageFromServer.value = response
}

const downloadImageFromServer = async () => {
  const response = await fethCdnData(
    '/api/fileManager/files/download?path=images/202502/1_1738834032363_35bb20615b61481dbca0a44c401e8d9b.jpg',
    'download'
  )
  console.log('response', response)
}

const fetchPdfFromServer = async () => {
  const response = await fethCdnData(
    '/api/fileManager/files/download?path=images/202502/Product_20210612.pdf'
  )
  console.log('response', response)
  pdfFromServer.value = response
}
</script>
<template>
  <BasePage class="content-limit">
    <BaseCard title="Image/Pdf View" sub-title="This is subtitle" :icon="biInfoCircle">
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
                <base-files-preview-item
                  style="border-radius: 10px"
                  :item="item"
                  :index="i"
                  :show-delete="false"
                  show-tooltip
                  :use-thumbnail="false"
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
            <base-scroll-area height="310px">
              <base-files-preview-item-alt
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
            </base-scroll-area>
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
            <base-files-preview-item
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

        <BaseTextHeader title="Pdf inline display" />
        <q-card flat bordered>
          <base-pdf-view
            src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            :closeable="false"
            title="compressed.tracemonkey-pldi-09.pdf"
          />
        </q-card>
      </q-card-section>

      <q-card-section>
        <BaseButton label="Fetch pdf from server" @click="fetchPdfFromServer" />
        <p />

        <base-pdf-view
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
            <base-files-preview-item
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
    <lazy-base-image-view-dialog
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

    <lazy-base-pdf-view-dialog
      v-if="showPdfView && pdfSrc"
      v-model="showPdfView"
      :src="pdfSrc"
      :title="pdfName"
      @on-close="() => onClosePefView"
    />

    <lazy-base-file-view-dialog
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
