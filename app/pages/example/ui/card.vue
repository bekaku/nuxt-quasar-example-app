<script setup lang="ts">
import {
  biMusicNote,
  biPlusCircle,
  biSearch
} from '@quasar/extras/bootstrap-icons'
import { ref } from 'vue'
const progress = ref(false)
useHead({
  title: 'Card'
})
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
</script>
<template>
  <BasePage :full="false">
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

    <BaseCard title="Hover" sub-title="This is subtitle" :icon="{name:biMusicNote}" hover>
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </BaseCard>

    <BaseCard title="Flat" flat>
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </BaseCard>

    <BaseCard title="Borderless" flat :bordered="false">
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
