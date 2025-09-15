<script setup lang="ts">
import type { WatermarkOptions } from '@tato30/vue-pdf'

const {
  src,
  fitParent = false,
  textLayer = false,
  hideForms = false,
  allPage = true
} = defineProps<{
  src: any
  fitParent?: boolean
  textLayer?: boolean
  width?: number | undefined
  height?: number | undefined
  watermarkText?: string | undefined
  watermarkOptions?: WatermarkOptions
  hideForms?: boolean
  allPage?: boolean | undefined
}>()
const { $usePDF } = useNuxtApp()
const scale = defineModel('scale', { type: Number, default: 1 })
const page = defineModel('page', { type: Number, default: 1 })
const pagess = defineModel('pagess', { type: Number, default: 1 })
const loading = defineModel('loading', { type: Boolean, default: true })

const firstLoaded = ref(false)
const { pdf, pages, /*info*/ download, print } = $usePDF(src)
const emit = defineEmits(['onPageChange'])

const onLoaded = () => {
  firstLoaded.value = true
  pagess.value = pages.value
}
defineExpose({
  download,
  print
})
</script>
<template>
  <ClientOnly>
    <BaseCard flat :bordered="false" :margin="false">
      <q-linear-progress v-if="!firstLoaded" query color="primary" style="height: 5px" />
      <div v-if="!allPage" class="row justify-center">
        <pdf-vue
          :pdf="pdf"
          :scale="scale"
          :page="page"
          :fit-parent="fitParent"
          :width="width"
          :height="height"
          :text-layer="textLayer"
          :watermark-text="watermarkText"
          :watermark-options="watermarkOptions"
          :hide-forms="hideForms"
          @loaded="onLoaded"
        />
      </div>
      <template v-else>
        <div v-for="p in pages" :key="p" class="row justify-center">
          <pdf-vue
            :pdf="pdf"
            :scale="scale"
            :page="p"
            :fit-parent="fitParent"
            :width="width"
            :height="height"
            :text-layer="textLayer"
            :watermark-text="watermarkText"
            :watermark-options="watermarkOptions"
            :hide-forms="hideForms"
            @loaded="onLoaded"
          />
        </div>
      </template>
    </BaseCard>
  </ClientOnly>
</template>
