<script setup lang="ts" generic="T">
import type { LabelValue } from '~/types/common';


const { item, iconSize = '20px', avatarSize = '24px', dense = true, } = defineProps<{
  item: LabelValue<T>
  iconSize?: string
  avatarSize?: string
  dense?: boolean
  clickable?: boolean
}>();
const emit = defineEmits<{
  'on-click': [val: T | undefined]
}>()
const onClick = () => {
  if (!item?.children || item.children.length == 0) {
    emit('on-click', item.value);
  }
};
</script>
<template>
  <q-item v-bind="$attrs" :clickable="clickable" :dense @click="onClick">
    <q-item-section v-if="item.avatar || item.icon" side>
      <template v-if="item.avatar">
        <base-avatar v-if="item.avatar" :size="avatarSize" :fetch-image="!!item.fetch" :src="item.avatar" />
      </template>
      <template v-else>
        <q-icon :name="item.icon" :size="iconSize" :color="item.color" />
      </template>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="item.color ? 'text-' + item.color : ''">{{ item.label }}</q-item-label>
      <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
    </q-item-section>
    <slot />
  </q-item>
</template>
<style scoped></style>