<script setup lang="ts">
import type { PlyrOptions } from '~/types/common'
import type { FileManager } from '~/types/models'

const {
  file,
  replaceUrl = true,
  options = { autoplay: false }
} = defineProps<{
  file: FileManager
  options?: PlyrOptions
  replaceUrl?: boolean
}>()
const emit = defineEmits<{
  'on-close': []
}>()
const {isMobileOrTablet} = useAppDevice()
const show = defineModel<boolean>('show', { default: false })
const { onReplaceUrl, getCurrentPath, appNavigateTo } = useBase()
const appTO = ref<any>()
const onClose = () => {
  console.log('onClose')
  emit('on-close')
  show.value = false
}
const onManualClose = () => {
  console.log('onManualClose')
  onClose()
  show.value = false
}
const onOpenWatch = () => {
  appNavigateTo(`/watch/v/${file.id}`)
  onManualClose()
}
onMounted(() => {
  if (replaceUrl) {
    appTO.value = setTimeout(() => {
      onReplaceUrl(`/watch/v/${file.id}`)
    }, 500)
  }
})
onBeforeUnmount(() => {
  onReplaceUrl(getCurrentPath(true))
  if (appTO.value) {
    clearTimeout(appTO.value)
    appTO.value = null
  }
})
</script>
<template>
  <LazyBaseDialog
    v-if="show && file"
    v-model="show"
    :title="file.title || file.fileName"
    :icon="{ name: 'lucide:play' }"
    :persistent="false"
    auto-close
    :padding="false"
    :dark="false"
    full-height
    full-width
    :dialog-style="{
      width: '70vw',
      minHeight: '30vh',
      maxWidth: '80vw'
    }"
    @on-close="onClose"
    @on-hide="onClose"
  >
    <template #toolbarAction>
      <div class="row q-gutter-sm">
        <BaseButton round dense flat @click="onOpenWatch">
          <BaseIcon name="lucide:maximize" />
          <BaseTooltip>{{ $t('base.openWatch') }}</BaseTooltip>
        </BaseButton>
        <BaseButton round dense flat @click="onManualClose">
          <BaseIcon name="lucide:x" />
          <BaseTooltip>{{ $t('base.close') }}</BaseTooltip>
        </BaseButton>
      </div>
    </template>
    <div v-if="file" class="row">
      <div class="col-12 col-md-8 bg-black" :style="{ height: '90vh' }">
        <div class="row items-center full-height">
          <BaseVideoPlayer
            :style="{ width: isMobileOrTablet ? '100%' : '80%' }"
            :options
            :file
            square
          />
        </div>
      </div>
      <div class="col-12 col-md-4 q-pa-lg">
        <BaseVideoPlayerDetail :file="file" />
      </div>
    </div>
  </LazyBaseDialog>
</template>
