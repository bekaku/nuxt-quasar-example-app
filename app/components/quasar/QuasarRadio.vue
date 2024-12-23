<script setup lang="ts" generic="T">
import type { LabelValue } from '~/types/common';

const { items, inline = true, size = 'md', fetchImage=false, leftLabel=false } = defineProps<{
    items: LabelValue<T>[]
    disable?: boolean
    inline?: boolean
    size?: string
    color?: string
    fetchImage?: boolean
    leftLabel?: boolean;
}>();

const modelValue = defineModel<T>();
</script>
<template>
    <!-- <q-radio v-for="(item, index) in items" :key="`${index}-${item.value}`" v-model="modelValue" :size :val="item.value"
        :color="item.color" :disable :label="item.label" /> -->
    <q-option-group v-model="modelValue" :disable :options="items" type="radio" :color :size :inline :left-label="leftLabel">
        <template #label="opt">
            <div class="row items-center q-gutter-x-sm">
                <base-avatar v-if="opt.avatar" :fetch-image="fetchImage" :src="opt.avatar" />
                <q-icon v-else-if="opt.icon" :name="opt.icon" />
                <span>{{ opt.label }}</span>
            </div>
        </template>
    </q-option-group>
</template>