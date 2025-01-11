<script setup lang="ts">
import type { AppColor, IHrefTarget } from '~/types/common';
const { external = false } = defineProps<{
    label?: string
    external?: boolean
    href?: string
    target?: IHrefTarget
    to?: string
    color?: AppColor
    colorDark?: string
}>();
</script>
<template>
    <NuxtLink :to="to" :href="href ? href : undefined" :target="external ? '_blank' : undefined" class="app-text-link"
        :class="!color ? 'q-text-black' : 'text-' + color">
        <slot />
    </NuxtLink>
</template>
<style lang="scss" scoped></style>