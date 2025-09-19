<script setup lang="ts">
import { BaseFilePicker } from '#components'
import { biEmojiSmile, biImage, biSend, biUpload } from '@quasar/extras/bootstrap-icons'
import { FileExtensionAccept } from '~/libs/constants'
import type { FileManager } from '~/types/models'
const authenStore = useAuthenStore()
const { t } = useLang()
useHead({
  title: 'File picker'
})
const { files: fileChunks, uploading, progress, onStartUploadChunk } = useFileUpload()
const files = ref<File[]>([])
const filesPreview = ref<FileManager[]>([])
const filesSingle = ref<File[]>([])
const filesSinglePreview = ref<FileManager[]>([])

const filePickerCustomUiRef =
  useTemplateRef<InstanceType<typeof BaseFilePicker>>('filePickerCustomUiRef')
const customFiles = ref<FileManager[]>([])

const filePickerCustomUi2Ref = useTemplateRef<any>('filePickerCustomUi2Ref')
const custom2Files = ref<FileManager[]>([])
const message = ref()

const onFileChunkAdd = (items: File[]) => {
  console.log('onFileChunkAdd', items)
}
const onFileAdd = (items: File[]) => {
  console.log('onFildAdd', items)
}
const onSubmit = () => {
  console.log('onSubmit', files.value, 'filesPreview', filesPreview.value)
}

//custom ui
const openPicker = () => {
  if (filePickerCustomUiRef.value) {
    filePickerCustomUiRef.value.openFilePicker()
  }
}
const onCustomFileAdd = (items: File[]) => {
  console.log('onCustomFileAdd', items)
}
const onCustomRemove = (index: number) => {
  if (!customFiles.value) {
    return
  }
  customFiles.value.splice(index, 1)
}
//custom2 ui
const openPicker2 = () => {
  if (filePickerCustomUi2Ref.value) {
    filePickerCustomUi2Ref.value.openFilePicker()
  }
}
const onCustomFileAdd2 = (items: File[]) => {
  console.log('onCustomFileAdd', items)
}
const onCustomRemove2 = (index: number) => {
  if (!custom2Files.value) {
    return
  }
  custom2Files.value.splice(index, 1)
}
</script>
<template>
  <BasePage :full="false">
    <BaseCard title="Chunk upload">
      <q-card-section>
        <BaseFilePicker
          v-model="fileChunks"
          accept="*"
          label="Select file"
          @on-file-add="onFileChunkAdd"
        />
        <BaseButton
          class="q-my-md"
          color="positive"
          :disable="!fileChunks || fileChunks.length == 0 || uploading"
          @click="onStartUploadChunk"
        >
          Upload
        </BaseButton>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Simple Picker" subtitle="List preview">
      <q-card-section>
        <BaseFilePicker v-model="filesPreview" label="Select file" @on-file-add="onFileAdd" />
        <BaseButton class="q-my-md" color="positive" @click="onSubmit"> Submit </BaseButton>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Simple Picker 2" subtitle="Card preview">
      <q-card-section>
        <BaseFilePicker
          v-model="filesPreview"
          preview-style="CARD"
          previewCol="col-2 q-pa-md"
          @on-file-add="onFileAdd"
        >
          <BaseButton label="Click to select file" />
        </BaseFilePicker>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Single">
      <q-card-section>
        <BaseFilePicker
          v-model="filesSinglePreview"
          :multiple="false"
          accept=".jpg,.png"
          @on-file-add="onFileAdd"
        >
          <div
            class="text-center app-border-radius q-py-md"
            style="border: 1px dashed #ccc; width: 200px; height: 120px; overflow: hidden"
          >
            <q-avatar square>
              <BaseIcon name="lucide:image-plus" icon-set="nuxt" />
            </q-avatar>
            <p class="text-muted">{{ $t('drive.newFile') }}</p>
          </div>
        </BaseFilePicker>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Custom Ui">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <BaseTextHeader :header="false" title="Custom Ui1" />
          <BaseFilePicker
            ref="filePickerCustomUiRef"
            v-model="customFiles"
            style="display: none"
            :accept="FileExtensionAccept"
            @on-file-add="onCustomFileAdd"
          />
          <BaseButton
            class="q-my-md"
            outline
            :icon="biUpload"
            label="Open Picker"
            @click="openPicker"
          />
          <BaseFilesPreview
            :items="customFiles"
            format-size
            col="col-4 col-md-2 q-pa-md"
            @on-remove="onCustomRemove"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <BaseTextHeader :header="false" title="Custom Ui2" />
          <BaseFilePicker
            ref="filePickerCustomUi2Ref"
            v-model="custom2Files"
            style="display: none"
            :accept="FileExtensionAccept"
            :max-files="5"
            @on-file-add="onCustomFileAdd2"
          />

          <q-input
            v-model="message"
            dense
            outlined
            type="textarea"
            autogrow
            label="Type message"
            style="width: 100%"
          >
            <template v-if="authenStore?.auth?.avatar?.thumbnail" #prepend>
              <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
            </template>
            <template #before>
              <BaseButton round flat :icon="biImage" color="grey-7" @click="openPicker2" />
              <BaseButton round flat :icon="biEmojiSmile" color="grey-7" />
            </template>
            <template #after>
              <BaseButton flat round :icon="biSend" color="primary">
                <BaseTooltip> Send </BaseTooltip>
              </BaseButton>
            </template>
          </q-input>

          <div class="row">
            <div class="col-12 q-pa-md">
              <q-list v-if="custom2Files != undefined && custom2Files.length > 0">
                <base-scroll-area height="250px">
                  <base-files-preview-item-alt
                    v-for="(f, fileIndex) in custom2Files"
                    :key="`f-${f.id}-${fileIndex}`"
                    :item="f"
                    :index="fileIndex"
                    dense
                    format-size
                    show-delete
                    @on-remove="onCustomRemove2"
                  />
                </base-scroll-area>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </BasePage>
</template>
<style lang="scss" scoped></style>
