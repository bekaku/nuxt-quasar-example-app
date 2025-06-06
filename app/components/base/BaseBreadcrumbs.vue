<script setup lang="ts">
import { useRbac } from '~/composables/useRbac';
import type { LabelValue, AppColor } from '~/types/common'
import type { IconProps } from '~/types/props'

const {
  items,
  showSeparator = true,
  textColor = 'primary',
  activeColor = 'grey-8'
} = defineProps<{
  items: LabelValue<any>[]
  showSeparator?: boolean
  separatorIcon?: IconProps
  activeColor?: string
  textColor?: AppColor
}>()
const appStore = useAppStore()
const { t } = useLang()
const { isDark } = useTheme()
const { getParam, getQuery } = useBase()
const { hasPermission } = useRbac();
const canShow = (item: LabelValue<any>) => {
  if (item.rbac == undefined) {
    return true
  }
  return hasPermission(item.rbac)
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
    <q-breadcrumbs :class="`text-${textColor}`" :active-color="isDark ? 'white' : activeColor">
      <template #separator>
        <template v-if="showSeparator">
          <BaseIcon v-if="separatorIcon != undefined" class="text-muted" v-bind="{ ...separatorIcon }" />
          <template v-else> <span class="text-muted">/</span></template>
        </template>
      </template>
      <template v-for="(item, index) in getItems" :key="`breadcrumb-${index}-${item.to}`">
        <q-breadcrumbs-el
          :label="item.translateLabel ? (item.label ? t(item.label) : undefined) : item.label"
          :icon="item.icon?.name"
          :to="getLink(item)"
          exact
          :class="{ 'under-line': item.to != undefined }"
        />
      </template>
      <slot name="extra" />
    </q-breadcrumbs>
  </div>
</template>
<style scoped lang="css">
.under-line:hover {
  text-decoration: underline;
}
</style>
