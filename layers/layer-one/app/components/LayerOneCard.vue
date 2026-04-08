<script setup lang="ts">
const { t } = useI18n()
const { appLoading } = useBase()
const onDownload = () => {
  appLoading(true)
  setTimeout(() => {
    appLoading(false)
  }, 2000)
}
</script>
<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-primary">Layer OneTheme Card</div>

      <div class="bg-primary text-white q-ma-sm">
        {{ t('app.name') }}
      </div>

      <div class="q-gutter-md">
        <BaseButton label="Base Button" />
        <BaseButton label="Click Me This is Default Color" @click="onDownload" />
        <BaseButton label="Go to Layer One page" color="red" to="/layer-01" />
        <BaseButton label="Go to test" color="blue" to="/test" />
      </div>
    </q-card-section>
  </q-card>
</template>
