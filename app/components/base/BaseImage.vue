<script setup lang="ts">
/*
 <BaseImage
          src="http://localhost:8080/cdn/images/202211/145_1668642842865_fe718909cb0d4bd88e17c8568fe12e2f.jpg"
          style="height: 250px; max-width: 250px"
          fetch
        />
        <base-image :src="crudEntity.companyLogo.image" style="max-height: 250px; max-width: 250px" fetch alt="user_img" :ratio="0"></base-image>
*/
import { watchEffect, onBeforeUnmount, onMounted, ref } from 'vue'
import { biCardImage } from '@quasar/extras/bootstrap-icons'
import FileManagerService from '~/api/FileManagerService'

const {
  src,
  spinnerColor = 'white',
  ratio = 4 / 3,
  fetch = false,
  imageBg = false,
  fit = 'cover',
  alt = 'image',
  hoverZoom = false
} = defineProps<{
  src: string
  fetch?: boolean
  imageBg?: boolean
  placHolder?: string
  spinnerColor?: string
  alt?: string
  ratio?: number
  fit?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down'
  hoverZoom?: boolean | undefined
}>()
const { fethCdnData } = FileManagerService()
const loading = ref(true)
const srcUrl = ref<any>()
const firstLoaded = ref(false)
onMounted(async () => {
  await onFetchImage()
})
watchEffect(() => {
  if (firstLoaded.value) {
    onFetchImage()
  }
})
const onFetchImage = async () => {
  if (!src) {
    loading.value = false
    return
  }
  if (fetch) {
    fethCdnData(src)
      .then(res => {
        clearLoading()
        if (res) {
          srcUrl.value = res
        }
      })
      .catch(() => {
        clearLoading()
      })
  } else {
    srcUrl.value = src
    clearLoading()
  }
}
const clearLoading = () => {
  loading.value = false
  if (!firstLoaded.value) {
    firstLoaded.value = true
  }
}
onBeforeUnmount(() => {
  srcUrl.value = undefined
})
</script>
<template>
  <q-img
    v-if="loading"
    :spinner-color="spinnerColor"
    :placeholder-src="placHolder"
    :alt
    :ratio="ratio"
    v-bind="$attrs"
    loading="lazy"
  >
    <div class="absolute-full flex flex-center">
      <q-inner-loading showing color="white" size="xs" />
    </div>
  </q-img>
  <q-img
    v-else-if="srcUrl"
    :src="srcUrl"
    :fit="fit"
    :placeholder-src="placHolder"
    :spinner-color="spinnerColor"
    :ratio="ratio"
    v-bind="$attrs"
    loading="lazy"
    :class="{ 'img-bg': imageBg, 'zoom-hover': hoverZoom  }"
    :alt
  >
    <template #error>
      <div class="absolute-full flex flex-center bg-primary text-white">
        <q-icon :name="biCardImage" class="q-mr-sm" size="md" />
        Cannot load image
      </div>
    </template>
    <slot />
  </q-img>
  <q-img
    v-else
    :ratio="ratio"
    v-bind="$attrs"
    loading="lazy"
    src="/images/no_picture_thumb.jpg"
    :alt
  />
</template>
<style lang="scss" scoped>
.img-bg {
  background: #000000;
  background: -webkit-linear-gradient(to bottom, #434343, #000000);
  background: linear-gradient(to bottom, #434343, #000000);
}

body.body--dark {
  .img-bg {
    background: #000000;
  }
}
.zoom-hover {
  // width: 100%;
  // height: 100%;
  // object-fit: cover;
  transition: transform 0.3s ease;
}
.zoom-hover:hover {
  transform: scale(1.2);
  width: 100%;
  height: 100%;
  z-index: 999 !important;
}
</style>
