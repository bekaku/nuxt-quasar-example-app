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
const { getParam } = useBase();
const appStore = useAppStore();
const getLink = (item: Breadcrumb) => {
    let link = item.to;
    const params = item.params;
    if (link && params && params.length > 0) {
        for (const p of params) {
            const paramValue = getParam<string>(p);
            if (paramValue) {
                link = link.replaceAll(`:${p}`, paramValue);
            }
        }
    }
    return link;
};
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
        <q-tabs :align :dense="dense" inline-label outside-arrows mobile-arrows active-color="primary">
            <template v-for="(item, index) in getItems" :key="`${index}-${item.label}`">
                <q-route-tab :icon="item.icon" :label="item.translateLabel ? t(item.label) : item.label"
                    :to="getLink(item)" />
            </template>
        </q-tabs>
    </div>
</template>
<style scoped lang="scss">
.limit-tabs {
    max-width: 100vw;
}
</style>