<script setup lang="ts">
definePageMeta({
    layout: 'empty'
})
useHead({
    title:'Configuration',
})
//https://nuxt.com/docs/api/nuxt-config#alias
const config = useRuntimeConfig()
// console.log('Runtime config:', config.public)
// if (import.meta.server) {
//     console.log('API secret:', config.apiSecret)
// }
</script>
<template>
    <BasePage>


        {{ $t('statisticSiteView') }}
        {{ $t('app.name') }}
        <!-- public config {{ $config.public }} -->

        <p>
            <NuxtLink to="/">Back</NuxtLink>
        </p>
    </BasePage>


</template>