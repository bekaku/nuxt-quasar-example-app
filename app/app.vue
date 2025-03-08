<script setup lang="ts">
import { useLang } from '~/composables/useLang';
const { initialLocale, t } = useLang();
const { initialQuasarDark, isDark } = useTheme();
const { isServer } = useAppDevice();

const color = computed(() => isDark.value ? '#111827' : 'white')
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t('app.name')}` : t('app.name');
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'keywords', content: 'Nuxt Quasar Example, Vue Quasar Example' },
    // { hid: 'description', name: 'description', content: 'Quasar + Nuxt3',},
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
  ogUrl: 'https://app.yourdomain.com',
})
initialLocale();
initialQuasarDark();
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
