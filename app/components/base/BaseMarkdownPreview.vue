<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { MDCodeTheme, MDPreviewTheme } from '~/types/common';

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
const { isDark } = useTheme();
const contentVal = ref<string | undefined>(props.content)
onMounted(() => {
    registerLinks();
});
const registerLinks = () => {
    const links = document.links;
    for (let i = 0, linksLength = links.length; i < linksLength; i++) {
        if (links[i] != undefined && links[i]?.hostname != window.location.hostname) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            links[i].target = '_blank';
        }
    }
};
</script>
<template>
    <ClientOnly>
        <MdPreview v-bind="$attrs" v-model="contentVal" :theme="isDark ? 'dark' : 'light'" language="en-US"
            :editor-id="editorId" :code-theme="codeTheme" :preview-theme="previewTheme" style="text-align: left;" />
    </ClientOnly>
</template>
<style scoped lang="scss">
.md-editor-dark {
    --md-bk-color: var(--wee-second-bg-color-theme-dark) !important;
}

.md-editor {
    --md-bk-color: transparent !important;
}
</style>