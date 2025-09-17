<script setup lang="ts">
import { ClientOnly } from '#components'
import { useBase } from '@/composables/useBase'
import { useLang } from '@/composables/useLang'
import { biPlus } from '@quasar/extras/bootstrap-icons'
import { onBeforeUnmount, ref } from 'vue'
import {
  FileExtensionAccept,
  FileTypeAcceptList,
  LimitFileSize,
  LimitFileSizeMB,
  MaxSelectFiles,
  FileExtensionVdoAccept
} from '~/libs/constants'
import type { FileManager } from '~/types/models'
import { getImgUrlFromFile, isImageFile, zipFile } from '~/utils/fileUtil'
import BaseButton from './BaseButton.vue'

const {
  multiple = true,
  showPreview = true,
  maxFiles = MaxSelectFiles,
  icon = biPlus,
  accept = FileExtensionAccept,
  gallery = false,
  previewHieight = '250px',
  limitFileSize = LimitFileSize,
  limitFileSizeMB = LimitFileSizeMB,
  videoEditor = false
} = defineProps<{
  multiple?: boolean
  showPreview?: boolean
  gallery?: boolean
  icon?: string
  label?: string
  accept?: string //* = wildcard all extension
  wildcard?: boolean
  maxFiles?: number //0 = unlimited pick
  previewHieight?: string
  limitFileSize?: number
  limitFileSizeMB?: number
  videoEditor?: boolean
}>()
const { appToast } = useBase()
const { t } = useLang()
const modelValue = defineModel<any[]>({ default: () => [] })
const fileItems = defineModel<FileManager[]>('fileItems', { default: () => [] })
const modelFiles = ref<any[]>([])

const videoEditorTimeout = ref<any>()
const emit = defineEmits<{
  'on-file-add': [files: File[]]
}>()
const appFileInputRef = ref()
//file upload

//Video
const showVdoEditor = ref<boolean>(false)
const vdoFile = ref<File | null | undefined>(undefined)

