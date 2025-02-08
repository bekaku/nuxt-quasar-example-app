<script setup lang="ts">

defineProps<{
    label: string
    caption?: string
    icon?: string
}>();
</script>
<template>
    <q-item>
        <q-item-section v-if="icon" side>
            <q-icon v-if="icon" :name="icon" class="q-mr-xs" />
        </q-item-section>
        <q-item-section>
            <q-item-label class="text-h6 text-weight-bold">
                <!-- <slot name="icon">
            <q-icon v-if="icon" :name="icon" class="q-mr-xs"/>
          </slot> -->
                {{ label }}
            </q-item-label>
            <q-item-label v-if="caption" caption>
                {{ caption }}
            </q-item-label>
        </q-item-section>
    </q-item>
</template>
<style lang="css" scoped></style>