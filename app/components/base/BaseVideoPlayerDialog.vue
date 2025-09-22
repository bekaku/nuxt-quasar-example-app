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
const show = defineModel<boolean>('show', { default: false })
const { onReplaceUrl, getCurrentPath, appNavigateTo } = useBase()
const appTO = ref<any>()
const onClose = () => {
  emit('on-close')
}
const onManualClose = () => {
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
    :dialog-style="{
      width: '70vw',
      minHeight: '30vh',
      maxWidth: '80vw'
    }"
    @on-close="onClose"
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
      <div class="col-12 col-md-7">
        <BaseVideoPlayer style="width: 100%" :options :file square />
      </div>
      <div class="col-12 col-md-5 q-pa-lg">
        <BaseVideoPlayerDetail :file="file" />
      </div>
    </div>
  </LazyBaseDialog>
</template>
