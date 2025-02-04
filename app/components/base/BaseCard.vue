<script setup lang="ts">
const {flat=false, bordered=true}=defineProps<{
    flat?:boolean
    bordered?:boolean
}>();
</script>
<template>
    <q-card v-bind="$attrs" :flat :bordered="bordered" :class="{'default-card' : !flat}">
        <slot />
    </q-card>
</template>
<style scoped lang="scss">
.default-card {
    box-shadow:0 0 #0000, 0 0 #0000,  0 1px 2px 0 rgb(0 0 0 / .05);
    border-radius: 1rem;
}
</style>