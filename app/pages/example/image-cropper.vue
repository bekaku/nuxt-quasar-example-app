<script setup lang="ts">
import type { LabelValue } from '~/types/common'
import { getImgUrlFromFile } from '~/utils/fileUtil'
const { t } = useLang()
useHead({
  title: 'Image Cropper'
})
const showImageCroper = ref(false)
const cropedUrl = ref<string | undefined>('/images/no_picture.jpg')
const cropedFile = ref<any>()

const ratioSelected = ref<number>(1)
const ratioOptions: LabelValue<number>[] = [
  { label: '1', value: 1 },
  { label: '4/3', value: 4 / 3 },
  { label: '16/9', value: 16 / 9 }
]
const onCloseImageCropper = () => {
  showImageCroper.value = false
}
const onDeleteFile = () => {
  cropedUrl.value = undefined
  cropedFile.value = undefined
}
const onCropImage = async (f: any) => {
  console.log('onCropImage', f)
  const imageUrl = await getImgUrlFromFile(f)
  if (imageUrl) {
    cropedUrl.value = imageUrl
  }
  cropedFile.value = f
}

const onCropImageEnd = (imageUrl: string) => {
  console.log('onCropImageEnd')
}
</script>
<template>
  <BasePage>
    <!-- <BaseCard title="Image Cropper">
            <q-card-section>
                <div class="row">
                    <div class="col-12 col-md-4">
                        <q-item>
                            <q-item-section avatar top>
                                <q-avatar size="75px" rounded>
                                    <q-img v-if="cropedUrl" spinner-color="white" :src="cropedUrl" />
                                    <q-img v-else spinner-color="white" src="/images/no_picture_thumb.jpg" />
                                    <q-btn color="primary" round size="sm" unelevated style="left: 50px;"
                                        class="absolute-top" :icon="biPencilFill" @click="showImageCroper = true">
                                        <BaseTooltip>{{ t('base.changeAvatar') }}</BaseTooltip>
                                    </q-btn>
                                    <q-btn v-if="cropedFile != undefined" color="negative" round size="sm" unelevated
                                        style="left: 100px;" class="absolute-top" :icon="biTrash" @click="onDeleteFile">
                                        <BaseTooltip>{{ t('base.delete') }}</BaseTooltip>
                                    </q-btn>
                                </q-avatar>
                            </q-item-section>
                        </q-item>
                    </div>
                    <div class="col-12 col-md-8 q-pa-md">
                        <div class="q-gutter-sm">


                            <q-img v-if="cropedUrl == undefined" spinner-color="white" src="/images/no_picture.jpg" />
                            <template v-if="cropedUrl">
                                <base-image :src="cropedUrl" :ratio="1" alt="1"
                                    style="height: 250px; max-width: 250px" />

                                <base-image :src="cropedUrl" :ratio="4/3" alt="4/3"
                                    style="height: 250px; max-width: 250px" />

                                <base-image :src="cropedUrl" :ratio="16 / 9" alt="16/9"
                                    style="height: 250px; max-width: 250px" />

                                <p>cover</p>
                                <base-image :src="cropedUrl" fit="cover" alt="contain" />
                                <p>contain</p>
                                <base-image :src="cropedUrl" fit="contain" alt="contain" />
                                <p>fill</p>
                                <base-image :src="cropedUrl" fit="fill" alt="fill" />
                                <p>scale-down</p>
                                <base-image :src="cropedUrl" fit="scale-down" image-bg />
                            </template>
</div>
</div>
</div>
</q-card-section>
</BaseCard> -->
    <!-- <base-image-cropper :title="t('cropAvatar')" :dialog="showImageCroper" @on-close="onCloseImageCropper" @on-okay="onCropImage"/> -->

    <BaseCard title="Image Cropper" subtitle="Ratio">
      <BaseRadio v-model="ratioSelected" :items="ratioOptions" />
      <ClientOnly>
        <BaseImageCropper
          initial-src="/images/no_picture.jpg"
          :ratio="ratioSelected"
          @on-close="onCloseImageCropper"
          @on-submit="onCropImage"
        />
      </ClientOnly>
    </BaseCard>
    <BaseCard title="Image Cropper dialog">
      <q-card-section>
        <BaseButton :label="t('cropAvatar')" @click="showImageCroper = true" />
      </q-card-section>
      <q-card-section>
        <div v-if="cropedUrl" class="row q-gutter-md">
          <base-image :src="cropedUrl" :ratio="1" alt="1" style="height: 250px; max-width: 250px" />

          <base-image
            :src="cropedUrl"
            :ratio="4 / 3"
            alt="4/3"
            style="height: 250px; max-width: 250px"
          />

          <base-image
            :src="cropedUrl"
            :ratio="16 / 9"
            alt="16/9"
            style="height: 250px; max-width: 250px"
          />

          <base-image :src="cropedUrl" fit="cover" alt="contain">
            <div class="full-width">cover</div>
          </base-image>

          <base-image :src="cropedUrl" fit="contain" alt="contain">
            <div>contain</div>
          </base-image>

          <base-image :src="cropedUrl" fit="fill" alt="fill">
            <div>fill</div>
          </base-image>

          <base-image :src="cropedUrl" fit="scale-down" image-bg>
            <div>scale-down</div>
          </base-image>
        </div>
      </q-card-section>
    </BaseCard>
    <LazyBaseImageCropperDialog
      v-if="showImageCroper"
      v-model="showImageCroper"
      :title="t('cropAvatar')"
      @on-close="onCloseImageCropper"
      @on-submit="onCropImage"
      @on-cropend="onCropImageEnd"
    />
  </BasePage>
</template>
<style lang="scss" scoped></style>
