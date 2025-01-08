<script setup lang="ts">
</script>
<template>
    <q-layout view="lHh Lpr lff">
        <BaseHeader :frontend="false" :show-togle-drawer="true" :show-logo="true" bordered/>
        <BaseDrawer bordered />
        <q-page-container>
            <BaseLayoutBreadcrumbTab/>
            <slot />
        </q-page-container>
    </q-layout>
</template>