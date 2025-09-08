<script setup lang="ts">
const { horizontal = false, padding = true } = defineProps<{
  horizontal?: boolean
  padding?: boolean
}>()
</script>
<template>
  <q-card-section v-bind="$attrs" :horizontal :class="{ 'q-pa-none': !padding }">
    <slot></slot>
  </q-card-section>
</template>
