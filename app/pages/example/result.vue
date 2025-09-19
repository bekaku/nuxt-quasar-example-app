<script setup lang="ts">
const { t } = useLang()
useHead({
  title: 'Page result'
})
</script>
<template>
  <BasePage :full="false">
    <BaseCard title="Alert">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-6 q-pa-md">
            <div class="q-gutter-md">
              <BaseAlert
                type="is-primary"
                :icon="{ name: 'lucide:ambulance', iconSet: 'nuxt' }"
                message="This is primary!!"
              />
              <BaseAlert
                type="is-warning"
                :icon="{ name: 'lucide:ev-charger' }"
                message="This is warning!!"
                :radius="false"
                :closeable="false"
              />
              <BaseAlert
                type="is-danger"
                :icon="{ name: 'lucide:image' }"
                icon-set="bootstrap-icons"
                message="This is danger!!"
              />
              <BaseAlert
                type="is-info"
                :icon="{ name: 'lucide:citrus'}"
                message="This is info!!"
              />
              <BaseAlert
                type="is-light"
                :icon="{ name: 'lucide:codesandbox' }"
                message="This is light!!"
              />
              <BaseAlert
                type="is-link"
                :icon="{ name: 'lucide:drum' }"
                message="This is link!!"
              />
              <BaseAlert
                type="is-success"
                :icon="{ name: 'lucide:dog' }"
                message="This is success!!"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <div class="q-gutter-md">
              <BaseAlert
                type="is-primary"
                :icon="{ name: 'lucide:drill' }"
                message="This is primary!!"
                secondary
              />
              <BaseAlert
                type="is-warning"
                :icon="{ name: 'lucide:flower-2' }"
                message="This is warning!!"
                :radius="false"
                :closeable="false"
                secondary
              />
              <BaseAlert
                type="is-danger"
                :icon="{ name: 'lucide:image' }"
                icon-set="bootstrap-icons"
                message="This is danger!!"
                secondary
              />
              <BaseAlert
                type="is-info"
                :icon="{ name: 'lucide:armchair' }"
                message="This is info!!"
                secondary
              />
              <BaseAlert
                type="is-link"
                :icon="{ name: 'lucide:cctv' }"
                message="This is link!!"
                secondary
              />
              <BaseAlert
                type="is-success"
                :icon="{ name: 'lucide:car-taxi-front' }"
                message="This is success!!"
                secondary
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Result">
      <q-card-section class="q-gutter-y-lg">
        <base-result
          :description="t('error.dataNotfound')"
          status="empty"
          :icon="{ name: 'lucide:inbox', iconSet: 'nuxt' }"
        />
        <base-result title="403" description="Forbidden" status="403" />
        <base-result title="404" description="Not found" status="404" />
        <base-result description="Error" status="error" />
        <base-result
          description="Info"
          :icon="{ name: 'lucide:backpack', iconSet: 'nuxt' }"
          status="info"
        />
        <base-result description="Success" status="success" />
        <BaseResult description="Warning" status="warning" />
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
