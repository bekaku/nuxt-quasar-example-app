<template>
    <q-no-ssr>
        <MdPreview v-bind="$attrs" v-model="contentVal" :theme="dark.isActive ? 'dark' : 'light'" language="en-US"
            :editor-id="editorId" :code-theme="codeTheme" :preview-theme="previewTheme" style="text-align: left;" />
    </q-no-ssr>
</template>
<script setup lang="ts">
import type { MDCodeTheme, MDPreviewTheme } from '~/types/common';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const props = withDefaults(
    defineProps<{
        editorId?: string;
        content?: string;
        preview?: boolean;
        previewTheme?: MDPreviewTheme;
        codeTheme?: MDCodeTheme;
    }>(),
    {
        editorId: 'mk-id-gd5',
        preview: true,
        previewTheme: 'github',
        codeTheme: 'github',
    },
);
const { dark } = useQuasar();
const contentVal = ref<string | undefined>(props.content)
onMounted(() => {
    registerLinks();
});
const registerLinks = () => {
    let links = document.links;
    for (let i = 0, linksLength = links.length; i < linksLength; i++) {
        if (links[i].hostname != window.location.hostname) {
            links[i].target = '_blank';
        }
    }
};
</script>
<style scoped lang="scss">
.md-editor-dark {
    --md-bk-color: var(--wee-second-bg-color-theme-dark) !important;
}

.md-editor {
    --md-bk-color: transparent !important;
}
</style>