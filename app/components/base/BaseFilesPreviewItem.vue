<script setup lang="ts">
import type { FileManager } from '@/types/models'
import { formatBytes } from '@/utils/appUtil'
import { biCheck2, biExclamation, biX } from '@quasar/extras/bootstrap-icons'
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
  showVideoDetail=false
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
}>()
const emit = defineEmits<{
  'on-remove': [index: number]
  'on-click': [index: number, event: any]
}>()
const { formatDistanceFromNow } = useDateFns()
const { locale } = useLang()
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
  emit('on-click', index, event)
  if (event) {
    appPreventDefult(event)
  }
}
</script>
<template>
  <template v-if="item.fileMimeType == 'IMAGE' || (item.fileMimeType == 'VIDEO' && getImagePath)">
    <div :class="{ rounded: rounded, 'hover-defult': hoverZoom }">
      <!-- :style="{ maxHeight: imageHeight || imageSize, maxWidth: imageSize }" -->
      <base-image
        v-bind="$attrs"
        :src="getImagePath || ''"
        :fetch="fetch"
        :ratio="item.fileMimeType == 'VIDEO' ? 16 / 9 : ratio"
        :class="{ rounded: rounded }"
        :hover-zoom="hoverZoom"
        class="cursor-pointer"
        @click="onClick($event, index)"
      >
        <div v-if="item.uploadProgress" class="absolute-center all-pointer-events">
          <q-circular-progress
            v-if="
              item.uploadProgress.status == 'UPLOADING' || item.uploadProgress.status == 'COMPLETED'
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
        </div>
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

        <q-btn
          v-if="showDelete && (!item.uploadProgress || item.uploadProgress.status != 'UPLOADING')"
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
            <q-item-label v-if="showVideoDetail &&item.fileMimeType == 'VIDEO'" caption :lines="linesName">
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
      <div class="row">
        <div class="col-12 cursor-pointer text-center" @click="onClick($event, index)">
          <BaseIcon
            :class="textColor"
            :name="getFileTypeIconFromFileManager(item)"
            icon-set="nuxt"
            :size="iconSize"
          />
          <BaseButton
            v-if="showDelete && (!item.uploadProgress || item.uploadProgress.status != 'UPLOADING')"
            class="relative-position"
            :style="{
              top: `-${imageSize}`,
              left: `-${imageSize}`
            }"
            :icon="biX"
            text-color="negative"
            flat
            round
            @click="onRemove($event, index)"
          />
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
    </div>
  </template>
</template>
<style lang="scss" scoped>
.hover-defult {
  overflow: hidden;
}
</style>
