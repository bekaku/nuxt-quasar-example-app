<script setup lang="ts" generic="T">
import type { AppColor, LabelValue } from '~/types/common'

const {
  item,
  iconSize = '20px',
  avatarSize = '24px',
  dense = true,
  seperator = false,
  rounded = false
} = defineProps<{
  item?: LabelValue<T>
  iconSize?: string
  avatarSize?: string
  dense?: boolean
  clickable?: boolean
  seperator?: boolean
  color?: AppColor
  rounded?: boolean
}>()
const emit = defineEmits<{
  'on-click': [val: LabelValue<T> | undefined]
}>()
const onClick = () => {
  if (!item?.children || item.children.length == 0) {
    // if (item?.onHandle != undefined) {
    //   item.onHandle();
    // }
    emit('on-click', item)
  }
}
</script>
<template>
  <q-item
    v-if="item"
    v-bind="$attrs"
    :clickable="clickable"
    :class="{ rounded }"
    :dense
    @click="onClick"
  >
    <slot name="start">
      <q-item-section v-if="item.avatar || item.icon" side>
        <template v-if="item.avatar">
          <BaseAvatar
            v-if="item.avatar"
            v-bind="{ ...item.avatar, size: item.avatar?.size || avatarSize }"
          />
        </template>
        <template v-else>
          <BaseIcon
            v-if="item.icon != undefined"
            v-bind="{ ...item.icon, size: item.icon.size || iconSize }"
          />
        </template>
      </q-item-section>
    </slot>
    <q-item-section>
      <slot name="label">
        <q-item-label :class="color ? 'text-' + color : item.color ? 'text-' + item.color : ''">
          {{ item.label }}
        </q-item-label>
        <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
      </slot>
    </q-item-section>
    <slot name="end" />
    <slot />
  </q-item>
  <q-separator v-if="seperator" />
</template>
<style scoped></style>
