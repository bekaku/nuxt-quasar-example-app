<script setup lang="ts">
import type { NuxtError } from '#app'
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';

const props = defineProps({
    error: Object as () => NuxtError
})
const { t } = useLang();
const { isDevMode } = useDevice();
const message = computed(() => String(props.error?.message || ''))
const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'))
const getStatusCode = computed(() => {
    const code = props.error?.statusCode;
    if (!code) {
        return 'error'
    }
    if (code == 404) {
        return '404'
    } else if (code == 403) {
        return '403'
    } else if (code == 500) {
        return '500'
    } else if (code == 418) {
        return '418'
    }
})
const getStatusText = computed(() => {
    const code = props.error?.statusCode;
    if (!code) {
        return 'An error occurred'
    }
    if (code == 404) {
        return t('http.404')
    } else if (code == 403) {
        return t('http.403')
    } else if (code == 500) {
        return t('http.500')
    } else if (code == 418) {
        return t('http.418')
    }
})
function handleError() {
    return clearError({ redirect: '/' })
}
</script>

<template>
    <div>
        <base-result
:status="getStatusCode" :title="getStatusText"
            description="Looks like you've followed a broken link or entered a URL that doesn't exist on this site.">
            <template #extra>
                <!-- <div class="text-h5" v-if="error">{{ error.statusCode }}</div> -->
                <pre v-if="isDevMode()">{{ error }}</pre>
                <q-btn flat :icon="biArrowLeft" :label="t('base.back')" @click="handleError" />
            </template>
        </base-result>
    </div>
</template>