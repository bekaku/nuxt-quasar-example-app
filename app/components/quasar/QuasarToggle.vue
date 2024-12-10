<template>
    <div v-if="!label && showTitle" class="text-muted">
        {{ label }}
    </div>
    <q-toggle v-if="!useCheckbox" v-model="modelValue" :checked-icon="biCheck" :color="color" :size="size" keep-color
        :label="useLabelTitle ? (label ? label : t('base.enable')) : modelValue
            ? trueLabel
                ? trueLabel
                : t('base.enable')
            : falseLabel
                ? falseLabel
                : t('base.disable')
            " :unchecked-icon="biX" />

    <q-checkbox v-else v-model="modelValue" :color="color" :size="size" :label="useLabelTitle ? (label ? label : t('base.enable')) : modelValue
        ? trueLabel
            ? trueLabel
            : t('base.enable')
        : falseLabel
            ? falseLabel
            : t('base.disable')
        " />
</template>

<script setup lang="ts">
import { biCheck, biX } from '@quasar/extras/bootstrap-icons';

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
    }>(),
    {
        color: 'primary',
        size: 'md',
        useCheckbox: true,
        useLabelTitle: true,
        showTitle: false,
    }
);
const { t } = useLang();
// defineEmits(['update:modelValue']);
const modelValue = defineModel<boolean>();
</script>