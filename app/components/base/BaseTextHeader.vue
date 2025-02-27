<script setup lang="ts">

const { header = true } = defineProps<{
    label: string
    caption?: string
    icon?: string
    header?: boolean
}>();
</script>
<template>
    <div v-bind="$attrs" class="row q-mb-sm">
        <div class="col">
            <div :class="{ 'text-h6 text-weight-bold': header }">
                <q-icon v-if="icon" :name="icon" class="q-mr-xs" />{{ label }}
            </div>
            <div v-if="caption" class="text-muted">
                {{ caption }}
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
</style>