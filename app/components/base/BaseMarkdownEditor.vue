<script setup lang="ts">
import FileManagerService from '@/api/FileManagerService'
import { useBase } from '@/composables/useBase'
import { useLang } from '@/composables/useLang'
import type { FileManager } from '@/types/models'
import { biQuestion } from '@quasar/extras/bootstrap-icons'
import { MdEditor, type ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref } from 'vue'
import type { MDCodeTheme, MDPreviewTheme } from '~/types/common'

const props = withDefaults(
  defineProps<{
    editorId?: string
    sanitize?: boolean
    htmlPreview?: boolean
    preview?: boolean
    noUploadImg?: boolean
    disabled?: boolean
    readOnly?: boolean
    showBtnHelp?: boolean
    previewTheme?: MDPreviewTheme
    codeTheme?: MDCodeTheme
  }>(),
  {
    editorId: 'mk-id-gd5',
    sanitize: false,
    htmlPreview: false,
    preview: true,
    noUploadImg: true,
    disabled: false,
    readOnly: false,
    showBtnHelp: false,
    previewTheme: 'github',
    codeTheme: 'github'
  }
)
const { isDark } = useTheme()
const { t } = useLang()
const { uploadApi } = FileManagerService()
// const text = ref('# Hello Editor ### 🤖 Base');
const modelValue = defineModel<string>()
const { inputSanitizeHtml, appLoading } = useBase()
const excludToolBars = ref<ToolbarNames[]>(['save', 'github', 'htmlPreview'])
const sanitizer = (html: string) => {
  if (props.sanitize) {
    return inputSanitizeHtml(html)
  }
  return html
}
const onSave = (v: any, h: any) => {
  console.log(v)
  h.then((html: any) => {
    console.log(html)
  })
}
const onUploadImg = async (files: any, callback: any) => {
  appLoading()
  const res = await Promise.all(
    files.map(async (file: any) => {
      const resPonse = await uploadApi(file)
      return new Promise((rev /*rej*/) => {
        rev(resPonse)
        // const form = new FormData();
        // form.append('file', file);
        //
        // axios
        //   .post('/api/img/upload', form, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   })
        //   .then((res) => rev(res))
        //   .catch((error) => rej(error));
      })
    })
  )

  // Approach 1
  // callback(res.map((item) => item.data.url));

  // Approach 2
  callback(
    res.map((item: FileManager) => ({
      url: item.filePath,
      alt: item.id,
      title: item.fileName
    }))
  )
  appLoading(false)
}
</script>
<template>
  <q-btn
    v-if="showBtnHelp"
    flat
    :icon="biQuestion"
    class="text-capitalize q-pa-md"
    :label="t('base.canUseMarkdown')"
  >
    <BaseTooltip>
      {{ t('base.canUseMarkdownHelp') }}
    </BaseTooltip>
    <q-menu style="width: 450px">
      <base-markdown-help />
    </q-menu>
  </q-btn>

  <ClientOnly>
    <MdEditor
      v-model="modelValue"
      :theme="isDark ? 'dark' : 'light'"
      language="en-US"
      :preview-theme="previewTheme"
      :code-theme="codeTheme"
      :editor-id="editorId"
      :sanitize="sanitizer"
      :preview="preview"
      :html-preview="htmlPreview"
      :no-upload-img="noUploadImg"
      :read-only="readOnly"
      :disabled="disabled"
      :toolbars-exclude="excludToolBars"
      show-code-row-number
      @on-save="onSave"
      @on-upload-img="onUploadImg"
    />
  </ClientOnly>
</template>
<style scoped lang="scss">
.md-editor-dark {
  --md-bk-color: var(--wee-second-bg-color-theme-dark) !important;
}
</style>
