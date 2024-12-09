<script setup lang="ts">

import { type ApiResponse, type IApiListResponse, type OgMeta } from '~/types/common'
import type { Permission } from '~/types/models';

const { $axios } = useNuxtApp();
const { callAxios } = useAxios();
useSeoMeta({
    title: 'Fecth data'
})
const ogLoading = ref(false);
const ogItem = ref<OgMeta>();

const reponseApiItem = ref<IApiListResponse<Permission> | null>(null);
const reaponseApiLoading = ref<boolean>(false);

const reponseListItems = ref<Permission[] | null>(null);
const reponseListLoading = ref<boolean>(false);

const reponseObject = ref<Permission | null>(null);
const reponseObjectLoading = ref<boolean>(false);

const responseError = ref<any>();
const responseErrorLoading = ref<boolean>(false);
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

const fetchResponseApi = async () => {

    reaponseApiLoading.value = true;
    reponseApiItem.value = await callAxios<IApiListResponse<Permission>>({
        API: '/api/permission?page=0&size=10&sort=code,asc',
        method: 'GET',
    });
    reaponseApiLoading.value = false;
}
const fetchResponseList = async () => {
    reponseListLoading.value = true;
    reponseListItems.value = await callAxios<Permission[]>({
        API: '/api/permission/findAllBackendPermission',
        method: 'GET',
    });
    reponseListLoading.value = false;
}
const fetchResponseObject = async () => {
    reponseObjectLoading.value = true;
    reponseObject.value = await callAxios<Permission>({
        API: '/api/permission/1',
        method: 'GET',
    });
    reponseObjectLoading.value = false;
}
const fetchError = async () => {
    /* alternative
    try {
        await callAxios<Permission[]>({
            API: '/api/permission/notfound_url',
            method: 'GET',
        });
    } catch (error) {
        responseError.value = JSON.stringify(error);
        console.warn('use-axios > fetchError', error)
    }
    */

    responseErrorLoading.value = true;
    callAxios<Permission[]>({
        API: '/api/permission/notfound_url',
        method: 'GET',
    }).then((response) => {
        console.log('use-axios > fetch OK', response);
    }).catch((error) => {
        responseError.value = JSON.stringify(error);
        console.warn('use-axios > fetchError > catch', error)
    }).finally(() => {
        console.log('use-axios > fetchError > finally');
        responseErrorLoading.value = false;
    });
}
const getDataNowFromServer = async () => {
    const now = await $fetch('/api/now');// call api in internal server path /src/server/api/now.ts
    console.log('getDataNowFromServer', now);
}
const getApiFromServer = async () => {
    const res = await $fetch('/api/hello/nuxt');// call api in internal server path /src/server/api/now.ts
    console.log('getApiFromServer', res);
}

const getOpengraph = async () => {
    ogLoading.value = true;
    const res = await $fetch<OgMeta>(`/api/meta?url=${encodeURIComponent('https://www.youtube.com/watch?v=dRGgYvF0IsY')}`);
    if (res) {
        ogItem.value = res;
    }
    ogLoading.value = false;
    console.log('getOpengraph', res);
}
</script>
<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Fetch data </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-md">
                <div class="text-h5">
                    AsyncData
                </div>
                <div style="max-height: 250px; overflow: auto" class="bg-black text-light-green-13">
                    <pre>{{ data }}</pre>
                </div>
                <QuasarButton @click="() => refresh()">Refresh data</QuasarButton>
                <QuasarButton @click="() => clear()">clear data</QuasarButton>
                <q-separator />
                <div class="text-h5">
                    Axios
                </div>
                <QuasarButton @click="fetchData">Fetch data via $axios</QuasarButton>
                <QuasarButton @click="fetchDataViaComposible">Fetch Data Via Composible</QuasarButton>
                <div class="row">
                    <div class="col-12 col-md-6 q-pa-md">
                        <q-card>
                            <q-card-section class="q-gutter-y-md">
                                <QuasarButton outline label="Fetch response API" @click="fetchResponseApi" />
                                <SkeletonItem v-if="reaponseApiLoading" show-header :items="5" />
                                <div v-else style="max-height: 250px; overflow: auto"
                                    class="bg-black text-light-green-13">
                                    <pre>{{ reponseApiItem }}</pre>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <q-card>
                            <q-card-section class="q-gutter-y-md">
                                <QuasarButton outline label="Fetch response LIST" @click="fetchResponseList" />
                                <SkeletonItem v-if="reponseListLoading" show-header :items="5" />
                                <div v-else style="max-height: 250px; overflow: auto"
                                    class="bg-black text-light-green-13">
                                    <pre>
                                {{ reponseListItems }}
                            </pre>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <q-card>
                            <q-card-section class="q-gutter-y-md">
                                <QuasarButton outline label="Fetch response Object" @click="fetchResponseObject" />
                                <SkeletonItem v-if="reponseObjectLoading" show-header :items="5" />
                                <div v-else style="max-height: 250px; overflow: auto"
                                    class="bg-black text-light-green-13">
                                    <pre>
                                {{ reponseObject }}
                            </pre>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <q-card>
                            <q-card-section class="q-gutter-y-md">
                                <QuasarButton color="negative" outline label="Fetch ERROR handling" @click="fetchError" />

                                <SkeletonItem v-if="responseErrorLoading" show-header :items="5" />
                                <div v-else style="overflow: auto" class="bg-black text-red">
                                    <pre>
                                        {{ JSON.stringify(responseError) }}
                                    </pre>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
                <q-separator />
                <div class="text-h5">
                    Internal Server API
                </div>
                <QuasarButton @click="() => getDataNowFromServer()">Date now from api</QuasarButton>
                <QuasarButton @click="() => getApiFromServer()">getApiFromServer api</QuasarButton>
                <div class="text-h5">
                    Retrieve og: and other meta attributes from a resource
                </div>
                <QuasarButton @click="getOpengraph" outline :loading="ogLoading" label="Fetch Opengraph detail" />
                <LazyBaseOpenGraphItem style="width: 750px;" v-if="ogItem" :item="ogItem"></LazyBaseOpenGraphItem>
            </q-card-section>
        </q-card>
    </q-page>
</template>