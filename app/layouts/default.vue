<script setup lang="ts">
import { biLayoutSidebar, biLayoutSidebarReverse } from '@quasar/extras/bootstrap-icons';

</script>
<template>
    <!-- <q-layout view="hHh lpR fFf"> -->
    <q-layout view="lHh Lpr lff">
        <BaseHeader :show-togle-drawer="true" :show-logo="true" bordered :hamberger-icon="biLayoutSidebar"
            :hamberger-icon-off="biLayoutSidebarReverse" hamberger-size="18px" />
        <BaseSidebar bordered />
        <q-page-container>
            <BaseLayoutBreadcrumbTab />
            <slot />
        </q-page-container>
    </q-layout>
</template>