<script setup lang="ts">
const appStore = useAppStore()
</script>
<template>
  <!-- <q-layout view="hHh lpR fFf"> -->
  <q-layout view="lHh Lpr lff">
    <BaseHeader :show-togle-drawer="true" :show-logo="true" bordered />
    <BaseSidebar v-model="appStore.drawerOpen" bordered />
    <q-page-container>
      <BaseLayoutBreadcrumbTab />
      <slot />
    </q-page-container>
  </q-layout>
</template>
