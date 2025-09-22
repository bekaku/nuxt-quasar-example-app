<script setup lang="ts">
import { biPencil } from '@quasar/extras/bootstrap-icons'
import { extractHashtagsFromString } from '~/utils/appUtil'
const { required } = useValidation()
useHead({
  title: 'Download Files'
})
const { isDownloading, downloadProgress, downloadHistory, error, downloadFile, cancleDownload } =
  useFileDownload()
const options: DownloadConfig = {
  url: 'http://127.0.0.1:8080/api/fileManager/files/stream?path=files/2022_1204_140014.MP4',
  filename: 'sample.mp4',
  historyable: false
}
const onDownload = async () => {
  await downloadFile(options)
}
</script>
<template>
  <BasePage class="content-limit">
    <BaseCard title="Streaming download large files">
      <BaseCardSection class="q-gutter-lg">
        <BaseButton :label="$t('drive.download')" :disable="isDownloading" @click="onDownload" />
        <BaseButton
          color="negative"
          :disable="!isDownloading"
          :label="$t('drive.cancelDownload')"
          @click="cancleDownload"
        />
        <BaseDownloadProgress
          :error="error"
          :is-downloading="isDownloading"
          :progress="downloadProgress"
        />
      </BaseCardSection>

      <BaseCardSection>
        <BaseTextHeader title="Example 2" />
        <div class="row q-gutter-lg">
          <BaseDownload :options="options" label="Click to download" />
          <BaseDownload :options="options"> 
            <BaseIcon name="lucide:bird"/> <span>You can click here to download</span>
        </BaseDownload>
        </div>
      </BaseCardSection>
    </BaseCard>
  </BasePage>
</template>
<style lang="scss" scoped></style>
