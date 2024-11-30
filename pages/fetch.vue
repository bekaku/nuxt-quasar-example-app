<script setup lang="ts">

import { type ApiResponse } from '~/types/common'

const { $axios } = useNuxtApp();
const { callAxios } = useAxios();
useSeoMeta({
    title: 'Fecth data'
})
//https://nuxt.com/docs/getting-started/data-fetching
const { data, refresh, clear, status, error } = await useAsyncData('gd5:test', async () => {
    const response = await callAxios<any>({
        API: '/test',
        method: 'GET',
    });
    return response;
})

console.log('useAsyncData', data.value, 'error', error.value);


const fetchData = async () => {
    try {
        const response = await $axios.get('/test')
        console.log('fetchData response', response);
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
const fetchDataViaComposible = async () => {
    try {
        const response = await callAxios<any>({
            API: '/test',
            method: 'GET',
        });
        console.log('fetchDataViaComposible response', response);
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const getDataNowFromServer = async () => {
    const now = await $fetch('/api/now');// call api in internal server path /src/server/api/now.ts
    console.log('getDataNowFromServer', now);
}
const getApiFromServer = async () => {
    const res = await $fetch('/api/hello/nuxt');// call api in internal server path /src/server/api/now.ts
    console.log('getApiFromServer', res);
}
</script>
<template>
    <q-page padding>


        <p>
            <button @click="fetchData">Fetch data</button>
            <button @click="fetchDataViaComposible">Fetch Data Via Composible</button>
        </p>
        <p>
            {{ data }}
            <br />
            <button @click="() => refresh()">Refresh data</button>
            <button @click="() => clear()">clear data</button>
        </p>
        <p>
            <button @click="() => getDataNowFromServer()">Date now from api</button>
        </p>
        <p>
            <button @click="() => getApiFromServer()">getApiFromServer api</button>
        </p>
        <p>
            <NuxtLink to="/">Back</NuxtLink>
        </p>
    </q-page>
</template>