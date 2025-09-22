<script setup lang="ts">
import type { FilePreviewStyle } from '~/types/common'
import type { FileManager } from '~/types/models'

const {
  showDelete = true,
  col = 'col-2 q-pa-sm',
  previewStyle = 'LIST',
  rounded = true
} = defineProps<{
  showDelete?: boolean
  col?: string
  items: FileManager[]
  formatSize?: boolean
  previewStyle?: FilePreviewStyle
  imageSize?: string
  showSize?: boolean
  rounded?: boolean | undefined
}>()
const emit = defineEmits<{
  'on-remove': [index: number]
  'on-click': [index: number]
}>()
const onRemove = (index: number) => {
  emit('on-remove', index)
}
const onClick = (event: any, index: number) => {
  emit('on-click', index)
  if (event) {
    appPreventDefult(event)
  }
}
</script>
<template>
  <div v-if="items.length > 0" class="row">
    <template v-if="previewStyle == 'CARD'">
      <div
        v-for="(f, index) in items"
        :key="`f-${index}-${f.fileName}`"
        :class="col"
        class="div-style q-pa-md"
      >
        <LazyBaseFilesPreviewItem
          :item="f"
          :index="index"
          :show-delete="showDelete"
          :format-size="formatSize"
          :rounded
          :show-size="showSize"
          @on-click="onClick"
          @on-remove="onRemove"
        />
      </div>
    </template>
    <template v-else>
      <div class="col">
        <LazyBaseFilesPreviewItemAlt
          v-for="(f, fileIndex) in items"
          :key="`f-alt-${fileIndex}-${f.fileName}`"
          :item="f"
          :index="fileIndex"
          dense
          :rounded
          :show-size="showSize"
          :show-delete="showDelete"
          :format-size="formatSize"
          :image-size="imageSize"
          @on-click="onClick"
          @on-remove="onRemove"
        />
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped></style>
