<script setup lang="ts">
import { useLang } from '~/composables/useLang';
const { t, locale, onSetLocale } = useLang();
useSeoMeta({
    title: 'I18n'
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