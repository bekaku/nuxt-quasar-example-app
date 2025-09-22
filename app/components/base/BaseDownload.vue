<script setup lang="ts">
import type { ButtonProps, IconProps } from '~/types/props'

const { options } = defineProps<{
  filename?: string | null
  options: DownloadConfig
  icon?: IconProps
  label?: string
  button?: ButtonProps
}>()
const { isDownloading, downloadProgress, downloadHistory, error, downloadFile, cancleDownload } =
  useFileDownload()
const showDialog = ref(false)
const onClick = async (event: any) => {
  if (!options || !options.url) {
    return
  }
  showDialog.value = true
  onDownload()
}
const onDownload = async () => {
  if (!options || !options.url) {
    return
  }
  await downloadFile(options)
}
const onclose = () => {
  if (isDownloading.value) {
    cancleDownload()
  }
  showDialog.value = false
}
</script>
<template>
  <div v-bind="$attrs" class="cursor-pointer div-holeder" @click="onClick">
    <slot>
      <BaseButton v-bind="{ flat: true, round: !label, ...button }">
        <div class="row items-center justify-center">
          <BaseIcon v-if="icon != undefined" v-bind="{ ...icon }" />
          <BaseIcon v-else name="lucide:download" />
          <span v-if="label" class="q-ml-xs">
            {{ label }}
          </span>
        </div>
      </BaseButton>
    </slot>
  </div>
  <LazyBaseDialog
    v-if="showDialog && options"
    v-model="showDialog"
    :title="options.filename || 'Downloading'"
    :icon="{ name: 'lucide:hard-drive-download' }"
    :persistent="true"
    :auto-close="false"
    :padding="false"
    :dark="false"
    :dialog-style="{
      minWidth: '35vw',
      maxWidth: '80vw'
    }"
    @on-close="onclose"
  >
    <BaseCardSection>
      <BaseDownloadProgress
        :error="error"
        :is-downloading="isDownloading"
        :progress="downloadProgress"
      />
    </BaseCardSection>
    <BaseCardActions align-items="right">
      <BaseButton :label="$t('drive.download')" flat :disable="isDownloading" @click="onDownload" />
      <BaseButton
        :disable="!isDownloading"
        light
        :label="$t('drive.cancelDownload')"
        @click="cancleDownload"
      />
    </BaseCardActions>
  </LazyBaseDialog>
</template>
<style lang="css" scoped>
.div-holeder {
  width: fit-content;
}
</style>
