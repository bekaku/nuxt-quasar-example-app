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
    <BaseTextHeader class="q-py-md" :title="t('drive.title')" />
    <div class="row">
      <div class="col-12 q-pa-sm">
        <BaseCard title="All Media">
          <q-card-section> Starter page </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-8 q-pa-sm">
        <BaseCard :title="t('drive.folder')">
          <template #end>
            <BaseButton flat to="/my-drive/folder/0">
              <BaseIcon name="lucide:move-right" icon-set="nuxt" />
              <span class="q-ml-sm">{{ t('base.viewAll') }}</span>
            </BaseButton>
          </template>
          <q-card-section> Starter page </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Storage Details">
          <q-card-section> Starter page </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 q-pa-sm">
        <BaseCard :title="t('drive.recent')">
          <template #end>
            <BaseButton flat to="/my-drive/folder/0">
              <BaseIcon name="lucide:move-right" icon-set="nuxt" />
              <span class="q-ml-sm">{{ t('base.viewAll') }}</span>
            </BaseButton>
          </template>
          <q-card-section> Starter page </q-card-section>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
