<script setup lang="ts">
import { biArrowLeft } from '@quasar/extras/bootstrap-icons'

const { t, locale, onSetLocale } = useLang()
useSeoMeta({
  title: 'Test Page'
})
definePageMeta({
  layout: 'empty'
})
const { getFavoriteMenuItems } = useMenu()
</script>
<template>
  <BasePage>
    <BaseCard title="Test Page" subtitle="This is a test page">
      <template #start>
        <BaseButton :icon="biArrowLeft" round flat to="/" />
      </template>
      <q-card-section>
        <template v-if="getFavoriteMenuItems.length > 0">
          <BaseMenuItems :items="getFavoriteMenuItems"></BaseMenuItems>
        </template>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
