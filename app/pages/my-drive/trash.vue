<script setup lang="ts">
import { FileManagermission } from '~/libs/permissions'

definePageMeta({
  layout: 'drive',
  pageName: 'drive.detleted',
  requiresPermission: [FileManagermission.manage]
})
useInitPage()
const { t } = useLang()
</script>
<template>
  <BasePage :full="false">
    <BaseCard
      :bordered="false"
      :icon="{ name: 'lucide:trash-2', iconSet: 'nuxt' }"
      flat
      :title="t('drive.detleted')"
    >
      <q-card-section> Starter page </q-card-section>
    </BaseCard>
  </BasePage>
</template>
