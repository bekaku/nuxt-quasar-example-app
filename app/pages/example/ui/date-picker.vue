<script setup lang="ts">

import { FORMAT_DATE14 } from '~/utils/dateUtil';
import { ref } from 'vue';
useHead({
    title: 'Date time Picker'
})
const { getCurrentDateByFormat } = useDateFns();
const d = ref(getCurrentDateByFormat(FORMAT_DATE14));
const pickTime = ref<string>('');

const dateRangeStart = ref<string>('2025-01-01');
const dateRangeEnd = ref<string>('2025-02-15');
const onUpdate = (v: string) => {
    console.log('onUpdate', v)
}
const onUpdateTime = (v: string) => {
    console.log('onUpdateTime', v)
}
const onUpdateDateRange = (v: string) => {
    console.log('onUpdateDateRange', v)
}
</script>
<template>
    <BasePage>
        <BaseCard title="Date time picker">
            <q-card-section>
                <div class="row">
                    <div class="col-6 q-pa-md">
                        <BaseDatePicker v-model="d" label="Select Date" :auto-close="false" required @on-update="onUpdate" />
                    </div>

                    <div class="col-6 q-pa-md">
                     
                        <BaseDatePicker v-model:start="dateRangeStart" v-model:end="dateRangeEnd" color="warning" show-format-date label="Range" range
                            @on-update-range="onUpdateDateRange" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <p>Inline Calendar {{ d }}</p>
                        <BaseDate v-model="d" :auto-close="false" required @on-update="onUpdate" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <BaseTimePicker v-model="pickTime" label="Select time" required @on-update="onUpdateTime" />
                    </div>
                </div>

            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>