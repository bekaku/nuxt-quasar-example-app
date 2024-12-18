  <script setup lang="ts">
  import type { FileManagerDto } from '@/types/models';
  import { formatBytes } from '@/utils/appUtil';
  import { getFileTypeIcon } from '~/utils/fileUtil';
  import { biTrashFill } from '@quasar/extras/bootstrap-icons';
  import { computed } from 'vue';

  const props = withDefaults(defineProps<{
    showDelete?: boolean;
    col?: string;
    item: FileManagerDto;
    index: number;
    formatSize?: boolean;
    fetch?: boolean;
    useThumbnail?: boolean;
    showName?: boolean;
    showSize?: boolean;
    imageSize?: string;
    imageHeight?: string;
    iconSize?: string;
    textColor?: string;
    dense?: boolean;
    showTooltip?: boolean;
    ratio?: number;
    linesName?: number;
  }>(), {
    showDelete: true,
    col: 'col-3 q-pa-md',
    ratio: 4 / 3,
    formatSize: false,
    fetch: false,
    showName: true,
    showSize: true,
    useThumbnail: false,
    showTooltip: false,
    dense: true,
    imageSize: '125px',
    iconSize: '4em',
    linesName: 1,
  });
  const emit = defineEmits(['on-remove', 'on-click']);
  const getImagePath = computed(() => props.useThumbnail && props.item.fileThumbnailPath ? props.item.fileThumbnailPath : props.item.filePath);
  const onRemove = (event: any, index: number) => {
    emit('on-remove', index);
    if (event) {
      event.stopImmediatePropagation();
    }
  };
  const onClick = (event: any, index: number) => {
    emit('on-click', index);
    if (event) {
      event.stopImmediatePropagation();
    }
  };
</script>
  <template>
    <template v-if="item?.isImage || item?.image">
      <base-image v-bind="$attrs" :src="getImagePath" :fetch="fetch" :ratio="ratio"
        :style="{ maxHeight: imageHeight || imageSize, maxWidth: imageSize }" class="cursor-pointer"
        @click="onClick($event, index)">
        <q-btn v-if="showDelete" class="absolute all-pointer-events" name="info" style="top: 8px; left: 8px" round
          size="sm" :icon="biTrashFill" color="negative" @click="onRemove($event, index)" />
      </base-image>
      <q-item v-if="showName || showSize" :dense="dense" v-bind="$attrs" class="q-pa-none">
        <q-item-section>
          <q-item-label v-if="showName" :lines="linesName" :class="textColor">
            <slot name="fileName">
              {{ item.fileName }}
            </slot>
          </q-item-label>
          <!-- <q-item-label v-if="showSize" caption>
            <slot name="size">
              {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
            </slot>
          </q-item-label> -->
        </q-item-section>
        <q-item-section side>
          <q-item-label v-if="showSize" caption>
            <slot name="size">
              {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
            </slot>
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <div class="text-center">
        <q-icon v-bind="$attrs" class="cursor-pointer" :size="iconSize" :name="getFileTypeIcon(item.fileMime)"
          @click="onClick($event, index)">
          <q-btn v-if="showDelete" class="absolute all-pointer-events" name="info" style="top: 8px; left: 8px" round
            size="sm" :icon="biTrashFill" color="negative" @click="onRemove($event, index)" />
          <q-tooltip v-if="showTooltip && item.fileName">
            {{ item.fileName }}
          </q-tooltip>
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