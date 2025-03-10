<script setup lang="ts">
const {
  overlay = false,
  bordered = false,
  miniToOverlay = true,
  mini = false,
  width = 270,
  tranparent = true
} = defineProps<{
  overlay?: boolean
  miniToOverlay?: boolean
  mini?: boolean
  bordered?: boolean
  width?: number
  tranparent?: boolean
}>()
const modelValue = defineModel<boolean>({ default: true })
defineEmits<{
  mouseover: []
  mouseout: []
}>()
</script>
<template>
  <q-drawer
    v-model="modelValue"
    show-if-above
    :width="width"
    :overlay="overlay"
    :bordered="bordered"
    :mini-to-overlay="miniToOverlay"
    :mini="mini"
    :class="{ 'base-sidebar': !tranparent }"
    @mouseover="$emit('mouseover')"
    @mouseout="$emit('mouseout')"
  >
    <slot />
  </q-drawer>
</template>
