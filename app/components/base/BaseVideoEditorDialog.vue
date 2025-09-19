<script setup lang="ts">
import type { FileManager } from '~/types/models'

const {
  file,
  thumbnailCount = 6,
  limitDuration = 120
} = defineProps<{
  file: File
  thumbnailCount?: number
  limitDuration?: number //180 second
  title?: string
}>()
const emit = defineEmits<{
  'on-close': []
  'on-submit': [f: FileManager]
}>()
const show = defineModel<boolean>('show', { default: false })
const onClose = () => {
  emit('on-close')
}
const onSubmit = (f: FileManager) => {
  emit('on-submit', f)
  onClose()
}
</script>
<template>
  <LazyBaseDialog
    v-if="show"
    v-model="show"
    :title="title || $t('drive.uploadVideos')"
    :icon="{ name: 'lucide:file-video-camera', iconSet: 'nuxt' }"
    :persistent="true"
    :auto-close="false"
    :dialog-style="{
      width: '70vw',
      minHeight: '80vh',
      maxWidth: '80vw'
    }"
    @on-close="onClose"
  >
    <LazyBaseVideoEditor
      v-if="file"
      :file
      :thumbnail-count="thumbnailCount"
      :limit-duration="limitDuration"
      @on-submit="onSubmit"
    />
  </LazyBaseDialog>
</template>
