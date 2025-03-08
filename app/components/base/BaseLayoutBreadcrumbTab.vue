<script setup lang="ts">
import { biChevronRight } from '@quasar/extras/bootstrap-icons';
import type { LabelValue } from '~/types/common';
const { getPageMetaByKey } = useBase();
const breadcrumbs = computed<LabelValue<any>[] | undefined>(() => getPageMetaByKey('breadcrumbs') as LabelValue<any>[]);
const tabs = computed<LabelValue<any>[] | undefined>(() => getPageMetaByKey('tabs') as LabelValue<any>[]);
</script>
<template>
    <div v-if="(breadcrumbs &&breadcrumbs.length > 0) || (tabs &&tabs.length > 0)" class="row q-mt-lg">
        <div class="col">
            <lazy-q-toolbar v-if="breadcrumbs && breadcrumbs.length > 0" flat bordered class="rounded">
                <LazyBaseBreadcrumbs v-if="breadcrumbs.length > 0" :items="breadcrumbs"
                    :separator-icon="biChevronRight" />
            </lazy-q-toolbar>
            <q-separator v-if="tabs && tabs.length > 0 && breadcrumbs && breadcrumbs.length > 0" />
            <lazy-q-toolbar v-if="tabs && tabs.length > 0">
                <LazyBaseTabsRoute :items="tabs" />
            </lazy-q-toolbar>
        </div>
    </div>
</template>