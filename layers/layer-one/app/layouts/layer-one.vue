<script setup lang="ts">
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} - Layer One` : 'Layer One'
  },
  bodyAttrs: {
    class: 'theme-layer-one'
  },
  title: 'theme-layer Title',
  meta: [{ name: 'keywords', content: 'layer one site.' }],
  //   link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/icons/tick.png' }]
})
</script>
<template>
  <q-layout view="hHh LpR fFf" class="theme-layer-one">
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
