<script setup lang="ts">
import { biMusicNote } from '@quasar/extras/bootstrap-icons'
import {
  dashBaordRecentSalseItems,
  dashBaordStatisticItems,
  dashboardChartData,
  dashboardHeroItems,
  dashboardSparkLineItems
} from '~/libs/data'
definePageMeta({
  // middleware: ["auth"]
  pageName: 'base.home' //custom meta
  // requiresPermission: ['role_manage'],//custom meta
})
useInitPage()
const { isSmallScreen, isServer } = useAppDevice()
const { getPageMeta, getPageMetaByKey } = useBase()
const { isDark } = useTheme()
if (!isServer()) {
  console.log('getPageMeta', getPageMeta())
  console.log(
    'getPageMetaByKey',
    'pageName: ',
    getPageMetaByKey('pageName'),
    ', requiresPermission: ',
    getPageMetaByKey('requiresPermission')
  )
}
const dateRangeStart = ref<string>('2025-04-13')
const dateRangeEnd = ref<string>('2025-04-15')
const toggleModel = ref<string>('overview')

const showChart = ref<boolean>(false)
onMounted(() => {
  setTimeout(() => {
    showChart.value = true
  }, 1000)
})
</script>
<template>
  <BasePage scroll-event show-to-top>
    <BaseCard
      title="Dashboard"
      :bordered="false"
      flat
      subtitle="Top picks for you. Updated daily."
      :icon="{ name: biMusicNote }"
    >
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-8" :class="{ 'q-pr-md': !isSmallScreen }">
            <BaseTabs
              v-model="toggleModel"
              :full-width="isSmallScreen"
              :items="[
                { label: 'Overview', value: 'overview' },
                { label: 'Analytics', value: 'analytics' },
                { label: 'Reports', value: 'reports' }
              ]"
              align="left"
            />
          </div>
          <div class="col-12 col-md-4" :class="{ 'q-pt-md': isSmallScreen }">
            <BaseDatePicker
              v-model:start="dateRangeStart"
              v-model:end="dateRangeEnd"
              :clearable="false"
              show-format-date
              label="Range"
              range
            >
              <template #after>
                <BaseButton label="Download" dark />
              </template>
            </BaseDatePicker>
          </div>
        </div>
      </q-card-section>

      <div class="row">
        <div
          v-for="(item, index) in dashboardHeroItems"
          :key="index"
          class="col-12 col-md-4 q-px-md"
        >
          <BaseCard class="card-shade" hover>
            <q-card-section>
              <BaseTextHeader :icon="item.icon" :title="item.label">
                <template #end>
                  <q-item-section side>
                    <BaseLink :to="item.to || ''" color="primary"> Explore </BaseLink>
                  </q-item-section>
                </template>
              </BaseTextHeader>
              {{ item.description }}
            </q-card-section>
          </BaseCard>
        </div>
      </div>

      <div class="row" :class="{ 'q-mb-md': isSmallScreen }">
        <div
          v-for="(item, index) in dashBaordStatisticItems"
          :key="index"
          class="col-12 col-md-3"
          :class="{ 'q-pa-md': !isSmallScreen, 'q-px-md q-py-sm': isSmallScreen }"
        >
          <BaseCard :flat="false" :margin="false">
            <q-item>
              <q-item-section>
                <q-item-label class="text-subtitle1"> {{ item.label }} </q-item-label>
                <q-item-label class="text-h5 text-weight-bold"> {{ item.value }} </q-item-label>
                <q-item-label caption class="text-caption">
                  {{ item.description }}
                </q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-icon :name="item.icon?.name" size="18px" />
              </q-item-section>
            </q-item>
          </BaseCard>
        </div>
      </div>
      <div class="q-px-md">
        <BaseCard>
          <div class="row">
            <div
              v-for="(item, index) in dashboardSparkLineItems"
              :key="index"
              class="col-12 col-md-3"
              :style="{
                borderRight:
                  !isSmallScreen && index < dashboardSparkLineItems.length - 1
                    ? `1px solid ${!isDark ? 'var(--color-zinc-200)' : 'var(--color-zinc-700)'}`
                    : 'none'
              }"
            >
              <q-item>
                <q-item-section>
                  <q-item-label> {{ item.label }} </q-item-label>
                  <q-item-label>
                    {{ item.description }}
                    <q-badge :color="item.bg" :style="{ color: item.color }">{{
                      item.value
                    }}</q-badge>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <ClientOnly>
                    <ChartSparklines
                      style="width: 155px"
                      height="75"
                      :chart-id="`sparkline-area-${index}`"
                      :stroke-width="1"
                      strokestyle="smooth"
                      :colors="[item.color]"
                      :series="item.series"
                      :categories="item.categories"
                      :dark="isDark"
                    />
                  </ClientOnly>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </BaseCard>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 q-px-md">
          <BaseCard title="Overview" :flat="false">
            <q-card-section>
              <SkeletonCard height="365px" v-if="!showChart" />
              <Transition v-if="showChart">
                <div>
                  <ChartArea
                    class="q-my-sm"
                    chart-id="chart-bar"
                    height="350"
                    type="bar"
                    :colors="['#64748B', '#94A3B8', '#CBD5E1']"
                    :series="dashboardChartData.series.slice(3, 6)"
                    :categories="dashboardChartData.categories"
                    strokestyle="smooth"
                    :label-rotate="!isSmallScreen ? 0 : -45"
                    :xaxis-tickamount="4"
                    :dark="isDark"
                  />
                </div>
              </Transition>
            </q-card-section>
          </BaseCard>
        </div>
        <div class="col-12 col-md-4 q-px-md">
          <BaseCard
            title="Recent Sales"
            subtitle="You made 265 sales this month."
            :flat="false"
            style="min-height: 480px"
          >
            <q-list>
              <q-item v-for="(item, index) in dashBaordRecentSalseItems" :key="index">
                <q-item-section avatar>
                  <BaseAvatar
                    :src="item.avatar?.src || '/images/no_picture_thumb.jpg'"
                    size="40px"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label> {{ item.label }} </q-item-label>
                  <q-item-label caption>
                    {{ item.description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side top class="text-subtitle1 q-text-black text-weight-bold">
                  {{ item.value }}
                </q-item-section>
              </q-item>
            </q-list>
          </BaseCard>
        </div>
      </div>
    </BaseCard>
  </BasePage>
</template>
<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.card-shade {
  background: var(--color-zinc-50); /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    var(--color-zinc-50),
    #fff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    var(--color-zinc-50),
    #fff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &:hover {
    transform: translateY(-5px);
  }
}
body.body--dark {
  .card-shade {
    background: var(--color-zinc-800); /* fallback for old browsers */
  }
}
</style>
