<script setup lang="ts">
import type { IconSet } from '~/types/common'

const {
  flat = true,
  bordered = true,
  separator = false,
  bgTransparent = false
} = defineProps<{
  flat?: boolean
  bordered?: boolean
  title?: string
  subTitle?: string
  icon?: string
  iconSet?: IconSet
  separator?: boolean
  bgTransparent?: boolean
}>()
</script>
<template>
  <q-card
    v-bind="$attrs"
    :flat
    :bordered="bordered"
    :class="{ 'default-card': !flat, 'bg-transparent': bgTransparent }"
    class="q-mb-md"
  >
    <slot name="header">
      <BaseTextHeader
        v-if="icon || title"
        class="q-py-md q-px-lg"
        :title="title"
        :sub-title="subTitle"
        :icon
      >
        <template #start>
          <slot name="start" />
        </template>
        <template #end>
          <slot name="end" />
        </template>
      </BaseTextHeader>
      <q-separator v-if="separator" />
    </slot>
    <slot />
    <slot name="footer" />
  </q-card>
</template>
<style scoped lang="scss">
.default-card {
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-radius: 1rem;
}
</style>
