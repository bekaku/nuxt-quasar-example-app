<script setup lang="ts">
import { biMusicNote, biPlusCircle, biSearch } from '@quasar/extras/bootstrap-icons'
import { ref } from 'vue'
const progress = ref(false)
useHead({
  title: 'Card'
})
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>
<template>
  <BasePage :full="false">
    <div class="row">
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Simple">
          <template #end>
            <div class="row q-gutter-sm">
              <BaseButton :icon="biSearch" round flat />
              <BaseButton :icon="biPlusCircle" round flat />
            </div>
          </template>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Hover" subtitle="This is subtitle" :icon="{ name: biMusicNote }" hover>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Flat" flat>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Borderless" flat :bordered="false">
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Actions">
          <q-card-section>
            {{ lorem }}
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard>
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            {{ lorem }}
          </q-card-section>
          <q-separator />
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
