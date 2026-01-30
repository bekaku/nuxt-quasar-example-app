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
      <div class="text-h6">Layer OneTheme Card</div>
      {{ t('app.name') }}

      <div class="q-gutter-md">
        <BaseButton label="Base Button" />
        <LayerOneButton label="Click Me This is Default Color" @click="onDownload" />
        <LayerOneButton label="Go to Layer One page" color="red" to="/layer-01" />
      </div>
    </q-card-section>
  </q-card>
</template>
