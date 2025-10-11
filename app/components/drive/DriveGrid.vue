<script setup lang="ts">
import type { FileManager } from '~/types/models'

const {
  items,
  iconSize = '3em',
  imageSize = '100%'
} = defineProps<{
  items: FileManager[]
  iconSize?: string
  imageSize?: string
}>()
const emit = defineEmits<{
  'on-item-click': [id: string | number | null]
}>()
const selected = defineModel<(string | number)[]>('selected', { default: [] })
const onItemClick = (event: any, id: string | number | null | undefined) => {
  if (!id) {
    return
  }
  emit('on-item-click', id)
}
</script>
<template>
  <div class="row">
    <div
      v-for="(item, index) in items"
      :key="`drive-grid-${index}-${item.id}`"
      class="col-xs-6 col-sm-4 col-md-2 q-pa-xs"
    >
      <DriveGridItem :item="item" v-model:selected="selected" @on-item-click="onItemClick" />
    </div>
  </div>
</template>
