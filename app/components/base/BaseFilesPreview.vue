<script setup lang="ts">
import type { FilePreviewStyle } from '~/types/common'
import type { FileManager } from '~/types/models'

const {
  showDelete = true,
  previewStyle = 'LIST',
  rounded = true,
  showTooltip = false,
  showViewDialog = false,
  showSize = true,
  softDelete = false,
  clickable = true,
  showName = true,
  items
} = defineProps<{
  showDelete?: boolean
  col?: string
  items: FileManager[]
  formatSize?: boolean
  previewStyle?: FilePreviewStyle
  imageSize?: string
  showSize?: boolean
  rounded?: boolean | undefined
  showTooltip?: boolean
  iconSize?: string
  showViewDialog?: boolean
  softDelete?: boolean
  clickable?: boolean
  showName?: boolean
}>()
const emit = defineEmits<{
  'on-remove': [index: number]
  'on-click': [index: number]
  'on-soft-delete': [index: number]
}>()
const fileForView = ref<FileManager>()
const showFileView = ref(false)
const fileImageItemsForView = ref<FileManager[]>([])
const fileImageSelectIndex = ref<number>(0)
const onRemove = (index: number) => {
  emit('on-remove', index)
}
const onSoftDelete = (index: number) => {
  emit('on-soft-delete', index)
}
const onClick = async (event: any, index: number) => {
  console.log('1onClick', { index, event })
  emit('on-click', index)
  if (event) {
    appPreventDefult(event)
  }
  if (!showViewDialog) {
    return
  }
  showFileView.value = false
  fileImageSelectIndex.value = 0
  fileImageItemsForView.value.length = 0

  const file = items[index]
  if (file) {
    if (file.fileMimeType == 'IMAGE') {
      await setImagesFileView(file)
    }
    fileForView.value = file
    showFileView.value = true
  }
}
const getImageItems = computed(() => {
  if (items && items.length > 0) {
    return items.filter(f => f.fileMimeType == 'IMAGE')
  }
  return []
})
const setImagesFileView = (file: FileManager) => {
  return new Promise(resolve => {
    const index = getImageItems.value.findIndex(t => t.id == file.id)
    if (index >= 0) {
      const list = getImageItems.value
      // for (const f of list) {
      //   fileImageItemsForView.value.push(f)
      // }
      fileImageItemsForView.value.push(...list)
      fileImageSelectIndex.value = index
    }
    resolve(true)
  })
}
</script>
<template>
  <div v-if="items.length > 0" class="row">
    <template v-if="previewStyle == 'CARD'">
      <div
        v-for="(f, index) in items"
        :key="`f-${index}-${f.fileName}`"
        :class="col || 'col-3 q-pa-md'"
        class="div-style q-pa-md"
      >
        <LazyBaseFilesPreviewItem
          :item="f"
          :index="index"
          :show-delete="showDelete"
          :format-size="formatSize"
          :rounded
          :show-size="showSize"
          :show-tooltip="showTooltip"
          :icon-size="iconSize || '5em'"
          :image-size="imageSize || '125px'"
          :soft-delete="softDelete"
          :show-name="showName"
          @on-click="onClick"
          @on-remove="onRemove"
          @on-soft-delete="onSoftDelete"
        />
      </div>
    </template>
    <template v-else-if="previewStyle == 'LIST'">
      <div :class="col || 'col'">
        <LazyBaseFilesPreviewItemAlt
          v-for="(f, fileIndex) in items"
          :key="`f-alt-${fileIndex}-${f.fileName}`"
          :item="f"
          :index="fileIndex"
          dense
          :rounded
          :clickable
          :show-size="showSize"
          :show-delete="showDelete"
          :format-size="formatSize"
          :image-size="imageSize"
          :soft-delete="softDelete"
          @on-click="onClick"
          @on-remove="onRemove"
           @on-soft-delete="onSoftDelete"
        />
      </div>
    </template>
    <template v-else-if="previewStyle == 'INLINE'">
      <div class="col-12 row items-center" :class="col||'q-gutter-md'">
        <template v-for="(f3, f3index) in items" :key="`f-inline-${f3index}-${f3.fileName}`">
          <LazyBaseFilesPreviewItem
            :item="f3"
            :index="f3index"
            :show-delete="showDelete"
            :format-size="formatSize"
            :rounded
            :show-size="showSize"
            :show-tooltip="showTooltip"
            :icon-size="iconSize || '2em'"
            :image-size="imageSize || '65px'"
            :soft-delete="softDelete"
            :show-name="showName"
            @on-click="onClick"
            @on-remove="onRemove"
            @on-soft-delete="onSoftDelete"
          />
        </template>
      </div>
    </template>
  </div>
  <LazyBaseFileViewDialog
    v-if="showFileView && fileForView"
    v-model:show="showFileView"
    :item="fileForView"
    :image-list="fileImageItemsForView"
    :select-index="fileImageSelectIndex"
    :title="fileForView.fileName"
    :show-arrow="true"
  />
</template>
<style lang="scss" scoped></style>
