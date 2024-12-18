<script setup lang="ts">
import type { AppColor } from '~/types/common';
//https://icones.js.org/ , https://quasar.dev/vue-components/icon
const { icon, iconSet = 'nuxt', size = '24px' } = defineProps<{
    icon: string
    iconSet?: 'nuxt' | 'quasar'
    size?: string
    color?: AppColor
}>();
</script>
<template>
    <Icon v-if="iconSet == 'nuxt'" v-bind="$attrs" :name="icon" :size="size"
        :class="color != undefined ? `text-${color}` : ''" />
    <QIcon v-else-if="iconSet == 'quasar'" v-bind="$attrs" :name="icon" :size="size" :color="color" />
</template>