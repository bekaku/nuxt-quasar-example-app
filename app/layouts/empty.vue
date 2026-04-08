<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>
<template>
    <q-layout view="hHh LpR fFf">
        <q-page-container>
            <slot />
        </q-page-container>
    </q-layout>
</template>