<script setup lang="ts" generic="T">
import type { LabelValue } from '~/types/common';
import { biCheck, biChevronExpand, biX, biSearch, biCheck2 } from '@quasar/extras/bootstrap-icons';

const {
    items,
    debounce = 100,
    multiple = false,
    loading = false,
    fetchImage = false,
    inputDebounce = 0,
    lazy = false,
    lazyLoading = false,
    canFilter = true,
    clearable = true,
    dense = true,
    icon = biSearch
} = defineProps<{
    items: LabelValue<T>[];
    label?: string;
    debounce?: number;
    readonly?: boolean;
    dense?: boolean;
    canFilter?: boolean;
    clearable?: boolean;
    multiple?: boolean;
    icon?: string;
    loading?: boolean;
    fetchImage?: boolean;
    inputDebounce?: number;
    lazy?: boolean
    noOptionsText?: string
    lazyLoading?: boolean
    placeholder?: string
}>();
const emit = defineEmits<{
    'on-filter': [value: string, update: any]
    'on-scroll': [to: number, ref: any]
}>()
const { t } = useLang();
const modelValue = defineModel<T | T[] | null>();
// const options = ref<LabelValue<T>[]>([...items]);
const filterText = ref<string>('');
// watchEffect(() => {
//     options.value = items;
// })
const getSelected = computed<undefined | LabelValue<T>>(() => {
    if (multiple || !modelValue.value) {
        return undefined;
    }
    return items.find(t => t.value == modelValue.value)
})
const filterItems = computed(() => {
    if (filterText.value === undefined || filterText.value.trim().length == 0) {
        return items;
    }
    return items.filter((v) => v.label.toLowerCase().includes(filterText.value.trim()));
})
const onClick = (val: T | undefined) => {
    if (val == undefined) {
        return;
    }

    if (!multiple) {
        if (modelValue.value === val) {
            modelValue.value = undefined;
        } else {
            modelValue.value = val;
        }
    }
    console.log('onClick', val);
    if (modelValue.value != undefined && Array.isArray(modelValue.value)) {
        const t = getSelectedBy(val);
        console.log('getSelectedBy', t);
        if (t) {
            console.log('remove self');
            modelValue.value = modelValue.value.filter((v: T) => v !== val);
        } else {
            console.log('addnew');
            modelValue.value.push(val);
        }
    }
}
const getSelectedBy = (val: T | undefined) => {
    if (val == undefined) {
        return undefined;
    }

    if (!multiple) {
        return modelValue.value
    }
    if (modelValue.value != undefined && Array.isArray(modelValue.value)) {
        return modelValue.value.find((t: T) => t == val)
    }
    return undefined
}
</script>
<template>
    <QuasarCard v-bind="$attrs" bordered flat>
        {{ filterText }}
        <QuasarInput v-model="filterText" borderless :icon="icon" :dense :debounce
            :placeholder="placeholder || t('base.typeForsearch') + '...'" />
        <q-separator />
        <q-card-section>
            <BaseLabelValueItem v-for="(item, index) in filterItems" :key="`app-command-palette-${item.value}-${index}`"
                :item="item" :dense :clickable="item.value != undefined" @on-click="onClick">
                <q-item-section v-if="getSelectedBy(item.value)" side>
                    <q-icon :name="biCheck2" />
                </q-item-section>
            </BaseLabelValueItem>
        </q-card-section>

    </QuasarCard>
</template>