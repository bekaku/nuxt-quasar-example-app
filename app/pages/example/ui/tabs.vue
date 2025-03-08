<script setup lang="ts">
import { biChatDots } from '@quasar/extras/bootstrap-icons';
import { TabTest } from '~/libs/appTabs';
import type { LabelValue } from '~/types/common';

useHead({
    title: 'Tabs'
})
const tabModel = ref<string>('home')
const groupTabs = ref<LabelValue<string>[]>([
    {
        label: 'Home',
        value: 'home',
    },
    {
        label: 'About',
        value: 'about',
    },
    {
        label: 'Review',
        value: 'review',
        icon: biChatDots,
    },
    {
        label: 'Photos',
        value: 'photos',
    },
    {
        label: 'Videos',
        value: 'videos',
    }
])
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
                        <BaseTabs v-model="tabModel" :items="groupTabs" align="left" use-tab-panels active-color="deep-orange" class="q-ml-xs">
                            <template #app-tab="{ item }">
                                <q-badge v-if="item.value == 'review'" color="deep-orange" floating>99 </q-badge>
                            </template>
                            <template #home>
                                <div class="text-h6">Home</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </template>
                            <template #about>
                                <div class="text-h6">About</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </template>
                            <template #review>
                                <div class="text-h6">Review</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </template>
                            <template #photos>
                                <div class="text-h6">Photos</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </template>
                            <template #videos>
                                <div class="text-h6">Videos</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </template>
                        </BaseTabs>
                    </div>
                    <div class="col-12 col-md-4">
                        <BaseTabs v-model="tabModel" :items="groupTabs" align="left" text-color="pink"  />
                    </div>
                    <div class="col-12 col-md-4">
                        <BaseTabs v-model="tabModel" :items="groupTabs" align="left" text-color="white"
                            bg-color="primary" />
                    </div>
                </div>
            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped></style>