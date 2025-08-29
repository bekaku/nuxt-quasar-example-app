<script setup lang="ts">
import { biCheck2, biExclamation, biX } from '@quasar/extras/bootstrap-icons'
import type { FileManager } from '~/types/models'
import { formatBytes } from '~/utils/appUtil'
import { getFileTypeIcon } from '~/utils/fileUtil'
import BaseButton from './BaseButton.vue'
import BaseTooltip from './BaseTooltip.vue'

const {
  showDelete = true,
  formatSize = false,
  showSize = true,
  fetch = false,
  dense = false,
  clickable = false,
  imageSize = '75px',
  textColor = 'q-text-black',
  iconSize = '4em'
} = defineProps<{
  showDelete?: boolean
  col?: string
  item: FileManager
  index: number
  formatSize?: boolean
  imageSize?: string
  iconSize?: string
  fetch?: boolean
  dense?: boolean
  clickable?: boolean
  textColor?: string
  showSize?: boolean
}>()
const { t } = useLang()
const emit = defineEmits(['on-remove', 'on-click'])
const onRemove = (event: any, index: number) => {
  emit('on-remove', index)
  if (event) {
    event.stopImmediatePropagation()
  }
}
const onClick = (event: any, index: number) => {
  emit('on-click', index, event)
  if (event) {
    event.stopImmediatePropagation()
  }
}
</script>
<template>
  <q-item v-bind="$attrs" :dense="dense" :clickable @click="onClick($event, index)">
    <q-item-section side>
      <template v-if="item.isImage || item.image">
        <q-avatar square :size="imageSize" class="cursor-pointer" @click="onClick($event, index)">
          <base-image :fetch="fetch" :src="item.filePath" />
        </q-avatar>
      </template>
      <template v-else>
        <div
          :style="{ width: imageSize }"
          class="cursor-pointer text-center"
          @click="onClick($event, index)"
        >
          <q-icon :class="textColor" :name="getFileTypeIcon(item.fileMime)" :size="iconSize" />
        </div>
      </template>
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1" :class="textColor">
        <slot name="fileName">
          {{ item.fileName }}
        </slot>
      </q-item-label>
      <q-item-label v-if="showSize" caption :class="textColor">
        <slot name="size">
          {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
        </slot>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <slot name="end">
        <div class="row items-center">
          <template v-if="item.uploadProgress">
            <q-circular-progress
              :indeterminate="false"
              show-value
              font-size="10px"
              :value="Math.round(item.uploadProgress.progress * 100)"
              size="35px"
              :thickness="0.22"
              :color="
                item.uploadProgress.status == 'UPLOADING'
                  ? 'primary'
                  : item.uploadProgress.status == 'COMPLETED'
                    ? 'positive'
                    : 'negative'
              "
              track-color="grey-3"
            >
              <template v-if="item.uploadProgress.status == 'UPLOADING'">
                {{ Math.round(item.uploadProgress.progress * 100) }}%
              </template>
              <template v-else-if="item.uploadProgress.status == 'COMPLETED'">
                <BaseIcon :name="biCheck2" color="positive" size="16px" />
              </template>
              <template v-else-if="item.uploadProgress.status == 'FAILED'">
                <BaseIcon :name="biExclamation" color="negative" size="16px" />
              </template>
            </q-circular-progress>
          </template>

          <BaseButton
            v-if="showDelete && (!item.uploadProgress || item.uploadProgress.status != 'UPLOADING')"
            :icon="biX"
            flat
            round
            @click="onRemove($event, index)"
          >
            <BaseTooltip color="negative">
              {{ t('base.delete') }}
            </BaseTooltip>
          </BaseButton>
        </div>
      </slot>
    </q-item-section>
  </q-item>
</template>
