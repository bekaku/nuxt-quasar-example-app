<script setup lang="ts">
import { biFolderFill } from '@quasar/extras/bootstrap-icons'
import type { FileManager } from '~/types/models'
import { getFileTypeIconFromFileName } from '~/utils/fileUtil';
const { t, locale } = useLang()
const { formatDateTime } = useDateFns()
const { items, iconSize = '3em' } = defineProps<{
  items: FileManager[]
  iconSize?: string
}>()
const emit = defineEmits<{
  'on-check-all': [val: boolean]
}>()
const selected = defineModel<string[]>('selected', { default: [] })
const selectedAll = ref(false)
const onCheckedAll = (event: any) => {
  emit('on-check-all', selectedAll.value)
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
          <tr>
            <td class="text-center">
              <BaseCheckbox v-model="selected" :val="item.id" :show-label="false"> </BaseCheckbox>
            </td>
            <td>
              <q-item>
                <q-item-section side>
                  <BaseIcon
                    v-if="!item.directoryFolder"
                    :name="getFileTypeIconFromFileName(item.fileName)"
                    icon-set="nuxt"
                    :size="iconSize"
                  />
                  <BaseIcon v-else :name="biFolderFill" :size="iconSize" color="yellow" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    {{ item.fileName }}
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
              <span class="text-muted">{{ !item.directoryFolder ? item.fileSize : t('base.items', item.fileCount as any) }}</span>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </q-markup-table>
</template>
