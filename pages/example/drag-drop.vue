<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Darg drop </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import { biImage } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
//https://github.com/SortableJS/Vue.Draggable
//https://sortablejs.github.io/Vue.Draggable/#/two-lists
useHead({
    title: 'Darg drop'
})
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>