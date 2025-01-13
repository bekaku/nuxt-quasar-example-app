<script setup lang="ts" generic="T">
import { biCheck2, biSearch } from '@quasar/extras/bootstrap-icons';
import type { AppColor, LabelValue } from '~/types/common';

const {
    items,
    multiple = false,
    loading = false,
    inputDebounce = 100,
    canFilter = true,
    dense = true,
    icon = biSearch,
    color = 'primary',
    scrollHeight = '420px',
} = defineProps<{
    items: LabelValue<T>[];
    label?: string;
    readonly?: boolean;
    dense?: boolean;
    canFilter?: boolean;
    multiple?: boolean;
    icon?: string;
    loading?: boolean;
    inputDebounce?: number;
    lazy?: boolean
    noOptionsText?: string
    placeholder?: string
    color?: AppColor
    iconSize?: string
    avatarSize?: string
    scrollHeight?: string
}>();
const { t } = useLang();
const modelValue = defineModel<T | T[] | null>();
// const options = ref<LabelValue<T>[]>([...items]);
const filterText = ref<string>('');
// watchEffect(() => {
//     options.value = items;
// })
const emit = defineEmits<{
    'on-click': [val: T | undefined]
}>()
const filterItems = computed(() => {
    if (filterText.value === undefined || filterText.value.trim().length == 0) {
        return items;
    }
    return items
        .map(item => {
            if (item.children) {
                // If the item has children, filter them
                const filteredChildren = item.children.filter(child => child.label.toLowerCase().includes(filterText.value.toLowerCase()) || (child.description != undefined && child.description.toLowerCase().includes(filterText.value.toLowerCase())));
                return { ...item, children: filteredChildren };
            } else {
                // If no children, filter by the item's own label
                return item.label.toLowerCase().includes(filterText.value.toLowerCase()) || (item.description != undefined && item.description.toLowerCase().includes(filterText.value.toLowerCase())) ? item : null;
            }
        })
        .filter(item => item !== null && (!item.children || item.children.length > 0));
})
const onClick = (val: T | undefined) => {
    emit('on-click', val);
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
    if (modelValue.value != undefined && Array.isArray(modelValue.value)) {
        const t = getSelectedBy(val);
        if (t) {
            modelValue.value = modelValue.value.filter((v: T) => v !== val);
        } else {
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
        <QuasarInput v-if="canFilter" v-model="filterText" borderless :icon="icon" :dense :debounce="inputDebounce"
            :placeholder="placeholder || t('base.typeForsearch') + '...'">
            <template v-if="loading" #prepend>
                <BaseSpinner type="defult" size="24px" />
            </template>
            <template #append>
                <slot name="inputAppend" />
            </template>

        </QuasarInput>
        <q-separator />
        <q-card-section>
            <q-list :dense>
                <BaseScrollArea :height="scrollHeight">
                    <template v-for="(item, index) in filterItems" :key="`app-commandpalette-${index}`">
                        <template v-if="item && item.children && item.children.length > 0">
                            <q-item-label header>{{ item.label }}</q-item-label>
                            <q-separator v-if="item.border" class="q-mb-sm" />
                            <BaseLabelValueItem v-for="(itemLevel2, indexLevel2) in item.children"
                                :key="`app-submenulevel2-${index}-${indexLevel2}`" :item="itemLevel2"
                                :avatar-size="iconSize" :icon-size="iconSize" :high-light-text="filterText"
                                :color="getSelectedBy(itemLevel2.value) ? 'primary' : undefined" :dense
                                :clickable="item.value != undefined || (item.children && item.children.length > 0)"
                                @on-click="onClick">
                                <q-item-section v-if="getSelectedBy(itemLevel2.value)" side>
                                    <q-icon :name="biCheck2" :color />
                                </q-item-section>
                            </BaseLabelValueItem>
                        </template>
                        <template v-else>
                            <BaseLabelValueItem v-if="item" :item="item" :dense :avatar-size="iconSize"
                                :icon-size="iconSize" :high-light-text="filterText"
                                :clickable="item.value != undefined || (item.children && item.children.length > 0)"
                                :color="getSelectedBy(item.value) ? 'primary' : undefined" @on-click="onClick">
                                <q-item-section v-if="getSelectedBy(item.value)" side>
                                    <q-icon :name="biCheck2" :color />
                                </q-item-section>
                            </BaseLabelValueItem>
                        </template>
                    </template>
                </BaseScrollArea>
            </q-list>
        </q-card-section>

    </QuasarCard>
</template>