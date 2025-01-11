<script setup lang="ts" generic="T">
import { biCheck, biX } from '@quasar/extras/bootstrap-icons';

withDefaults(
    defineProps<{
        title?: string;
        label?: string;
        trueLabel?: string;
        falseLabel?: string;
        color?: string;
        size?: string;
        useLabelTitle?: boolean;
        showTitle?: boolean;
        disable?: boolean;
        editMode?: boolean
        inline?: boolean
        fetchImage?: boolean;
        leftLabel?: boolean;
        showLabel?: boolean;
        keepColor?: boolean;
    }>(),
    {
        color: 'primary',
        size: 'md',
        useLabelTitle: true,
        showTitle: false,
        inline: true,
        editMode: true,
        fetchImage: false,
        leftLabel: false,
        showLabel: true,
        keepColor: false,
    }
);
const { t } = useLang();
const modelValue = defineModel<boolean | T[]>();
</script>
<template>
    <div v-if="!title">
        {{ title }}
    </div>
    <q-checkbox v-bind="$attrs" v-model="modelValue" :keep-color="keepColor" :color="color" :size="size"
        :disable="!editMode || disable" :label="!showLabel ? '' : useLabelTitle ? (label ? label : t('base.enable')) : modelValue
            ? trueLabel
                ? trueLabel
                : t('base.enable')
            : falseLabel
                ? falseLabel
                : t('base.disable')
            ">
        <slot />
    </q-checkbox>
</template>