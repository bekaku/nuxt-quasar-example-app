<script setup lang="ts">
const { t, locale, onSetLocale } = useLang();
useSeoMeta({
    title: 'Test Page'
})

</script>
<template>
    <q-page padding>
        <p>
            {{ `locale :${locale}` }}
        </p>
        <p>
            {{ t('app.copyright', ['1.0.0']) }}
        </p>
        <p>
            <button @click="onSetLocale('th')">Th</button>
            <button @click="onSetLocale('en')">En</button>
        </p>

        <p>
            <NuxtLink to="/">Back</NuxtLink>
        </p>
    </q-page>
</template>