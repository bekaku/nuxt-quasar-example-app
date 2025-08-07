<script setup lang="ts">
import { useRbac } from '~/composables/useRbac'
import type { RBACProps } from '~/types/props'

const { rbac } = defineProps<{
  rbac?: RBACProps | undefined
}>()
const { hasPermission } = useRbac()
const canShow = computed<boolean>(() => {
  if (!rbac?.permissions || rbac?.permissions.length == 0) {
    return true
  }
  return hasPermission(rbac)
})
</script>
<template>
  <slot v-if="canShow"></slot>
  <slot name="fallback" v-else></slot>
</template>
