<script setup lang="ts">
import type { IconSet } from '~/types/common'
import type { IconProps } from '~/types/props'

const {
  header = true,
  iconSize = '24px',
  titleLines = 1,
  subTitleLines = 2
} = defineProps<{
  title?: string
  subtitle?: string
  icon?: IconProps
  iconSet?: IconSet
  iconSize?: string
  header?: boolean
  titleLines?: number
  subTitleLines?: number
}>()
</script>
<template>
  <q-item v-bind="$attrs" v-if="icon || title || subtitle" class="q-pl-none">
    <slot name="start">
      <q-item-section v-if="icon" side>
        <BaseIcon
          v-if="icon"
          class="q-text-black"
          v-bind="{ ...icon, size: icon?.size || iconSize }"
        />
      </q-item-section>
    </slot>
    <q-item-section>
      <q-item-label v-if="title"
        :lines="titleLines"
        class="fix-header q-py-xs"
        :class="{ 'text-h5 text-weight-bold': header }"
      >
        {{ title }}
      </q-item-label>
      <q-item-label
        v-if="subtitle"
        :lines="subTitleLines"
        :class="{ 'text-body2 text-muted': header }"
      >
        {{ subtitle }}
      </q-item-label>
    </q-item-section>
    <slot name="end" />
  </q-item>
</template>
<style lang="css" scoped>
.fit-content {
  min-width: 1px !important;
}
</style>
