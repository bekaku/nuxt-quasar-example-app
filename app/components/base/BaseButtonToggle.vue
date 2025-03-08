<script setup lang="ts" generic="T">
// import type { LabelValue } from '~/types/common'
const {} = defineProps<{
  options: any[]
}>()
const modelValue = defineModel<T>()
const { isDark } = useTheme()
</script>
<template>
  <q-btn-toggle
    class="shadow-0 default"
    v-model="modelValue"
    :toggle-color="!isDark ? 'white' : 'grey-9'"
    :text-color="!isDark ? 'grey-8' : 'grey-4                                                  '"
    :toggle-text-color="!isDark ? 'black' : 'white'"
    no-caps
    :options
  />
</template>
<style lang="scss" scoped>
.default {
  padding: 5px;
  background-color: var(--color-zinc-100);
}
body.body--dark {
  .default {
    background-color: var(--color-zinc-950);
  }
}
</style>
