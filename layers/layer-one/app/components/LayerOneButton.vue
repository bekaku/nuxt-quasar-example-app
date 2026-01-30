<script setup lang="ts">
import type { ButtonProps } from '~/types/props'
const props = withDefaults(defineProps<ButtonProps>(), {
  outline: false,
  noCaps: true,
  unelevated: true,
  glossy: false,
  flat: false,
  stack: false,
  round: false,
  push: false,
  rounded: false,
  loading: false,
  disable: false,
  dense: false,
  full: false,
  light: false,
  textCapitalize: true,
  dark: false,
  color: 'lime',
})
</script>
<template>
  <BaseButton v-bind="props" />
</template>
