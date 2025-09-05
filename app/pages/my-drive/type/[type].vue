<script setup lang="ts">
import { FileManagermission } from '~/libs/permissions'

definePageMeta({
  layout: 'drive',
  pageName: 'drive.title',
  requiresPermission: [FileManagermission.manage]
})
useInitPage()
const { t } = useLang()
</script>
<template>
  <BasePage :full="false">
    <BaseCard :bordered="false" flat title="My Drive">
      <q-card-section> Starter page </q-card-section>
    </BaseCard>
  </BasePage>
</template>
