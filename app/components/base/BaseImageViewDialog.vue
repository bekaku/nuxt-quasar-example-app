<script setup lang="ts">
import type { FileManagerDto, ImageDto, UserProfileDto } from '~/types/models';
const { showDeleteImage = false, maximized = true, fetch = false, showArrow = true, files = [], images = [], selectedIndex = 0 } = defineProps<{
    showDeleteImage?: boolean
    maximized?: boolean
    fetch?: boolean
    showArrow?: boolean
    user?: UserProfileDto
    files?: FileManagerDto[]
    images?: ImageDto[]
    selectedIndex?: number
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
    <q-dialog
:model-value="modelValue" :maximized="maximized" full-width full-height
        @hide="onClose" @before-hide="$emit('onBeforeHide')">
        <base-image-view
:files :selected-index :show-delete-image :show-arrow
            @on-delete="index => $emit('onDelete', index)" @on-close="onClose"/>
    </q-dialog>
</template>
<style lang="scss" scoped>
.slide-img {
    max-width: 960px;
}
</style>