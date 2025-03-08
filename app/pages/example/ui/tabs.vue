<script setup lang="ts">
import { biChatDots, biMic, biMusicNote, biPlay } from '@quasar/extras/bootstrap-icons'
import { TabTest } from '~/libs/appTabs'
import type { LabelValue } from '~/types/common'

useHead({
  title: 'Tabs'
})
const tabModel = ref<string>('home')
const groupTabs = ref<LabelValue<string>[]>([
  {
    label: 'Home',
    value: 'home'
  },
  {
    label: 'About',
    value: 'about'
  },
  {
    label: 'Review',
    value: 'review',
    icon: biChatDots
  },
  {
    label: 'Photos',
    value: 'photos'
  },
  {
    label: 'Videos',
    value: 'videos'
  }
])
const toggleModel = ref<string>('music')
const toggleOptions: LabelValue<string>[] = [
  { label: 'Music', value: 'music', icon: biMusicNote },
  { label: 'Podcasts', value: 'podcasts', icon: biMic },
  { label: 'Live', value: 'live', icon: biPlay }
]
</script>
<template>
  <BasePage>
    <BaseCard flat :bordered="false" title="Tabs route">
      <q-card-section>
        <BaseTabsRoute :items="TabTest" />
      </q-card-section>
    </BaseCard>
    <BaseCard flat :bordered="false" :title="`Tab '${tabModel}'`">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-4">
            <BaseTabs
              v-model="tabModel"
              :items="groupTabs"
              align="left"
              use-tab-panels
              active-color="deep-orange"
              class="q-ml-xs"
            >
              <template #app-tab="{ item }">
                <q-badge v-if="item.value == 'review'" color="deep-orange" floating>99 </q-badge>
              </template>
              <template #home>
                <BaseCard title="Home">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #about>
                <!-- <div class="text-h6">About</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. -->
                <BaseCard title="About">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #review>
                <!-- <div class="text-h6">Review</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. -->
                <BaseCard title="Review">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #photos>
                <BaseCard title="Photos">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #videos>
                <BaseCard title="Videos">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
            </BaseTabs>
          </div>
          <div class="col-12 col-md-4">
            <BaseTabs v-model="tabModel" :items="groupTabs" align="left" text-color="pink" />
          </div>
          <div class="col-12 col-md-4">
            <BaseTabs
              v-model="tabModel"
              :items="groupTabs"
              align="left"
              text-color="white"
              bg-color="primary"
            />
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseCard flat :bordered="false" :title="`Button toggle '${toggleModel}'`">
      <div class="q-pa-md">
        <BaseButtonToggle v-model="toggleModel" :options="toggleOptions" />
      </div>
    </BaseCard>
  </BasePage>
</template>
<style lang="scss" scoped></style>
