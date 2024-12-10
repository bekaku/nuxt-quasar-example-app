<script setup lang="ts">
import draggable from "vuedraggable";
const { draggableClass = 'list-group' } = defineProps<{
    group: string
    itemKey: string
    draggableClass?: string
}>();
const modelValue = defineModel<any[]>({ default: [] });
const emit = defineEmits<{
    change: [event: any]
}>()
const onChange = (event: any) => {
    emit('change', event)
}
</script>
<template>
    <ClientOnly>
        <draggable v-bind="$attrs" v-model="modelValue" :group="group" @change="onChange" :item-key="itemKey">
            <template #header>
                <slot name="slotHeader"></slot>
            </template>
            <template #item="{ element, index }">
                <slot v-bind="{ element, index }"></slot>
            </template>
            <template #footer>
                <slot name="slotFooter"></slot>
            </template>
        </draggable>
    </ClientOnly>
</template>