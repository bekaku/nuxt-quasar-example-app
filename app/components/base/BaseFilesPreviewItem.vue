<script setup lang="ts">
import type { FileManager } from '@/types/models'
import { formatBytes } from '@/utils/appUtil'
import {
  biArrowClockwise,
  biCheck2,
  biExclamation,
  biExclamationCircle,
  biX
} from '@quasar/extras/bootstrap-icons'
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
  item,
  rounded = true,
  playIcon = true,
  showVideoDetail = false,
  softDelete = false
} = defineProps<{
  showDelete?: boolean
  col?: string
  item: FileManager
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
  hoverZoom?: boolean | undefined
  rounded?: boolean | undefined
  playIcon?: boolean | undefined
  showVideoDetail?: boolean | undefined
  softDelete?: boolean | undefined
}>()
const emit = defineEmits<{
  'on-remove': [index: number]
  'on-click': [event: any, index: number]
  'on-soft-delete': [index: number]
}>()
const { formatDistanceFromNow } = useDateFns()
const { locale, t } = useLang()
const getImagePath = computed(() => {
  if (item.fileMimeType == 'IMAGE') {
    return useThumbnail && item.fileThumbnailPath ? item.fileThumbnailPath : item.filePath
  } else if (item.fileMimeType == 'VIDEO') {
    return item.fileThumbnailPath
  }
})
const onRemove = (event: any, index: number) => {
  emit('on-remove', index)
  if (event) {
    appPreventDefult(event)
  }
}
const onClick = (event: any, index: number) => {
  emit('on-click', event, index)
  if (event) {
    appPreventDefult(event)
  }
}
const onSoftDelete = (event: any, index: number) => {
  emit('on-soft-delete', index)

  if (event) {
    event.stopImmediatePropagation()
  }
}
</script>
<template>
  <template v-if="item.fileMimeType == 'IMAGE' || (item.fileMimeType == 'VIDEO' && getImagePath)">
    <div :class="{ rounded: rounded, 'hover-defult': hoverZoom }" :style="{ minWidth: imageSize }">
      <base-image
        :src="getImagePath || ''"
        :fetch="fetch"
        :ratio="item.fileMimeType == 'VIDEO' ? 16 / 9 : ratio"
        :class="{ rounded: rounded }"
        :hover-zoom="hoverZoom"
        class="cursor-pointer q-mb-xs"
        @click="onClick($event, index)"
      >
        <BaseIcon
          v-if="playIcon && item?.fileMimeType == 'VIDEO'"
          name="hugeicons:play-circle-02"
          icon-set="nuxt"
          color="white"
          size="40px"
          class="absolute-center"
        />
        <span
          v-if="item.duration"
          class="absolute-bottom-right q-pa-xs q-ma-sm text-white app-border-radius5"
          style="background-color: rgba(0, 0, 0, 0.35)"
        >
          {{ formatDurationHMS(item?.duration || 0) }}
        </span>
        <template
          v-if="showDelete && (!item.uploadProgress || item.uploadProgress.status != 'UPLOADING')"
        >
          <q-btn
            v-if="!softDelete"
            class="absolute all-pointer-events"
            name="info"
            style="top: 8px; left: 8px"
            round
            flat
            :icon="biX"
            color="negative"
            @click="onRemove($event, index)"
          >
            <BaseTooltip>
              {{ t('base.delete') }}
            </BaseTooltip>
          </q-btn>
          <q-btn
            v-else
            class="absolute all-pointer-events"
            name="info"
            style="top: 8px; left: 8px"
            round
            flat
            :icon="!item.deleteFlag ? biX : biArrowClockwise"
            color="negative"
            @click="onSoftDelete($event, index)"
          >
            <base-tooltip :color="!item.deleteFlag ? 'negative' : 'primary'">
              {{ !item.deleteFlag ? t('base.delete') : t('base.restore') }}
            </base-tooltip>
          </q-btn>
        </template>
        <base-tooltip v-if="showTooltip && item.fileName">
          {{ item.fileName }}
        </base-tooltip>
      </base-image>
      <q-item v-if="showName || showSize" :dense="dense" class="q-pa-none">
        <q-item-section class="q-pt-xs">
          <template v-if="showName">
            <q-item-label :lines="linesName" :class="textColor">
              <slot name="fileName">
                <template v-if="item.fileMimeType == 'VIDEO'">
                  {{ item.title || item.fileName }}
                </template>
                <template v-else>
                  {{ item.fileName }}
                </template>
              </slot>
            </q-item-label>
            <q-item-label
              v-if="showVideoDetail && item.fileMimeType == 'VIDEO'"
              caption
              :lines="linesName"
            >
              <span>
                {{
                  `${readableNumber(item.view || 0)} ${item.view && item.view > 1 ? $t('drive.views') : $t('drive.view')}`
                }} </span
              ><BaseSeparatorDot />
              <span v-if="item.createdDate">
                {{ formatDistanceFromNow(item.createdDate, locale, true) }}
              </span>
            </q-item-label>
          </template>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <slot name="size">
              <template v-if="showSize && !item.uploadProgress">
                {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
              </template>
            </slot>
            <template v-if="item.uploadProgress">
              <q-circular-progress
                v-if="
                  item.uploadProgress.status == 'UPLOADING' ||
                  item.uploadProgress.status == 'COMPLETED'
                "
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
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item-label v-if="softDelete && item.deleteFlag" class="text-negative text-caption">
        <q-icon :name="biExclamationCircle" class="q-mr-xs" />{{ t('deletedFlag') }}
      </q-item-label>
    </div>
  </template>
  <template v-else>
    <div class="text-center">
      <div class="row">
        <div class="col-12 cursor-pointer text-center" @click="onClick($event, index)">
          <BaseIcon
            :class="textColor"
            :name="getFileTypeIconFromFileManager(item)"
            icon-set="nuxt"
            :size="iconSize"
          />
          <template
            v-if="showDelete && (!item.uploadProgress || item.uploadProgress.status != 'UPLOADING')"
          >
            <BaseButton
              v-if="!softDelete"
              class="relative-position"
              :style="{
                top: `-${iconSize}`,
                left: `-${imageSize}`
              }"
              :icon="{ name: 'lucide:x' }"
              text-color="negative"
              flat
              round
              @click="onRemove($event, index)"
            />
            <BaseButton
              v-else
              class="relative-position"
              :style="{
                top: `-${iconSize}`,
                left: `-${imageSize}`
              }"
              :icon="{ name: !item.deleteFlag ? 'lucide:x' : 'lucide:undo' }"
              text-color="negative"
              flat
              round
              @click="onSoftDelete($event, index)"
            />
          </template>
        </div>
      </div>
      <q-item v-if="item.uploadProgress" dense>
        <q-item-section>
          <q-item-label>
            <q-circular-progress
              v-if="
                item.uploadProgress.status == 'UPLOADING' ||
                item.uploadProgress.status == 'COMPLETED'
              "
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
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="showName || showSize" :dense="dense" class="q-pa-none">
        <q-item-section>
          <q-item-label v-if="showName" :lines="linesName" :class="textColor">
            <slot name="fileName">
              {{ item.fileName }}
            </slot>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label v-if="showSize" caption :class="textColor">
            <slot name="size">
              {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
            </slot>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item-label v-if="softDelete && item.deleteFlag" class="text-negative text-caption">
        <q-icon :name="biExclamationCircle" class="q-mr-xs" />{{ t('deletedFlag') }}
      </q-item-label>
      <base-tooltip v-if="showTooltip && item.fileName">
        {{ item.fileName }}
      </base-tooltip>
    </div>
  </template>
</template>
<style lang="scss" scoped>
.hover-defult {
  overflow: hidden;
}
</style>
