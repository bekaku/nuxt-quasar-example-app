<script setup lang="ts">
import type { Breadcrumb } from '~/types/common';
import { useQuasar } from 'quasar';
const { dense = true, items } = defineProps<{
    items: Breadcrumb[]
    dense?: boolean
    align?: 'left' | 'center' | 'right' | 'justify'
}>();
const { screen } = useQuasar();
const { t } = useLang();
const appStore = useAppStore();
const modelValue = defineModel<string | undefined>();

const canShow = (item: Breadcrumb) => {
    if (item.permissions == undefined) {
        return true;
    }
    return appStore.isHavePermission(item.permissions);
};
const getItems = computed<Breadcrumb[]>(() => {
    return items.filter(t => canShow(t) === true);
})
</script>
<template>
    <div v-if="getItems.length > 0" class="q-pa-md q-gutter-sm" :class="{ 'limit-tabs': !screen.gt.xs }">
        <q-tabs v-model="modelValue" :align :dense="dense" inline-label outside-arrows mobile-arrows active-color="primary">
            <template v-for="(item, index) in getItems" :key="`${index}-${item.value}`">
                <q-tab :icon="item.icon" :label="item.translateLabel ? t(item.label) : item.label" :name="item.value">
                 <slot name="inside" v-bind="{ item }"/>
                </q-tab>
            </template>
        </q-tabs>
    </div>
</template>
<style scoped lang="scss">
.limit-tabs {
    max-width: 100vw;
}
</style>