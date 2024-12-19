<script setup lang="ts">
import type { NuxtError } from '#app'
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';
import QuasarButton from './components/quasar/QuasarButton.vue';

const props = defineProps({
    error: Object as () => NuxtError
})
const { t } = useLang();
const { isDevMode } = useDevice();
// const message = computed(() => String(props.error?.message || ''))
// const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'))
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
    return '500';
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
    return '';
})
function handleError() {
    return clearError({ redirect: '/' })
}
</script>

<template>
    <div>
        <base-result :status="getStatusCode" :title="getStatusText"
            description="Looks like you've followed a broken link or entered a URL that doesn't exist on this site.">
            <template #extra>
                <q-card flat bordered class="bg-black text-red">
                    <q-card-section v-if="isDevMode()">
                        <!-- {{ error }} -->
                        <q-item v-if="error?.statusCode">
                            <q-item-section>
                                <q-item-label caption>Status code</q-item-label>
                                <q-item-label>{{ error?.statusCode }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item v-if="error?.url">
                            <q-item-section>
                                <q-item-label caption>Url</q-item-label>
                                <q-item-label>{{ error?.url }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item v-if="error?.message">
                            <q-item-section>
                                <q-item-label caption>Message</q-item-label>
                                <q-item-label>{{ error?.message }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <div class="text-h6 q-mt-md">
                            Stack
                        </div>
                        <div style="max-height: 350px; overflow: auto;">
                            <div v-if="error?.stack" v-html="error?.stack" />
                        </div>
                    </q-card-section>


                </q-card>
                <div class="text-center q-my-lg">
                    <QuasarButton outline :icon="biArrowLeft" :label="t('base.back')" @click="handleError" />
                </div>
                <!-- <div v-if="error" class="text-h5">{{ error.statusCode }}</div> -->
            </template>
        </base-result>
    </div>
</template>