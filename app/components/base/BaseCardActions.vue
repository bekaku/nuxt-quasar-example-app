<script setup lang="ts">
const { vertical = false } = defineProps<{
  alignItems?: 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly' | 'stretch'
  vertical?: boolean
}>()
</script>
<template>
  <q-card-actions v-bind="$attrs" :align="alignItems" :vertical>
    <slot></slot>
  </q-card-actions>
</template>
