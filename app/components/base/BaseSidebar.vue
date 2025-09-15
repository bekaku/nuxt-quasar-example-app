<script setup lang="ts">
import { biCommand, biGear, biQuestionCircle, biSearch } from '@quasar/extras/bootstrap-icons'
import { additionalMenu } from '~/libs/navs'
const {
  overlay = false,
  bordered = false,
  miniToOverlay = true,
  width = 270,
  tranparent = false
} = defineProps<{
  overlay?: boolean
  miniToOverlay?: boolean
  bordered?: boolean
  width?: number
  tranparent?: boolean
}>()
const { getFavoriteMenuItems } = useMenu()
const { isMobileOrTablet } = useAppDevice()
const { version: quasarVersion } = useQuasar()
const { t } = useLang()
const { appNavigateTo } = useBase()
const { isDark } = useTheme()
const appStore = useAppStore()
const modelValue = defineModel<boolean>({ default: true })
const miniState = ref(!isMobileOrTablet)
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
</script>
<template>
  <BaseDrawer
    v-model="modelValue"
    :mini="miniState && !appStore.expandDrawer"
    :mini-to-overlay="miniToOverlay && !appStore.expandDrawer"
    :width="width"
    :overlay="overlay"
    :bordered="bordered"
    :tranparent
    :show-header="!miniState || appStore.expandDrawer"
    @mouseover="onMounseover"
    @mouseout="onMounseout"
    @hide="onDrawerHide"
  >
    <template #headerBottom>
      <q-item clickable dense class="search-item" @click="onOpenSearch">
        <q-item-section side>
          <q-icon :name="biSearch" size="xs" class="text-muted" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-muted">
            {{ t('base.searchMenu') }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon :name="biCommand" size="xs" class="text-muted" />
        </q-item-section>
      </q-item>
    </template>

    <template v-if="getFavoriteMenuItems.length > 0">
      <BaseMenuItems :items="getFavoriteMenuItems" :padding="true" favorite-section can-favorite>
      </BaseMenuItems>
    </template>
    <BaseMenuItems :items="appStore.drawers" can-favorite />
    <BaseMenuItems :items="additionalMenu">
      <template #after>
        <q-separator />
        <q-item dense clickable>
          <q-item-section side>
            <q-icon class="q-text-black" :name="biQuestionCircle" size="20px" />
          </q-item-section>
          <q-item-section>{{ t('base.help') }}</q-item-section>
        </q-item>
        <q-item dense clickable to="/settings">
          <q-item-section side>
            <q-icon class="q-text-black" :name="biGear" size="20px" />
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
</template>
<style lang="scss" scoped>
.search-item {
  padding: 10px;
  margin: 10px 10px 20px 10px;
  border-radius: 10px;
  border: var(--app-main-border-color) 1px solid;
}
</style>
