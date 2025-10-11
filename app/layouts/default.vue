<script setup lang="ts">
import { additionalMenu } from '~/libs/navs'
const { isMobileOrTablet } = useAppDevice()
const modelValue = ref(!isMobileOrTablet)
const expandDrawer = ref(!isMobileOrTablet)
const miniState = ref(!isMobileOrTablet)
const overlay = ref(false)
const miniToOverlay = ref(true)
const { getFavoriteMenuItems } = useMenu()
const { version: quasarVersion } = useQuasar()
const { t } = useLang()
const { appNavigateTo } = useBase()
const appStore = useAppStore()
const searchTimeout = ref<any>()
const showSearch = ref(false)
const onOpenSearch = () => {
  showSearch.value = true
}
const onSearchMenuClick = (to: string) => {
  showSearch.value = false
  setTimeout(() => {
    appNavigateTo(to)
  }, 500)
}
const onDrawerHide = () => {
  console.log('onDrawerHide', modelValue.value)
}
const onMounseover = () => {
  if (!isMobileOrTablet) {
    miniState.value = false
  }
}
const onMounseout = () => {
  if (!isMobileOrTablet) {
    miniState.value = true
  }
}
onBeforeUnmount(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = null
})
const onOpenDrawer = () => {
  if (!isMobileOrTablet) {
    expandDrawer.value = !expandDrawer.value
  } else {
    modelValue.value = !modelValue.value
  }
}
</script>
<template>
  <q-layout view="lHh Lpr lff">
    <BaseHeader :show-togle-drawer="true" :show-logo="true" bordered>
      <template #toggleBtn>
        <BaseButton dense flat round @click="onOpenDrawer">
          <BaseIcon
            :name="expandDrawer ? 'lucide:panel-left-close' : 'lucide:panel-left-open'"
            icon-set="nuxt"
          />
        </BaseButton>
      </template>
    </BaseHeader>
    <BaseDrawer
      v-model="modelValue"
      :mini="miniState && !expandDrawer"
      :mini-to-overlay="miniToOverlay && !expandDrawer"
      :width="270"
      :overlay="overlay"
      :bordered="true"
      :tranparent="false"
      :show-header="!miniState || expandDrawer"
      @mouseover="onMounseover"
      @mouseout="onMounseout"
      @hide="onDrawerHide"
    >
      <template #headerBottom>
        <q-item clickable dense class="search-item" @click="onOpenSearch">
          <q-item-section side>
            <BaseIcon name="lucide:search" size="18px" class="text-muted" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-muted">
              {{ t('base.searchMenu') }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <BaseIcon name="lucide:command" size="18px" class="text-muted" />
          </q-item-section>
        </q-item>
      </template>
      <template v-if="getFavoriteMenuItems.length > 0">
        <BaseMenuItems :items="getFavoriteMenuItems" :padding="true" favorite-section can-favorite>
        </BaseMenuItems>
      </template>
      <BaseMenuItems
        :items="appStore.drawers"
        :show-header="!miniState || expandDrawer"
        can-favorite
      />
      <BaseMenuItems :items="additionalMenu">
        <template #after>
          <q-separator />
          <q-item dense clickable>
            <q-item-section side>
              <BaseIcon name="lucide:circle-help" />
            </q-item-section>
            <q-item-section>{{ t('base.help') }}</q-item-section>
          </q-item>
          <q-item dense clickable to="/settings">
            <q-item-section side>
              <BaseIcon name="lucide:settings" />
            </q-item-section>
            <q-item-section>{{ t('base.setting') }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section class="text-center">
              <q-item-label caption>
                {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
              </q-item-label>
              <q-item-label caption>
                {{ `Quasar ${quasarVersion}` }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </BaseMenuItems>
      <LazySearchMenu v-if="showSearch" v-model="showSearch" @on-click="onSearchMenuClick" />
    </BaseDrawer>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
<style lang="scss" scoped>
.search-item {
  padding: 10px;
  margin: 10px 10px 20px 10px;
  border-radius: 10px;
  border: var(--app-main-border-color) 1px solid;
}
</style>
