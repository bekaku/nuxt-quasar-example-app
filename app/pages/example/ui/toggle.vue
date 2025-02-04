<script setup lang="ts">
import { biAndroid } from '@quasar/extras/bootstrap-icons';
import type { LabelValue } from '~/types/common';

useHead({
    title: 'Togle'
})
const toggle = ref<boolean>(false);
const optionsSelected = ref<number[]>([]);
const radioSelectd = ref<number>();
const options: LabelValue<number>[] = [
    { label: 'Crud', value: 1, color: 'negative', icon: biAndroid },
    { label: 'Report', value: 2, color: 'purple', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
    { label: 'Other', value: 3 },
]
</script>
<template>
    <BasePage>
        <BaseCard>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Toggle </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="text-h6">
                    Toggle/ Checkbox : {{ toggle }}
                </div>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        <BaseToggle v-model="toggle" label="Toggle" color="primary" :use-label-title="false" size="md"
                            true-label="True label" false-label="False label" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <BaseToggle v-model="toggle" label="Toggle" color="negative" size="md" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <BaseChekbox v-model="toggle" label="Checkbox" color="negative" size="md" />
                    </div>
                </div>
                <div class="text-h6">
                    Options checkbox : {{ optionsSelected }}
                </div>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        Options inline
                        <BaseOption v-model="optionsSelected" :items="options" label="Options inline"
                            color="negative" />
                    </div>
                    <div class="col-4 q-pa-md">
                        Options virtical
                        <BaseOption v-model="optionsSelected" :items="options" label="Options" :inline="false"
                            color="negative" />
                    </div>
                </div>
                <div class="text-h6">
                    Options radio : {{ radioSelectd }}
                </div>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        Options inline
                        <BaseRadio v-model="radioSelectd" :items="options" />
                    </div>
                    <div class="col-4 q-pa-md">
                        Options virtical
                        <BaseRadio v-model="radioSelectd" :items="options" :inline="false" />
                    </div>
                </div>
            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped></style>