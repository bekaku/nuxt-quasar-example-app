<script setup lang="ts">
import type { FileManager } from '~/types/models'
const { t, locale } = useLang()
const { formatDateTime } = useDateFns()
const { items, iconSize = '3em' } = defineProps<{
  items: FileManager[]
  iconSize?: string
}>()
const emit = defineEmits<{
  'on-check-all': [val: boolean]
  'on-item-click': [id: string | number | null]
  'on-row-click': [id: string | number | null]
}>()
const selected = defineModel<(string | number)[]>('selected', { default: [] })
const selectedAll = ref(false)
const onCheckedAll = (event: any) => {
  emit('on-check-all', selectedAll.value)
}
const onItemClick = (event: any, id: string | number | null) => {
  if (!id) {
    return
  }
  appPreventDefult(event)
  selectedAll.value = false
  selected.value = [id]
  emit('on-item-click', id)
}
const onRowClick = (id: string | number | null) => {
  if (!id) {
    return
  }
  selectedAll.value = false
  selected.value = [id]
  emit('on-row-click', id)
}
</script>
<template>
  <q-markup-table v-bind="$attrs" separator="horizontal" dense flat class="crud-table">
    <thead>
      <tr>
        <th class="text-center">
          <BaseCheckbox v-model="selectedAll" :show-label="false" @click="onCheckedAll">
            <BaseTooltip>
              {{ !selectedAll ? t('base.selectAll') : t('base.deselectAll') }}
            </BaseTooltip>
          </BaseCheckbox>
        </th>
        <th class="text-left">{{ t('drive.fileName') }}</th>
        <th class="text-left">{{ t('drive.updatedDate') }}</th>
        <th class="text-left">{{ t('drive.fileSize') }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="items.length > 0">
        <template v-for="(item, index) in items" :key="`drive-list-${index}-${item.id}`">
          <tr @click="onRowClick(item.id)">
            <td class="text-center">
              <BaseCheckbox v-model="selected" :val="item.id" :show-label="false"> </BaseCheckbox>
            </td>
            <td>
              <q-item>
                <q-item-section side>
                  <BaseIcon
                    v-if="!item.directoryFolder"
                    :name="getFileTypeIconFromFileManager(item)"
                    icon-set="nuxt"
                    :size="iconSize"
                  />
                  <BaseIcon
                    v-else
                    name="flat-color-icons:folder"
                    icon-set="nuxt"
                    :size="iconSize"
                    color="yellow"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <div class="underline" @click="onItemClick($event, item.id)">
                      {{ item.fileName }}
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </td>
            <td>
              <span class="text-muted">{{
                formatDateTime(item.updatedDate, FORMAT_DATE1, locale)
              }}</span>
            </td>
            <td>
              <span class="text-muted">{{
                !item.directoryFolder ? item.fileSize : t('base.items', item.fileCount as any)
              }}</span>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </q-markup-table>
</template>
<style lang="css" scoped>
.underline {
  width: fit-content;
}
.underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
