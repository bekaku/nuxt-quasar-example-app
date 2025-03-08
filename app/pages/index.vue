<script setup lang="ts">
import { biCreditCard, biCurrencyDollar, biGraphUp, biPeople } from '@quasar/extras/bootstrap-icons'
import type { ISeriresCategories } from '~/types/chart'
import type { LabelValue } from '~/types/common'

definePageMeta({
  // middleware: ["auth"]
  pageName: 'base.home' //custom meta
  // requiresPermission: ['role_manage'],//custom meta
})
useInitPage()
const { getPageMeta, getPageMetaByKey } = useBase()
if (!import.meta.server) {
  console.log('getPageMeta', getPageMeta())
  console.log(
    'getPageMetaByKey',
    'pageName: ',
    getPageMetaByKey('pageName'),
    ', requiresPermission: ',
    getPageMetaByKey('requiresPermission')
  )
}
const dateRangeStart = ref<string>('2025-01-01')
const dateRangeEnd = ref<string>('2025-02-15')
const toggleModel = ref<string>('overview')

const statisticItems = ref<LabelValue<string>[]>([
  {
    label: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    icon: biCurrencyDollar
  },
  {
    label: 'Subscriptions',
    value: '+2350',
    description: '+180.1% from last month',
    icon: biPeople
  },
  {
    label: 'Sales',
    value: '+12,234',
    description: '+19% from last month',
    icon: biCreditCard
  },
  {
    label: 'Active Now',
    value: '+573',
    description: '+201 since last hour',
    icon: biGraphUp
  }
])
const recentSalseItems = ref<LabelValue<string>[]>([
  {
    label: 'Olivia Martin',
    value: '+$1,999.00',
    description: 'olivia.martin@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png'
  },
  {
    label: 'Jackson Lee',
    value: '+$39.00',
    description: 'jackson.lee@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar3.png'
  },
  {
    label: 'Isabella Nguyen',
    value: '+$299.00',
    description: 'isabella.nguyen@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar4.png'
  },
  {
    label: 'William Kim',
    value: '+$99.00',
    description: 'will@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png'
  },
  {
    label: 'Sofia Davis',
    value: '+$39.00',
    description: 'sofia.davis@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png'
  }
])
const chartData: ISeriresCategories = {
  categories: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  series: [
    {
      name: 'Access',
      data: [32, 26, 57, 21, 8, 6, 14, 39, 10, 7, 9, 25]
    },
    {
      name: 'Post',
      data: [10, 8, 30, 21, 27, 10, 9, 40, 20, 10, 50, 12]
    },
    {
      name: 'Repost',
      data: [8, 10, 15, 21, 4, 15, 10, 50, 8, 0, 9, 25]
    },
    {
      name: 'Comment',
      data: [11, 20, 12, 14, 0, 10, 51, 22, 30, 10, 31, 11]
    },
    {
      name: 'Feel',
      data: [20, 10, 40, 16, 0, 5, 19, 1, 5, 0, 1, 4]
    },
    {
      name: 'Share',
      data: [1, 10, 11, 21, 17, 36, 51, 30, 15, 24, 56, 8]
    },
    {
      name: 'Read',
      data: [75, 38, 25, 70, 3, 2, 45, 35, 9, 6, 11, 24]
    },
    {
      name: 'Learn',
      data: [22, 0, 3, 2, 45, 11, 31, 20, 22, 10, 12, 21]
    },
    {
      name: 'Reward',
      data: [30, 1, 13, 1, 0, 0, 3, 0, 3, 0, 20, 15]
    }
  ]
}
</script>
<template>
  <BasePage scroll-event show-to-top>
    <BaseCard title="Dashboard">
      <template #toolbarEnd>
        <div class="row items-center">
          <BaseDatePicker
            v-model:start="dateRangeStart"
            v-model:end="dateRangeEnd"
            :clearable="false"
            show-format-date
            label="Range"
            range
          >
            <template #after>
              <BaseButton label="Download" light />
            </template>
          </BaseDatePicker>
        </div>
      </template>
      <q-card-section>
        <BaseButtonToggle
          v-model="toggleModel"
          :options="[
            { label: 'Overview', value: 'overview' },
            { label: 'Analytics', value: 'analytics' },
            { label: 'Reports', value: 'reports' },
            { label: 'Notifications', value: 'notifications' }
          ]"
        />

        <div class="row">
          <div v-for="(item, index) in statisticItems" :key="index" class="col-12 col-md-3 q-pa-md">
            <BaseCard :flat="false">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-subtitle1"> {{ item.label }} </q-item-label>
                  <q-item-label class="text-h5 text-weight-bold"> {{ item.value }} </q-item-label>
                  <q-item-label caption class="text-caption">
                    {{ item.description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-icon :name="item.icon" size="18px" />
                </q-item-section>
              </q-item>
            </BaseCard>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8 q-px-md">
            <BaseCard title="Overview" :flat="false">
              <q-card-section>
                <ChartArea
                  class="q-my-sm"
                  chart-id="chart-bar"
                  height="350"
                  type="bar"
                  :colors="['#64748B', '#94A3B8', '#CBD5E1']"
                  :series="chartData.series.slice(3, 6)"
                  :categories="chartData.categories"
                  strokestyle="smooth"
                  :label-rotate="-45"
                />
              </q-card-section>
            </BaseCard>
          </div>
          <div class="col-12 col-md-4 q-px-md">
            <BaseCard
              title="Recent Sales"
              sub-title="You made 265 sales this month."
              :flat="false"
              style="min-height: 480px"
            >
              <q-list>
                <q-item v-for="(item, index) in recentSalseItems" :key="index">
                  <q-item-section avatar>
                    <BaseAvatar :src="item.avatar || '/images/no_picture_thumb.jpg'" size="40px" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label> {{ item.label }} </q-item-label>
                    <q-item-label caption>
                      {{ item.description }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top class="text-h6 q-text-black text-weight-bold">
                    {{ item.value }}
                  </q-item-section>
                </q-item>
              </q-list>
            </BaseCard>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
