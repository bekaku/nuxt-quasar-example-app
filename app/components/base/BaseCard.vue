<script setup lang="ts">
import type { IconSet } from '~/types/common';

const { flat = false, bordered = true, separator = false } = defineProps<{
    flat?: boolean
    bordered?: boolean
    title?: string
    subTitle?: string
    icon?: string
    iconSet?: IconSet
    separator?: boolean
}>();
</script>
<template>
    <q-card v-bind="$attrs" :flat :bordered="bordered" :class="{ 'default-card': !flat }">
        <q-card-section v-if="icon || title">
            <!-- <q-toolbar>
                <slot name="toolBarStart">
                    <BaseIcon v-if="icon" :icon="icon" :icon-set="iconSet" />
                </slot>
                <q-toolbar-title class="text-weight-bold"> {{ title }}
                    <div v-if="subTitle" class="text-muted text-caption">{{ subTitle }}</div>
                </q-toolbar-title>
                <q-space />
                <slot name="toolBarEnd" />
            </q-toolbar> -->
            <div v-if="title" class="text-h6 text-weight-bold"> 
                <BaseIcon v-if="icon" :icon="icon" :icon-set="iconSet" class="q-mr-xs" /> {{ title }}
            </div>
            <div v-if="subTitle" class="text-body1 text-muted">{{subTitle}}</div>

            <q-separator v-if="separator" />
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