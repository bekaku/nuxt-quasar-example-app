<template>
    <skeleton-item v-if="loading" show :items="1" :show-header="false" />
    <q-select v-else :label="label" :dense="dense" :outlined="outlined" :filled="filled" v-model="modelValue"
        option-value="value" option-label="label" bottom-slots emit-value map-options :use-chips="useChips"
        :multiple="multiple" :readonly="readonly" :use-input="canFilter" :options="options" @filter="filterFn"
        input-debounce="0" :rules="[required ? requiredSelect : ({} as any)]" :dropdown-icon="biChevronExpand">
        <template #prepend>
            <slot name="prepend">
                <q-icon v-if="icon" :name="icon" />
            </slot>
        </template>
        <template #hint>
            <template v-if="multiple">
                {{ t('base.canChooseMoreThen1') }}
            </template>
        </template>

        <!--    <template v-slot:option="scope">-->
        <!--    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">-->
        <template v-slot:option="{ itemProps, opt, selected }">
            <q-item v-bind="itemProps">
                <q-item-section v-if="opt.avatar || opt.icon" avatar>
                    <base-avatar v-if="opt.avatar" :fetch-image="fetchImage" :src="opt.avatar" />
                    <q-icon v-else-if="opt.icon" :name="opt.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ opt.label }}</q-item-label>
                    <q-item-label v-if="opt.description" caption>{{ opt.description }}</q-item-label>
                </q-item-section>
                <q-item-section v-if="selected" side>
                    <q-icon color="primary" :name="biCheck" />
                </q-item-section>
            </q-item>
            <q-separator v-if="opt?.border" />
        </template>
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-italic text-grey">
                    {{ t('error.dataNotfound') }}
                </q-item-section>
            </q-item>
        </template>
        <template v-if="clearable" v-slot:append>
            <q-icon v-if="modelValue" class="cursor-pointer" :name="biX" @click.stop.prevent="!multiple? modelValue = null :modelValue=[]" />
        </template>
        <template #after>
            <slot name="after"> </slot>
        </template>
    </q-select>
</template>

<script setup lang="ts" generic="T">
import type { LabelValue } from '~/types/common';
import { biCheck, biChevronExpand, biX } from '@quasar/extras/bootstrap-icons';

const { requiredSelect } = useValidation();
const props = withDefaults(defineProps<{
    items: LabelValue<any>[];
    label?: string;
    optionValue?: string;
    optionLabel?: string;
    readonly?: boolean;
    dense?: boolean;
    outlined?: boolean;
    filled?: boolean;
    canFilter?: boolean;
    clearable?: boolean;
    required?: boolean;
    multiple?: boolean;
    useChips?: boolean;
    icon?: string;
    loading?: boolean;
    fetchImage?: boolean;
}>(), {
    optionValue: 'value',
    optionLabel: 'label',
    readonly: false,
    dense: true,
    canFilter: true,
    clearable: true,
    required: false,
    multiple: false,
    useChips: false,
    outlined: true,
    loading: false,
    fetchImage: false,
});
const { t } = useLang();
const modelValue = defineModel<T | T[] | null>();
const options = ref<LabelValue<any>[]>([]);
onMounted(() => {
    options.value = props.items;
});
const filterFn = (val: string, update: any) => {
    if (val === '') {
        update(() => {
            options.value = props.items;
        });
        return;
    }

    update(() => {
        const needle = val.toLowerCase();
        options.value = props.items.filter((v: LabelValue<T>) =>
            v.label.toLowerCase().includes(needle),
        );
    });
};
</script>

<style scoped></style>