<script setup lang="ts" generic="T">
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
        disable?: boolean;
        editMode?: boolean
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
        inline: true,
        editMode: true,
        fetchImage: false,
        leftLabel: false
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
    <q-toggle v-if="!useCheckbox" v-model="modelValue" :checked-icon="biCheck" :disable="!editMode || disable" :color="color" :size="size"
        keep-color :label="useLabelTitle ? (label ? label : t('base.enable')) : modelValue
            ? trueLabel
                ? trueLabel
                : t('base.enable')
            : falseLabel
                ? falseLabel
                : t('base.disable')
            " :unchecked-icon="biX" />
    <q-checkbox v-else v-model="modelValue" :color="color" :size="size" :disable="!editMode || disable" :label="useLabelTitle ? (label ? label : t('base.enable')) : modelValue
        ? trueLabel
            ? trueLabel
            : t('base.enable')
        : falseLabel
            ? falseLabel
            : t('base.disable')
        " />
</template>