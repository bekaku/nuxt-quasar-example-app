<script setup lang="ts">
import { biCheck2, biExclamation, biX } from '@quasar/extras/bootstrap-icons'
import type { FileManager } from '~/types/models'
import { formatBytes } from '~/utils/appUtil'
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
  iconSize = '4em',
  fourceShowImage = true,
  rounded = true,
  linesName = 1,
  playIcon= true,
  showVideoDetail=false
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
  fourceShowImage?: boolean
  rounded?: boolean | undefined
  linesName?: number
  ratio?: number
  playIcon?: boolean
   showVideoDetail?: boolean | undefined
}>()
const { formatDistanceFromNow } = useDateFns()
const { t, locale } = useLang()
const emit = defineEmits<{
  'on-remove': [index: number]
  'on-click': [event: any,index: number]
}>()
const onRemove = (event: any, index: number) => {
  emit('on-remove', index)
  if (event) {
    appPreventDefult(event)
  }
}
const onClick = (event: any, index: number) => {
  emit('on-click',event, index )
  if (event) {
    appPreventDefult(event)
  }
}
</script>
<template>
  <q-item v-bind="$attrs" :dense="dense" :clickable @click="onClick($event, index)">
    <q-item-section side top>
      <template
        v-if="
          fourceShowImage &&
          (item?.fileMimeType == 'IMAGE' ||
            (item?.fileMimeType == 'VIDEO' && item?.fileThumbnailPath))
        "
      >
        <base-image
          @click="onClick($event, index)"
          :style="{ width: imageSize }"
          :class="{ rounded: rounded }"
          :fetch="fetch"
          :ratio="item.fileMimeType == 'VIDEO' ? 16 / 9 : ratio"
          :src="item?.fileMimeType == 'IMAGE' ? item.filePath : item?.fileThumbnailPath"
        >
          <span
            v-if="item.duration"
            class="absolute-bottom-right q-pa-xs q-ma-sm text-white app-border-radius5"
            style="background-color: rgba(0, 0, 0, 0.35)"
          >
            {{ formatDurationHMS(item?.duration || 0) }}
          </span>
          <BaseIcon
            v-if="playIcon &&item?.fileMimeType == 'VIDEO'"
            name="hugeicons:play-circle-02"
            icon-set="nuxt"
            color="white"
            size="40px"
            class="absolute-center"
          />
        </base-image>
        <!-- <q-avatar square :size="imageSize" class="cursor-pointer" @click="onClick($event, index)">
          <base-image :fetch="fetch" :src="item.filePath" />
        </q-avatar> -->
      </template>
      <template v-else>
        <div
          :style="{ width: imageSize }"
          class="cursor-pointer text-center"
          @click="onClick($event, index)"
        >
          <BaseIcon
            :class="textColor"
            :name="getFileTypeIconFromFileManager(item)"
            icon-set="nuxt"
            :size="iconSize"
          />
        </div>
      </template>
    </q-item-section>
    <q-item-section top>
      <q-item-label :lines="linesName" :class="textColor">
        <slot name="fileName">
          {{ item.fileName }}
        </slot>
      </q-item-label>
      <q-item-label v-if="showVideoDetail && item.fileMimeType == 'VIDEO'" caption :lines="linesName">
        <span>
          {{
            `${readableNumber(item.view || 0)} ${item.view && item.view > 1 ? $t('drive.views') : $t('drive.view')}`
          }} </span
        ><BaseSeparatorDot />
        <span v-if="item.createdDate">
          {{ formatDistanceFromNow(item.createdDate, locale, true) }}
        </span>
      </q-item-label>
      <q-item-label v-if="showSize" caption :class="textColor">
        <slot name="size">
          {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
        </slot>
      </q-item-label>
    </q-item-section>
    <q-item-section side top>
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
                <BaseIcon :name="biCheck2" color="positive" icon-set="quasar" size="16px" />
              </template>
              <template v-else-if="item.uploadProgress.status == 'FAILED'">
                <BaseIcon :name="biExclamation" color="negative" icon-set="quasar" size="16px" />
              </template>
            </q-circular-progress>
          </template>

          <BaseButton
            v-if="showDelete && (!item.uploadProgress || item.uploadProgress.status != 'UPLOADING')"
            :icon="{name:'lucide:x'}"
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
