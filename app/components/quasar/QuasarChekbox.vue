<script setup lang="ts" generic="T">

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
        showLabel?: boolean;
        keepColor?: boolean;
    }>(),
    {
        color: 'primary',
        size: 'md',
        useLabelTitle: true,
        showTitle: false,
        editMode: true,
        showLabel: true,
        keepColor: false,
    }
);
const { t } = useLang();
const modelValue = defineModel<boolean | T[]>();
</script>
<template>
    <div v-if="showTitle&&!title">
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