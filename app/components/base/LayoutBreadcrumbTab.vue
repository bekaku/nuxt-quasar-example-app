<script setup lang="ts">
import type { Breadcrumb } from '~/types/common';
import { biChevronRight } from '@quasar/extras/bootstrap-icons';
const { getPageMetaByKey } = useBase();
const breadcrumbs = computed<Breadcrumb[] | undefined>(() => getPageMetaByKey('breadcrumbs') as Breadcrumb[]);
const tabs = computed<Breadcrumb[] | undefined>(() => getPageMetaByKey('tabs') as Breadcrumb[]);
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
                <LazyBaseTabs :items="tabs" />
            </lazy-q-toolbar>
        </div>
    </div>
</template>