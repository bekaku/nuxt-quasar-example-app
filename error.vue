<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})
const {isDevMode}=useDevice();
const message = computed(() => String(props.error?.message || ''))
const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'))
function handleError() {
  return clearError({ redirect: '/' })
}
</script>

<template>
    <div>
        <!-- <h1 v-if="error">{{ error.statusCode }}</h1> -->
        <!-- <NuxtLink to="/">Go back home</NuxtLink> -->
        <div flex="~ col" h-screen text-center items-center justify-center gap4>
            <div text-3xl>
                {{ is404 ? 'This page could not be found' : 'An error occurred' }}
            </div>
            <div text-xl op50>
                Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
            </div>
            <pre v-if="isDevMode()">{{ error }}</pre>
            <q-btn @click="handleError">
                Go Back
            </q-btn>
        </div>
    </div>
</template>