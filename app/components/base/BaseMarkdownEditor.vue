<script setup lang="ts">
import FileManagerService from '@/api/FileManagerService'
import { useBase } from '@/composables/useBase'
import { useLang } from '@/composables/useLang'
import type { FileManager } from '@/types/models'
import { biQuestion, biLink } from '@quasar/extras/bootstrap-icons'
import { MdEditor, NormalToolbar, type ToolbarNames } from 'md-editor-v3'
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
const { onUploadChunk } = useFileUpload()
const { uploadApi } = FileManagerService()
// const text = ref('# Hello Editor ### 🤖 Base');
const modelValue = defineModel<string>()
const { inputSanitizeHtml, appLoading } = useBase()
const excludToolBars = ref<ToolbarNames[]>(['save', 'github', 'htmlPreview'])
const showLoading = ref(false)
const editorRef = useTemplateRef<any>('editorRef')
const isLinkModalOpen = ref(false)
const linkTitle = ref('')
const linkUrl = ref('')
const savedSelection = ref('')
const customToolbars: ToolbarNames[] = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  0, // replce custom button
  1, // replce custom button
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly',
  'htmlPreview',
  'catalog',
  'github'
]
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
  // appLoading()
  showLoading.value = true
  const res = await Promise.all(
    files.map(async (file: any) => {
      const resPonse = await onUploadChunk(file)
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
  // appLoading(false)
  showLoading.value = true
}

const openLinkModal = () => {
  const text = editorRef.value?.getSelectedText() || ''
  linkTitle.value = text
  savedSelection.value = text
  linkUrl.value = ''
  isLinkModalOpen.value = true
}
const insertCustomLink = () => {
  if (!linkUrl.value) {
    return
  }
  const finalTitle = linkTitle.value || linkUrl.value
  const markdownLink = `[${finalTitle}](${linkUrl.value})`
  editorRef.value?.insert((selectedText: string) => {
    return {
      targetValue: markdownLink,
      select: false,
      deviationStart: 0,
      deviationEnd: 0
    }
  })
  isLinkModalOpen.value = false
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
      ref="editorRef"
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
      :toolbars="customToolbars"
      @on-save="onSave"
      @on-upload-img="onUploadImg"
    >
      <template #defToolbars>
        <NormalToolbar :title="t('base.addLink')" @on-click="openLinkModal">
          <template #trigger>
            <q-icon :name="biLink" size="sm" />
          </template>
        </NormalToolbar>
        <!--
        <NormalToolbar title="Add Emoji">
          <template #trigger>
            <q-icon :name="biEmojiLaughing" size="xs" />
          </template>
        </NormalToolbar>
        -->
      </template>
    </MdEditor>
    <div v-if="showLoading" class="editor-loader-class">
      <LazyBaseSpinner />
    </div>
    <q-dialog v-model="isLinkModalOpen" persistent class="editor-top-dialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ t('base.addLink') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="linkTitle" :label="t('base.addLinkTitle')" autofocus />
          <q-input
            dense
            v-model="linkUrl"
            :label="t('base.addLinkLink')"
            class="q-mt-md"
            @keyup.enter="insertCustomLink"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="t('base.cancel')" v-close-popup />
          <q-btn flat :label="t('base.okay')" @click="insertCustomLink" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </ClientOnly>
</template>
<style scoped lang="scss">
.md-editor-dark {
  --md-bk-color: var(--wee-second-bg-color-theme-dark) !important;
}
.editor-loader-class {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999 !important;
  background-color: rgba(0, 0, 0, 0.5);
}
.md-editor {
  z-index: 1000 !important; /* ปรับให้ต่ำกว่า 6000 ของ Quasar */
}
.md-editor.md-editor-fullscreen {
  z-index: 5555 !important;
}
.editor-top-dialog {
  z-index: 9999 !important;
}
</style>
