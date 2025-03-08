<script setup lang="ts">
const { type = 'dots', color = 'primary', size = '2em' } = defineProps<{
  type?: 'dots' | 'clock' | 'ios' | 'rings' | 'tail' | 'defult',
  color?: string,
  size?: string,
}>();
</script>
<template>
  <div class="row items-center" style="height: 100%; min-height: 150px">
    <div class="col-12 text-center">
      <q-spinner-dots v-if="type == 'dots'" :color :size class="self-center" />
      <q-spinner v-else-if="type == 'defult'" :color :size class="self-center" />
      <q-spinner-clock v-else-if="type == 'clock'" :color :size class="self-center" />
      <q-spinner-ios v-else-if="type == 'ios'" :color :size class="self-center" />
      <q-spinner-rings v-else-if="type == 'rings'" :color :size class="self-center" />
      <q-spinner-tail v-else-if="type == 'tail'" :color :size class="self-center" />
    </div>
  </div>
</template>