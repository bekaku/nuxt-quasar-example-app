<script setup lang="ts">
const { cursorPointer = true, borderRadius='5px' } = defineProps<{
  cursorPointer?: boolean
  borderRadius?: string
}>();
</script>

<template>
  <div
    v-ripple
    v-bind="$attrs"
    class="relative-position  q-hoverable"
    :class="{'cursor-pointer' : cursorPointer}"
    :style="{borderRadius:borderRadius}"
  >
    <span class="q-focus-helper"/>
    <div>
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
