<script setup lang="ts">
import type { FileManager } from '~/types/models'

const {
  item,
  iconSize = '7em',
  imageSize = '100%'
} = defineProps<{
  item: FileManager
  iconSize?: string
  imageSize?: string
}>()
const emit = defineEmits<{
  'on-item-click': [event: any, id: string | number | null]
}>()
const hover = ref(false)
const { t, locale } = useLang()
const { formatDateTime } = useDateFns()
const selected = defineModel<(string | number)[]>('selected', { default: [] })
const isSelected = computed(() => selected.value.includes(item.id as string))
const onItemClick = (event: any, id: string | number | null | undefined) => {
  if (!id) {
    return
  }
  appPreventDefult(event)
  emit('on-item-click', event, id)
}
</script>
<template>
  <BaseCard
    v-if="item"
    :flat="!hover"
    :bordered="hover"
    class="card-style cursor-pointer"
    :class="{ 'card-selected': isSelected }"
    @mouseover="hover = true"
    @mouseout="hover = false"
    @click="onItemClick($event, item.id)"
  >
    <div class="row justify-center q-mb-xs">
      <template v-if="item.fileMimeType != 'DIRECTORY'">
        <template v-if="item.fileThumbnailPath">
          <BaseImage
            :src="item.fileThumbnailPath"
            :style="{ width: imageSize }"
            :alt="item.fileName"
            fit="scale-down"
            style="height: 100px"
          >
            <BaseIcon
              v-if="item?.fileMimeType == 'VIDEO'"
              name="hugeicons:play-circle-02"
              icon-set="nuxt"
              color="white"
              size="36px"
              class="absolute-center"
            />
          </BaseImage>
        </template>
        <BaseIcon
          v-else
          :name="getFileTypeIconFromFileManager(item)"
          icon-set="nuxt"
          :size="iconSize"
        />
      </template>

      <div v-else>
        <BaseIcon name="flat-color-icons:folder" icon-set="nuxt" :size="iconSize" color="yellow" />
        <span class="absolute-center" style="left: 40%; bottom: 45px">{{
          readableNumber(item.fileCount || 0)
        }}</span>
      </div>
    </div>
    <q-item dense class="text-center">
      <q-item-section>
        <q-item-label :class="{ underline: hover }" :lines="1">
          {{ item.fileName }}
        </q-item-label>
        <q-item-label caption>
          {{ formatDateTime(item.updatedDate, FORMAT_DATE1, locale) }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <BaseCheckbox
      class="absolute-top-right"
      v-model="selected"
      :val="item.id"
      :show-label="false"
    />
  </BaseCard>
</template>
<style lang="css" scoped>
.card-style {
  height: 175px;
  padding: 10px;
}
.card-selected {
  border: 2px solid var(--color-primary-500);
}
.underline {
  text-decoration: underline;
  cursor: pointer;
}
</style>
