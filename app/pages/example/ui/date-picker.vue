<script setup lang="ts">

import { FORMAT_DATE14 } from '~/utils/dateUtil';
import { ref } from 'vue';
useHead({
    title:'Date time Picker'
})
const { getCurrentDateByFormat } = useDateFns();
const d = ref(getCurrentDateByFormat(FORMAT_DATE14));
const pickTime = ref<string>('');
const onUpdate = (v: string) => {
    console.log('onUpdate', v)
}
const onUpdateTime = (v: string) => {
    console.log('onUpdateTime', v)
}
</script>
<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Date time picker </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        <QuasarDatePicker v-model="d" title="Select Date" required @update:model-value="onUpdate" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <quasar-time-picker
v-model="pickTime" title="Select Date" required
                            @update:model-value="onUpdateTime" />
                    </div>

                </div>

            </q-card-section>
        </q-card>
    </q-page>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>