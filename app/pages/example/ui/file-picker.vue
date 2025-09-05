<script setup lang="ts">
import type { FileManager } from '~/types/models'
import { FileExtensionAccept, FileExtensionVdoAccept } from '~/libs/constants'
import {
  biFileArrowUp,
  biUpload,
  biSend,
  biEmojiSmile,
  biImage,
  biPlus,
  biPerson
} from '@quasar/extras/bootstrap-icons'
import { BaseFilePicker } from '#components'
const authenStore = useAuthenStore()
const { t } = useLang()
useHead({
  title: 'File picker'
})
const { files: fileChunks, previews, uploading, progress, onStartUploadChunk } = useFileUpload()
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

const onFileVdoAdd = (items: File[]) => {
  console.log('onFileVdoAdd', items)
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
        <!-- <BaseFilePicker
          v-model="fileChunks"
          v-model:file-items="previews"
          accept="*"
          label="Select file"
          gallery
          @on-file-add="onFileVdoAdd"
        /> -->
        <BaseFilePicker
          v-model="fileChunks"
          v-model:file-items="previews"
          accept="*"
          label="Select file"
          @on-file-add="onFileVdoAdd"
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
    <BaseCard title="Simple Picker">
      <q-card-section>
        <BaseFilePicker
          v-model="files"
          v-model:file-items="filesPreview"
          label="Select file"
          @on-file-add="onFileAdd"
        />
        <BaseButton class="q-my-md" color="positive" @click="onSubmit"> Submit </BaseButton>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Simple Picker 2">
      <q-card-section>
        <BaseFilePicker
          v-model="files"
          v-model:file-items="filesPreview"
          :gallery="true"
          @on-file-add="onFileAdd"
        >
          <BaseButton label="Click to upload" />
        </BaseFilePicker>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Single">
      <q-card-section>
        <BaseFilePicker
          v-model="filesSingle"
          v-model:file-items="filesSinglePreview"
          :multiple="false"
          accept=".jpg,.png"
          @on-file-add="onFileAdd"
        >
          <q-avatar square size="140px" style="border: 1px dashed #ccc">
            <q-icon :name="biPlus" color="grey-7" />
          </q-avatar>
        </BaseFilePicker>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Custom Ui">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <BaseTextHeader :header="false" title="Custom Ui1" />
          <BaseFilePicker
            ref="filePickerCustomUiRef"
            v-model:file-items="customFiles"
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
            v-model:file-items="custom2Files"
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
