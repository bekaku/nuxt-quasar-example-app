<script setup lang="ts" generic="T">
import { biCheck, biX } from '@quasar/extras/bootstrap-icons';
import type { LabelValue } from '~/types/common';

withDefaults(
    defineProps<{
        label?: string;
        trueLabel?: string;
        falseLabel?: string;
        color?: string;
        size?: string;
        useCheckbox?: boolean;
        useLabelTitle?: boolean;
        showTitle?: boolean;
        disable?: boolean;
        multiple?: boolean;
        items?: LabelValue<T>[]
        inline?: boolean
        fetchImage?: boolean;
        leftLabel?: boolean;
    }>(),
    {
        color: 'primary',
        size: 'md',
        useCheckbox: true,
        useLabelTitle: true,
        showTitle: false,
        multiple: false,
        inline: true,
        fetchImage:false,
        leftLabel:false
    }
);
const { t } = useLang();
// defineEmits(['update:modelValue']);
const modelValue = defineModel<boolean | T[]>();
</script>
<template>
    <div v-if="!label && showTitle" class="text-muted">
        {{ label }}
    </div>
    <template v-if="!multiple">


        <q-toggle v-if="!useCheckbox" v-model="modelValue" :checked-icon="biCheck" :disable :color="color" :size="size"
            keep-color :label="useLabelTitle ? (label ? label : t('base.enable')) : modelValue
                ? trueLabel
                    ? trueLabel
                    : t('base.enable')
                : falseLabel
                    ? falseLabel
                    : t('base.disable')
                " :unchecked-icon="biX" />

        <q-checkbox v-else v-model="modelValue" :color="color" :size="size" :disable :label="useLabelTitle ? (label ? label : t('base.enable')) : modelValue
            ? trueLabel
                ? trueLabel
                : t('base.enable')
            : falseLabel
                ? falseLabel
                : t('base.disable')
            " />
    </template>
    <template v-else-if="items && items.length > 0">
        <q-option-group v-model="modelValue" :disable :options="items" type="checkbox" :color :size :inline :left-label="leftLabel">
            <template #label="opt">
                <div class="row items-center q-gutter-x-sm">
                    <base-avatar v-if="opt.avatar" :fetch-image="fetchImage" :src="opt.avatar" />
                    <q-icon v-else-if="opt.icon" :name="opt.icon" />
                    <span>{{ opt.label }}</span>
                </div>
            </template>
        </q-option-group>
    </template>
</template>