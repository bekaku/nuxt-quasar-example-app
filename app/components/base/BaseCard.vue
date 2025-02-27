<script setup lang="ts">
import type { IconSet } from '~/types/common';

const { flat = false, bordered = true, separator = false, bgTransparent=false } = defineProps<{
    flat?: boolean
    bordered?: boolean
    title?: string
    subTitle?: string
    icon?: string
    iconSet?: IconSet
    separator?: boolean
    bgTransparent?: boolean
}>();
</script>
<template>
    <q-card v-bind="$attrs" :flat :bordered="bordered" :class="{ 'default-card': !flat, 'bg-transparent': bgTransparent  }" class="q-mb-md">
      <q-toolbar v-if="icon || title" class="q-pa-md">
            <slot name="toolbarStart">
                <q-icon v-if="icon" :name="icon" size="24px" class="q-mr-xs" />
            </slot>
            <q-toolbar-title>
                <div v-if="title" class="text-h6 text-weight-bold">{{ title }} </div>
                <div v-if="subTitle" class="text-body1 text-muted">{{ subTitle }}</div>
            </q-toolbar-title>
            <q-space />
            <slot name="toolbarEnd" />
        </q-toolbar>
        <q-separator v-if="separator" />
        <slot />
    </q-card>
</template>
<style scoped lang="scss">
.default-card {
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / .05);
    border-radius: 1rem;
}
</style>