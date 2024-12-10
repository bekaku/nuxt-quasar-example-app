<template>
    <div class="row" v-if="items.length > 0">
      <div :class="col" v-for="(f, index) in items" :key="`f-${index}-${f.fileName}`" class="div-style q-pa-md">
        <base-files-preview-item :item="f" :index="index" @on-remove="onRemove" :show-delete="showDelete" :format-size="formatSize" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FileManagerDto } from '~/types/models';
  
  const { showDelete = true, col = 'col-3 q-pa-md', } = defineProps<{
    showDelete?: boolean;
    col?: string;
    items: FileManagerDto[];
    formatSize?: boolean;
  }>()
  const emit = defineEmits(['on-remove']);
  const onRemove = (index: number) => {
    emit('on-remove', index);
  };
  </script>
  <style lang="scss" scoped></style>
  