<script setup lang="ts">
definePageMeta({
  layout: 'layer-one'
})
// useHead({
//   title: 'My App',
//   meta: [{ name: 'keywords', content: 'layer one site.' }],
//   link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
// })
useSeoMeta({
  title: 'Theme layer one Site',
  ogTitle: 'Theme layer one Site',
  description: 'This is my Theme layer one site, let me tell you all about it.',
  ogDescription: 'This is my Theme layer one site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  ogUrl: 'https://layer-one.com',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="layer-one-test-text">Hello from Layer One page !</div>
  <LayerOneCard />
</template>
