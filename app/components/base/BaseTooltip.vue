<script setup lang="ts">
import type { AppColor } from '~/types/common';

defineProps<
    {
        color?: AppColor
    }>()
const {isDark}=useTheme();
</script>
<template>
    <q-tooltip :class="`bg-${color || (isDark ?'white text-black' : 'black')}`">
        <slot />
    </q-tooltip>
</template>