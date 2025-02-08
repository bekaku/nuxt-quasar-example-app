<script setup lang="ts">
import type { IconSet } from '~/types/common';

const { flat = false, bordered = true } = defineProps<{
    flat?: boolean
    bordered?: boolean
    title?: string
    icon?: string
    iconSet?: IconSet
}>();
</script>
<template>
    <q-card v-bind="$attrs" :flat :bordered="bordered" :class="{ 'default-card': !flat }">
        <q-card-section v-if="icon || title">
            <q-toolbar>
                <slot name="toolBarStart">
                    <BaseIcon v-if="icon" :icon="icon" :icon-set="iconSet" />
                </slot>
                <q-toolbar-title> {{ title }} </q-toolbar-title>
                <q-space />
                <slot name="toolBarEnd" />
            </q-toolbar>
            <q-separator />
        </q-card-section>
        <slot />
    </q-card>
</template>
<style scoped lang="scss">
.default-card {
    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / .05);
    border-radius: 1rem;
}
</style>