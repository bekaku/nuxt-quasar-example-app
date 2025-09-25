<script setup lang="ts">
import type { NuxtError } from '#app'
import BaseButton from './components/base/BaseButton.vue'

const props = defineProps({
  error: Object as () => NuxtError
})
const { t } = useLang()
const { isDevMode } = useConfiguration()
const { onPageBack } = useBase()
const { isDark } = useTheme()
// const message = computed(() => String(props.error?.message || ''))
// const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'))
const getStatusCode = computed(() => {
  const code = props.error?.statusCode
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
  return '500'
})
const getStatusText = computed(() => {
  const code = props.error?.statusCode
  if (!code) {
    return 'An error occurred'
  }
  if (code == 404) {
    return t('http.404')
  } else if (code == 400) {
    return t('http.400')
  } else if (code == 403) {
    return t('http.403')
  } else if (code == 500) {
    return t('http.500')
  } else if (code == 418) {
    return t('http.418')
  }
  return ''
})
function handleError() {
  clearError()
  // return clearError({ redirect: '/' })
  onPageBack()
}
</script>

<template>
  <div>
    <base-result
      :status="getStatusCode"
      :title="getStatusText"
      :description="
        error?.message ||
        'Looks like you\'ve followed a broken link or entered a URL that doesn\'t exist on this site.'
      "
    >
      <template #extra>
        <BaseCard v-if="isDevMode()">
          <q-card-section>
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
            <!-- {{ error }} -->
            <div class="text-h6 q-mt-md q-ml-md">Stack</div>
            <div
              class="q-ml-md q-pa-md"
              :class="{ 'bg-grey-2': !isDark }"
              style="max-height: 350px; max-width: 80vw; overflow: auto"
            >
              <div v-if="error?.stack" v-html="error?.stack" />
            </div>
          </q-card-section>
        </BaseCard>
        <div class="text-center q-my-lg">
          <BaseButton outline :icon="{name:'lucide:arrow-right'}" :label="t('base.back')" @click="handleError" />
          <BaseButton outline :icon="{name:'lucide:house'}" :label="t('base.home')" to="/" class="q-ml-md" />
        </div>
        <!-- <div v-if="error" class="text-h5">{{ error.statusCode }}</div> -->
      </template>
    </base-result>
  </div>
</template>
