<template>
    <q-item v-bind="$attrs" clickable>
      <q-item-section v-if="item.avatar || item.icon" avatar>
        <template v-if="item.avatar">
          <base-avatar v-if="item.avatar" :fetch-image="!!item.fetch" :src="item.avatar" />
        </template>
        <template v-else>
          <q-icon :name="item.icon" />
        </template>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.label }}</q-item-label>
        <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  
  <script setup lang="ts" generic="T">
  import type { LabelValue } from '@/types/common';
  
  withDefaults(defineProps<{
    item: LabelValue<T>;
  }>(), {});
  const emit = defineEmits(['on-click']);
  const onClick = (value: T) => {
    emit('on-click', value);
  };
  </script>
  
  <style scoped></style>
  