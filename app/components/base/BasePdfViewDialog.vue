<script setup lang="ts">
const { src, title, showDownload = true, fetchToServer = false, isBlob = false, scrollHeight = '85vh', minHeight = '500px', minWidth = '100%', closeable = true, maximized = false } = defineProps<{
    title?: string;
    src: string;
    fetchToServer?: boolean;
    showDownload?: boolean
    isBlob?: boolean
    scrollHeight?: string
    minHeight?: string
    minWidth?: string
    closeable?: boolean
    maximized?: boolean
}>();
const emit = defineEmits<{
    onClose: [void]
    onBeforeHide: [void]
    onDelete: [index: number]
}>()
const modelValue = defineModel<boolean>({ default: false });

const onClose = () => {
    modelValue.value = false;
    emit('onClose');
};
</script>
<template>
    <q-dialog :model-value="modelValue" @hide="onClose" @before-hide="$emit('onBeforeHide')" :maximized="maximized"
        full-width full-height>
        <base-pdf-view :src :closeable :title :fetchToServer :showDownload :isBlob :scrollHeight :minHeight :minWidth @on-close="onClose" />
    </q-dialog>
</template>
<style lang="scss" scoped>
</style>