<script setup lang="ts">
import { biFunnel } from '@quasar/extras/bootstrap-icons'
import type { ICrudListHeader } from '~/types/common'

const {
  headers,
  icon = biFunnel,
  width = 200,
  listDense = true,
  btnRound = true
} = defineProps<{
  headers: ICrudListHeader[]
  icon?: string
  label?: string
  width?: number
  listDense?: boolean
  btnRound?: boolean
}>()
defineEmits(['on-sort-column', 'on-sort-mode'])
const { t } = useLang()
const fillableHeaders = computed(() => {
  return headers.filter(
    c => c.options && (c.options.fillable === true || c.options.fillable === false)
  )
})
</script>
<template>
  <q-btn v-bind="$attrs" flat :round="btnRound" :icon="icon" :label="label">
    <q-menu>
      <q-list :style="`min-width: ${width}px`" dense>
        <q-item-label header>{{ t('base.filterField') }}</q-item-label>
        <q-separator />
        <q-item
          v-for="(f, fi) in fillableHeaders"
          :key="'fill-fields-' + fi"
          clickable
          tag="label"
          dense
        >
          <q-item-section side top>
            <q-checkbox v-model="f.options.fillable" size="sm" />
          </q-item-section>
          <q-item-section>
            {{ f.translateLabel == undefined || f.translateLabel ? t(f.label) : f.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <BaseTooltip>{{ t('base.filterField') }}</BaseTooltip>
  </q-btn>
</template>
