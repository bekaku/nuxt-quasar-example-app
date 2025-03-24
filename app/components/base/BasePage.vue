<script setup lang="ts">
import { biArrowUp } from '@quasar/extras/bootstrap-icons'

const {
  padding = true,
  full = true,
  showToTop = false,
  scrollEvent = false
} = defineProps<{
  padding?: boolean
  full?: boolean
  showToTop?: boolean
  scrollEvent?: boolean
}>()

const emit = defineEmits<{
  'on-scrol': [info: any]
}>()
const { scrollToTop } = useBase()
const { t } = useLang()
const basePageDivRef = useTemplateRef<any>('basePageDivRef')
const canScrolTop = ref<boolean>(false)
const onScroll = (info: any) => {
  if (info && info.position && info.position.top > 100) {
    canScrolTop.value = true
  } else {
    canScrolTop.value = false
  }
  emit('on-scrol', info)
}
const goToTop = () => {
  if (basePageDivRef.value) {
    scrollToTop(basePageDivRef.value)
  }
}
</script>
<template>
  <q-page v-bind="$attrs" :padding :class="{ 'content-limit': !full }">
    <div ref="basePageDivRef" />
    <q-scroll-observer v-if="scrollEvent" @scroll="onScroll" />
    <slot />

    <ClientOnly>
      <q-page-sticky v-if="showToTop && canScrolTop" position="bottom-right" :offset="[18, 18]">
        <q-btn fab :icon="biArrowUp" color="primary" @click="goToTop">
          <BaseTooltip>{{ t('base.toTop') }}</BaseTooltip>
        </q-btn>
      </q-page-sticky>
    </ClientOnly>
  </q-page>
</template>
