<script setup lang="ts">
import type { IconSet } from '~/types/common'
import type { Icon } from '~/types/props';

const { header = true, iconSize = '24px' } = defineProps<{
  title?: string
  subTitle?: string
  icon?: Icon
  iconSet?: IconSet
  iconSize?: string
  header?: boolean
}>()
</script>
<template>
  <q-item v-bind="$attrs" v-if="icon || title" class="q-pl-none">
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
      <q-item-label :class="{ 'text-h5 text-weight-bold': header }">
        {{ title }}
      </q-item-label>
      <q-item-label v-if="subTitle" :class="{ 'text-body2 text-muted': header }">
        {{ subTitle }}
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
