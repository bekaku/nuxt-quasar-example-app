<script setup lang="ts">
const { padding = true } = defineProps<{
    padding?: boolean
}>()
</script>
<template>
    <q-page v-bind="$attrs" :padding>
        <slot />
    </q-page>
</template>