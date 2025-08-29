<script setup lang="ts" generic="T">
import { biStar, biStarFill, biX } from '@quasar/extras/bootstrap-icons'
import type { LabelValue } from '~/types/common'
import FavoriteMenuService from '~/api/FavoriteMenuService'
const {
  item,
  dense = true,
  iconSize = '20px',
  avatarSize = '24px',
  canFavorite = false,
  favoriteSection = false
} = defineProps<{
  item: LabelValue<T>
  darkText?: string
  lightText?: string
  iconSize?: string
  dense?: boolean
  avatarSize?: string
  canFavorite?: boolean
  favoriteSection?: boolean
}>()
const { createFavorite, deleteFavorite } = FavoriteMenuService()
const appStore = useAppStore()
const { drawers, addFavoriteMenus } = appStore
const { favoriteMenus } = storeToRefs(appStore)
const { findByUrl, getFaveroteIndex, isFaveroteExist } = useMenu()

const { t } = useLang()
const { getCurrentPath } = useBase()
const showFavorite = ref<boolean>(false)
const isActive = computed(() => {
  return item.to == getCurrentPath(false)
})

const onFav = async (ev: any, to: string) => {
  appPreventDefult(ev)
  const existIndex = getFaveroteIndex(to)
  if (existIndex < 0) {
    const result = findByUrl(drawers, to)
    if (result) {
      addFavoriteMenus({
        url: to
      })

      await createFavorite({
        url: to
      })
    }
    console.log('onFav', 'result', result)
  }
}
const onUnFav = async (ev: any, to: string) => {
  appPreventDefult(ev)
  const existIndex = getFaveroteIndex(to)
  if (existIndex >= 0) {
    favoriteMenus.value.splice(existIndex, 1)
    await deleteFavorite({
      url: to
    })
  }
  console.log('onUnFav', 'existIndex', existIndex)
}
</script>
<template>
  <q-item
    v-bind="$attrs"
    :to="item.to"
    :clickable="item.to != undefined"
    :dense
    :active-class="item.noActiveLink ? 'q-item-no-link-highlighting' : 'active-menu-link'"
    :class="{ 'nav-active': isActive, 'default-nav-dense': dense }"
    @mouseover="showFavorite = true"
    @mouseleave="showFavorite = false"
  >
    <q-item-section v-if="item.avatar || item.icon" side>
      <template v-if="item.avatar">
        <base-avatar v-bind="{ ...item.avatar, size: item.avatar.size || avatarSize }" />
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
    <slot name="end" v-bind="{ item }">
      <q-item-section v-if="canFavorite && item.to" side>
        <template v-if="favoriteSection">
          <BaseButton
            v-if="isFaveroteExist(item.to)"
            :icon="biX"
            flat
            round
            size="xs"
            :text-color="!showFavorite ? undefined : 'negative'"
            @click="onUnFav($event, item.to)"
          >
            <BaseTooltip>
              {{ t('base.unFaveoriteMenu') }}
            </BaseTooltip>
          </BaseButton>
        </template>
        <template v-else>
          <BaseButton
            v-if="showFavorite && !isFaveroteExist(item.to)"
            :icon="biStar"
            flat
            round
            size="xs"
            text-color="grey"
            @click="onFav($event, item.to)"
          >
            <BaseTooltip>
              {{ t('base.faveoriteMenu') }}
            </BaseTooltip>
          </BaseButton>
          <BaseButton
            v-else-if="isFaveroteExist(item.to)"
            :icon="!showFavorite ? biStarFill : biX"
            flat
            round
            size="xs"
            :text-color="!showFavorite ? 'yellow' : 'negative'"
            @click="onUnFav($event, item.to)"
          >
            <BaseTooltip>
              {{ t('base.unFaveoriteMenu') }}
            </BaseTooltip>
          </BaseButton>
        </template>
      </q-item-section>
    </slot>
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
