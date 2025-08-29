<script setup lang="ts">
import type { FileManager, ImageDto, UserProfile } from '~/types/models';
const { showDeleteImage = false, maximized = true, fetch = false, showArrow = true, files = [], images = [], selectedIndex = 0 } = defineProps<{
    showDeleteImage?: boolean
    maximized?: boolean
    fetch?: boolean
    showArrow?: boolean
    user?: UserProfile
    files?: FileManager[]
    images?: ImageDto[]
    selectedIndex?: number
}>();
const emit = defineEmits<{
    'on-close': []
    'on-before-hide': []
    'on-delete': [index: number]
}>()
const modelValue = defineModel<boolean>({ default: false });


const onClose = () => {
    modelValue.value = false;
    emit('on-close');
};
</script>
<template>
    <q-dialog :model-value="modelValue" :maximized="maximized" full-width full-height @hide="onClose"
        @before-hide="$emit('on-before-hide')">
        <base-image-view :files :selected-index :show-delete-image :show-arrow :fetch="fetch" :images="images"
            @on-delete="index => $emit('on-delete', index)" @on-close="onClose" />
    </q-dialog>
</template>
<style lang="scss" scoped>
.slide-img {
    max-width: 960px;
}
</style>