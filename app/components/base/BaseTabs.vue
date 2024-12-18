<script setup lang="ts">
import type { Breadcrumb } from '~/types/common';
import { useQuasar } from 'quasar';
const { dense = true } = defineProps<{
    items: Breadcrumb[]
    dense?: boolean
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
            const paramValue = getParam(p);
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
</script>
<template>
    <div v-if="items.length > 0" class="q-pa-md q-gutter-sm" :class="{ 'limit-tabs': !screen.gt.xs }">
        <q-tabs :dense="dense" inline-label outside-arrows mobile-arrows active-color="primary">
            <template v-for="(item, index) in items" :key="index">
                <q-route-tab v-if="canShow(item)" :icon="item.icon"
                    :label="item.translateLabel ? t(item.label) : item.label" :to="getLink(item)" />
            </template>
        </q-tabs>
    </div>
</template>
<style scoped lang="scss">
.limit-tabs {
    max-width: 100vw;
}
</style>