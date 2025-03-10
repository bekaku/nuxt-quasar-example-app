<script setup lang="ts">
import type { LabelValue, AppColor } from '~/types/common'

const {
  items,
  showSeparator = true,
  textColor = 'primary',
  activeColor = 'grey'
} = defineProps<{
  items: LabelValue<any>[]
  showSeparator?: boolean
  separatorIcon?: string
  activeColor?: string
  textColor?: AppColor
}>()
const appStore = useAppStore()
const { t } = useLang()
const { getParam, getQuery } = useBase()
const canShow = (item: LabelValue<any>) => {
  if (item.permissions == undefined) {
    return true
  }
  return appStore.isHavePermission(item.permissions)
}
const getItems = computed<LabelValue<any>[]>(() => {
  return items.filter(t => canShow(t) === true)
})
const getLink = (item: LabelValue<any>) => {
  let link = item.to
  if (link) {
    const params = item.params
    if (params && params.length > 0) {
      for (const p of params) {
        const paramValue = getParam<string>(p)
        if (paramValue) {
          link = link.replaceAll(`:${p}`, paramValue)
        }
      }
    }
    const queries = item.queries
    if (queries && queries.length > 0) {
      for (const q of queries) {
        const queryValue = getQuery<string>(q)
        if (queryValue) {
          link = link.replaceAll(`{${q}}`, queryValue)
        }
      }
    }
  }
  return link
}
</script>
<template>
  <div v-if="getItems.length > 0" class="q-pa-md q-gutter-sm">
    <q-breadcrumbs :class="`text-${textColor}`" :active-color="activeColor">
      <template #separator>
        <template v-if="showSeparator">
          <q-icon v-if="separatorIcon" class="text-muted" :name="separatorIcon" />
          <template v-else> <span class="text-muted">/</span></template>
        </template>
      </template>
      <template v-for="(item, index) in getItems" :key="`breadcrumb-${index}-${item.to}`">
        <q-breadcrumbs-el
          :label="item.translateLabel ? (item.label ? t(item.label) : undefined) : item.label"
          :icon="item.icon"
          :to="getLink(item)"
          exact
        />
      </template>
      <slot name="extra" />
    </q-breadcrumbs>
  </div>
</template>
