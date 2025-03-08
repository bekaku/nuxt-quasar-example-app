<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { AppColor, LabelValue } from '~/types/common';
const { animated = true, dense = true, items, activeColor = 'primary', textColor, bgColor, useTabPanels = false } = defineProps<{
    activeColor?: AppColor
    align?: 'left' | 'center' | 'right' | 'justify'
    animated?: boolean
    bgColor?: AppColor
    dense?: boolean
    items: LabelValue<any>[]
    textColor?: AppColor
    useTabPanels?: boolean
}>();
const { screen } = useQuasar();
const { t } = useLang();
const appStore = useAppStore();
const modelValue = defineModel<string | undefined>();

const canShow = (item: LabelValue<any>) => {
    if (item.permissions == undefined) {
        return true;
    }
    return appStore.isHavePermission(item.permissions);
};
const getItems = computed<LabelValue<any>[]>(() => {
    return items.filter(t => canShow(t) === true);
})
const getCssClass = computed<string>(() => {
    if (!textColor && !bgColor) {
        return ''
    }

    return `${textColor ? 'text-' + textColor : ''} ${bgColor ? 'bg-' + bgColor : ''}`;
})
</script>
<template>
    <div v-if="getItems.length > 0" class="q-pa-md q-gutter-sm" :class="{ 'limit-tabs': !screen.gt.xs }">
        <q-tabs v-bind="$attrs" v-model="modelValue" :align :dense="dense" inline-label outside-arrows mobile-arrows
            :active-color="!textColor ? activeColor : undefined" :class="getCssClass">
            <template v-for="(item, index) in getItems" :key="`${index}-${item.value}`">
                <q-tab :icon="item.icon"
                    :label="item.translateLabel ? item.label ? t(item.label) : undefined : item.label"
                    :name="item.value">
                    <slot name="app-tab" v-bind="{ item }" />
                </q-tab>
            </template>
        </q-tabs>
        <slot name="tabPanels">
            <q-tab-panels v-if="useTabPanels" v-model="modelValue" :animated>
                <q-tab-panel v-for="(itemPanel, index) in getItems" :key="`tab-panel-${index}-${itemPanel.value}`"
                    :name="itemPanel.value">
                    <slot :name="itemPanel.value" />
                </q-tab-panel>
            </q-tab-panels>
        </slot>
    </div>
</template>
<style scoped lang="scss">
.limit-tabs {
    max-width: 100vw;
}
</style>