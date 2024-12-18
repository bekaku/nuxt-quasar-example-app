<script setup lang="ts">
import { mdiLightbulbOnOutline } from '@quasar/extras/mdi-v7';
import type { IAlert } from '~/types/common';

withDefaults(
    defineProps<{
        message: string
        title?: string
        type?: IAlert
        icon?: string
        dense?: boolean
        radius?: boolean
        closeable?: boolean
    }>(),
    {
        icon: mdiLightbulbOnOutline,
        dense: false,
        radius: false,
        closeable: false,
        title: undefined,
        type: 'is-light'
    }
);
const show = ref(true);
</script>
<template>
    <div v-show="show" class="wee-notification" :class="type" :style="{
        padding: dense ? '5px' : '1rem 2.25rem 1rem 1.25rem',
        borderRadius: radius ? '5px' : '',
    }">
        <div>
            <strong>
                <q-icon v-if="icon" :name="icon" style="margin-right: 5px" size="md" /></strong>
            <span v-if="title" class="q-mx-sm text-weight-bold">{{ title }}</span>
            {{ message ? message : '' }}
            <div>
                <slot name="extra" />
            </div>
        </div>
        <q-btn v-if="closeable" round flat icon="mdi-close" @click="show = !show" />
    </div>
</template>