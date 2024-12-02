<script setup lang="ts">
import { useLang } from '~/composables/useLang';
const { initialLocale, t } = useLang();
const { initialQuasarDark } = useTheme();
const { isServer } = useDevice();
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
  ogUrl:'https://app.yourdomain.com',
})
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t('app.name')}` : t('app.name');
  }
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
