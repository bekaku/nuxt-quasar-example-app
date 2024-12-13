<script setup lang="ts">
import { biWindowSidebar } from '@quasar/extras/bootstrap-icons';
const { version: quasarVersion } = useQuasar();

</script>
<template>
    <q-layout view="lHh Lpr lff">
        <BaseHeader
:frontend="false" :show-togle-drawer="true" :show-logo="true" bordered
            :hamberger-icon="biWindowSidebar" />

        <BaseDrawer bordered />
        <q-page-container>
            <slot />
        </q-page-container>
    </q-layout>
</template>