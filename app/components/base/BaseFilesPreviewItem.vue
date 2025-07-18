<script setup lang="ts">
import type { FileManagerDto } from '@/types/models'
import { formatBytes } from '@/utils/appUtil'
import { getFileTypeIcon } from '~/utils/fileUtil'
import { biX } from '@quasar/extras/bootstrap-icons'
import { computed } from 'vue'

const {
  showDelete = true,
  col = 'col-3 q-pa-md',
  ratio = 4 / 3,
  formatSize = false,
  fetch = false,
  showName = true,
  showSize = true,
  useThumbnail = false,
  showTooltip = false,
  dense = true,
  imageSize = '125px',
  iconSize = '4em',
  linesName = 1,
  item
} = defineProps<{
  showDelete?: boolean
  col?: string
  item: FileManagerDto
  index: number
  formatSize?: boolean
  fetch?: boolean
  useThumbnail?: boolean
  showName?: boolean
  showSize?: boolean
  imageSize?: string
  imageHeight?: string
  iconSize?: string
  textColor?: string
  dense?: boolean
  showTooltip?: boolean
  ratio?: number
  linesName?: number
   hoverZoom?: boolean| undefined
}>()
const emit = defineEmits(['on-remove', 'on-click'])
const getImagePath = computed(() =>
  useThumbnail && item.fileThumbnailPath ? item.fileThumbnailPath : item.filePath
)
const onRemove = (event: any, index: number) => {
  emit('on-remove', index)
  if (event) {
    event.stopImmediatePropagation()
  }
}
const onClick = (event: any, index: number) => {
  emit('on-click', index)
  if (event) {
    event.stopImmediatePropagation()
  }
}
</script>
<template>
  <template v-if="item?.isImage || item?.image">
    <div class="text-center">
      <!-- :style="{ maxHeight: imageHeight || imageSize, maxWidth: imageSize }" -->
      <base-image
        v-bind="$attrs"
        :src="getImagePath"
        :fetch="fetch"
        :ratio="ratio"
         :hover-zoom="hoverZoom"
        class="cursor-pointer"
        @click="onClick($event, index)"
      >
        <q-btn
          v-if="showDelete"
          class="absolute all-pointer-events"
          name="info"
          style="top: 8px; left: 8px"
          round
          flat
          :icon="biX"
          color="negative"
          @click="onRemove($event, index)"
        />
      </base-image>
      <q-item v-if="showName || showSize" :dense="dense" v-bind="$attrs" class="q-pa-none">
        <q-item-section>
          <q-item-label v-if="showName" :lines="linesName" :class="textColor">
            <slot name="fileName">
              {{ item.fileName }}
            </slot>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label v-if="showSize" caption>
            <slot name="size">
              {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
            </slot>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </template>
  <template v-else>
    <div class="text-center">
      <q-icon
        v-bind="$attrs"
        class="cursor-pointer"
        :size="iconSize"
        :name="getFileTypeIcon(item.fileMime)"
        @click="onClick($event, index)"
      >
        <q-btn
          v-if="showDelete"
          class="absolute all-pointer-events"
          name="info"
          style="top: 8px; left: 8px"
          round
          flat
          :icon="biX"
          color="negative"
          @click="onRemove($event, index)"
        />
        <BaseTooltip v-if="showTooltip && item.fileName">
          {{ item.fileName }}
        </BaseTooltip>
      </q-icon>
      <q-item v-if="showName || showSize" :dense="dense" class="q-pa-none">
        <q-item-section>
          <q-item-label v-if="showName" :lines="linesName" :class="textColor">
            <slot name="fileName">
              {{ item.fileName }}
            </slot>
          </q-item-label>
          <!-- <q-item-label v-if="showSize" caption :class="textColor">
              <slot name="size">
                {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
              </slot>
            </q-item-label> -->
        </q-item-section>
        <q-item-section side>
          <q-item-label v-if="showSize" caption :class="textColor">
            <slot name="size">
              {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
            </slot>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </template>
</template>
