<script setup lang="ts" generic="T">
import type { LabelValue } from '~/types/common'

const {
  item,
  dense = true,
  iconSize = '20px',
  avatarSize = '24px'
} = defineProps<{
  item: LabelValue<T>
  darkText?: string
  lightText?: string
  iconSize?: string
  dense?: boolean
  avatarSize?: string
}>()
const { t } = useLang()
const { getCurrentPath } = useBase()
const isActive = computed(() => {
  return item.to == getCurrentPath(false)
})
</script>
<template>
  <q-item
    v-bind="$attrs"
    :to="item.to"
    :clickable="item.to != undefined"
    :dense
    :active-class="item.noActiveLink ? 'q-item-no-link-highlighting' : 'active-menu-link'"
    :class="{ 'nav-active': isActive, 'default-nav-dense': dense }"
  >
    <q-item-section v-if="item.avatar || item.icon" side>
      <template v-if="item.avatar">
        <base-avatar
          v-bind="{ ...item.avatar, size: item.avatar.size || avatarSize }"
        />
      </template>
      <template v-else>
        <BaseIcon
          v-if="item.icon != undefined"
          :class="{ 'q-text-black': !isActive, 'active-menu-link': isActive }"
          v-bind="{ ...item.icon, size: item.icon.size || iconSize }"
        />
      </template>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'active-menu-link': isActive }">
        {{ item?.translateLabel !== false ? t(`${item.label}`) : item.label }}
      </q-item-label>
      <q-item-label
        v-if="item?.description"
        caption
        lines="1"
        :class="{ 'active-menu-link-caption': isActive, 'q-pb-xs': dense }"
      >
        {{ item.description }}
      </q-item-label>
    </q-item-section>
    <slot name="end" v-bind="{ item }" />
  </q-item>
</template>

<style scoped lang="scss">
.nav-active {
  // background-color: #e0e0e0 !important;
  background-color: var(--color-zinc-200) !important;
}
// .active-menu-link {
//     color: var(--color-primary-600) !important;
// }
// .active-menu-link-caption {
//     color: var(--color-primary-500) !important;
// }
body.body--dark {
  .nav-active {
    // background-color: #4a4e5a !important;
    background-color: var(--color-zinc-700) !important;
  }
}

.default-nav-dense {
  margin: 5px 5px;
  border-radius: 10px;
}
</style>