const openFilePicker = () => {
  if (multiple && maxFiles > 0 && modelValue.value && modelValue.value.length == maxFiles) {
    appToast(t('error.limitFile2', { total: maxFiles }), {
      type: 'negative'
    })
    return
  }

  if (!appFileInputRef.value) {
    return
  }
  appFileInputRef.value.$el.click()
}
const onClear = (event: any) => {
  if (event) {
    event.stopPropagation()
  }
  onClearProcess()
}
const onClearProcess = () => {
  modelValue.value = []
  modelFiles.value = []
  fileItems.value = []
}
const onRejected = (rejectedEntries: any) => {
  appToast(t('error.filesValidationFmt', { total: rejectedEntries.length }), {
    type: 'negative'
  })
}
const validateAndZipFile = async (files: File[]): Promise<any[]> => {
  const list: any[] = []
  for (const f of files) {
    const type = f.type
    if (f.size > limitFileSize) {
      appToast(t('error.limitEachFile2', [f.name, limitFileSizeMB]), {
        multiLine: false,
        type: 'negative'
      })
    } else {
      const allowType = FileTypeAcceptList.includes(type)
      if (!allowType) {
        const ziped = await zipFile(f)
        if (ziped) {
          list.push(ziped)
        }
      } else {
        list.push(f)
      }
    }
  }
  return new Promise(resolve => {
    resolve(list)
  })
}
const onFileAdded = async (files: File[] | File) => {
  showVdoEditor.value = false
  // console.log('onFileAdded', files)
  const fileList = Array.isArray(files) ? files : [files]
  if (!videoEditor) {
    const finalFiles = await validateAndZipFile(fileList)
    onEmitFileAdd(finalFiles);
    if (multiple) {
      if (finalFiles && finalFiles.length > 0) {
        for (const f of finalFiles) {
          await onAddFile(f)
        }
      }
    } else if (finalFiles) {
      modelValue.value = []
      fileItems.value = []
      await onAddFile(finalFiles[0])
    }
    modelFiles.value = []
  } else {
    const f = fileList[0]
    if (f && f?.type) {
      const type = getFileType(f?.type)
      if (type && type == 'video') {
        vdoFile.value = f
        videoEditorTimeout.value = setTimeout(() => {
          showVdoEditor.value = true
        }, 500)
      } else {
        // showVdoEditor.value = true
        onEmitFileAdd(fileList);
      }
    }
  }
}
const onAddFile = async (f: any): Promise<void> => {
  if (f) {
    const isImg = isImageFile(f)
    let url: string | undefined = undefined
    if (isImg) {
      url = await getImgUrlFromFile(f)
    }
    onAddFilePreview(f, isImg, url)
  }
}
const onAddFilePreview = (f: File, image: boolean, pathUrl: string | undefined = undefined) => {
  if (modelValue.value && f) {
    modelValue.value.push(f)
    fileItems.value.push({
      id: 0,
      fileMime: f.type,
      fileName: f.name,
      filePath: pathUrl ? pathUrl : '',
      fileThumbnailPath: '',
      fileSize: f.size + '',
      functionId: 0,
      image: image,
      file: f
    })
  }
}
const onEmitFileAdd = (items: File[]) => {
 emit('on-file-add', items)
}
const onVideoEditorClose = () => {
  showVdoEditor.value = false
  vdoFile.value = null
  modelFiles.value = []
}
const onVideoAdd = (f: FileManager) => {
  console.log('onVideoAdd', f)
  if (f && f.file) {
    onEmitFileAdd([f.file]);
    modelValue.value.push(f.file)
    fileItems.value.push(f)
  }
}
const onRemoveNewImage = (index: number) => {
  if (!modelValue.value || modelValue.value.length == 0) {
    return
  }
  if (multiple) {
    onRemoveProcess(index)
  } else {
    onClearProcess()
  }
}
const onRemoveProcess = (index: number) => {
  modelValue.value = modelValue.value.filter((v: any, i: number) => i != index)
  fileItems.value = fileItems.value.filter((v: any, i: number) => i != index)
  modelFiles.value = modelFiles.value.filter((v: any, i: number) => i != index)
}
const clearAppTimeout = () => {
  if (videoEditorTimeout.value) {
    clearTimeout(videoEditorTimeout.value)
  }
}
onBeforeUnmount(() => {
  onClearProcess()
  clearAppTimeout()
})
defineExpose({
  openFilePicker
})
</script>
<template>
  <div v-bind="$attrs">
    <div class="cursor-pointer div" @click="openFilePicker">
      <slot>
        <BaseButton :icon="icon" outline :label="label ? label : t('base.chooseFile')" />
      </slot>
    </div>
    <ClientOnly>
      <div v-if="showPreview" class="row">
        <div class="col-12 div-preview q-py-xs">
          <!-- <BaseScrollArea :height="previewHieight"> -->
          <template v-if="fileItems.length > 0 && modelValue && modelValue.length > 0">
            <LazyBaseFilesPreview
              :gallery
              :items="fileItems"
              format-size
              @on-remove="onRemoveNewImage"
            />
          </template>
          <!-- </BaseScrollArea> -->
        </div>
      </div>

      <template v-if="showVdoEditor">
        <LazyBaseVideoEditorDialog
          v-if="showVdoEditor && vdoFile"
          v-bind:show="showVdoEditor"
          :file="vdoFile"
          @on-close="onVideoEditorClose"
          @on-submit="onVideoAdd"
        />
      </template>
    </ClientOnly>

    <q-file
      ref="appFileInputRef"
      v-model="modelFiles"
      style="display: none"
      filled
      :max-files="maxFiles"
      bottom-slots
      :label="label ? label : t('base.chooseFile')"
      counter
      :multiple="multiple && !videoEditor"
      :accept="videoEditor ? FileExtensionVdoAccept : !wildcard ? accept : undefined"
      @rejected="onRejected"
      @update:model-value="onFileAdded"
    />
  </div>
</template>
<style lang="css" scoped>
.truncate-chip-labels {
  max-width: 140px;
}
.div {
  width: fit-content;
}
.div-preview {
  max-height: v-bind(previewHieight);
  overflow: auto;
}
</style>
