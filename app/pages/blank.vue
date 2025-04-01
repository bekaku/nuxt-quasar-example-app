<script setup lang="ts">
import { ExampleHomeBreadcrumb } from '~/libs/breadcrumbs'
import { TabTest } from '~/libs/tabs'

definePageMeta({
  pageName: 'model_permission',
  //   requiresPermission: ['role_manage', 'rome_list'],
  breadcrumbs: ExampleHomeBreadcrumb,
  tabs: TabTest
})
useInitPage()
</script>
<template>
  <BasePage>
    <BaseCard title="Blank page">
      <q-card-section> Starter page </q-card-section>
    </BaseCard>
  </BasePage>
</template>
