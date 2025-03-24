<script setup lang="ts">
import type { ISeriresCategories } from '~/types/chart'
import {
  appleStockPrices,
  chartData,
  chartData2,
  simpleCategories,
  simpleSeries
} from '~/libs/data'
useHead({
  title: 'Charts'
})
const { isDark } = useTheme()
const showChart = reactive({
  radial: false,
  sparkline: false,
  radar: false,
  area: false,
  line: false,
  bar: false,
  pine: false
})
onMounted(async () => {
  await setShowChart(1)
  await setShowChart(2)
  await setShowChart(3)
  await setShowChart(4)
  await setShowChart(5)
  await setShowChart(6)
  await setShowChart(7)
})
const setShowChart = (no: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      switch (no) {
        case 1:
          showChart.radial = !showChart.radial
          break
        case 2:
          showChart.sparkline = !showChart.sparkline
          break
        case 3:
          showChart.radar = !showChart.radar
          break
        case 4:
          showChart.area = !showChart.area
          break
        case 5:
          showChart.line = !showChart.line
          break
        case 6:
          showChart.bar = !showChart.bar
          break
        case 7:
          showChart.pine = !showChart.pine
      }
      resolve(true)
    }, 100)
  })
}
</script>
<template>
  <BasePage>
    <Transition v-if="showChart.radial">
      <BaseCard class="q-my-md" title="Radial">
        <q-card-section>
          <div class="row">
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartRadial
                chart-id="radial-1"
                :series="simpleSeries.slice(0, 3)"
                :categories="simpleCategories.slice(0, 3)"
                legend-position="right"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartRadial
                chart-id="radial-2"
                height="250"
                val-unit="%"
                :colors="['#8D6E63']"
                :series="simpleSeries.slice(0, 1)"
                :categories="simpleCategories.slice(0, 1)"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartRadial
                chart-id="radial-3"
                semi
                stoke-line-cap="square"
                :start-angle="-90"
                :end-angle="90"
                :colors="['#647C64']"
                :series="simpleSeries.slice(1, 2)"
                :categories="simpleCategories.slice(1, 2)"
                :show-legend="false"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartRadial
                chart-id="radial-4"
                val-unit="%"
                :colors="['#8E8CD8']"
                :start-angle="-180"
                :end-angle="360"
                :show-legend="false"
                :grid-padding="{
                  bottom: -100
                }"
                :series="simpleSeries.slice(2, 3)"
                :categories="simpleCategories.slice(2, 3)"
                :dark="isDark"
              />
            </div>
          </div>
        </q-card-section>
      </BaseCard>
    </Transition>

    <Transition v-if="showChart.sparkline">
      <BaseCard class="q-my-md" title="Sparklines">
        <q-card-section>
          <div class="row">
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartSparklines
                height="100"
                chart-id="sparkline-area"
                :stroke-width="1"
                strokestyle="smooth"
                :colors="['#9E9E9E']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartSparklines
                height="100"
                chart-id="sparkline-area-2"
                :stroke-width="1"
                strokestyle="straight"
                :colors="['#607D8B']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartSparklines
                height="100"
                chart-id="sparkline-line"
                type="line"
                :stroke-width="3"
                :colors="['#607D8B']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <ChartSparklines
                height="100"
                chart-id="sparkline-bar"
                type="bar"
                :stroke-width="1"
                :colors="['#8D6E63']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
                :dark="isDark"
              />
            </div>
          </div>
        </q-card-section>
      </BaseCard>
    </Transition>

    <Transition v-if="showChart.radar">
      <BaseCard class="q-my-md" title="Radar">
        <q-card-section>
          <div class="row">
            <div class="col-12 col-md-6">
              <ChartRadar
                chart-id="chart-radar"
                height="350"
                :markers="3"
                :colors="['#8D6E63', '#9E9E9E', '#607D8B']"
                :series="chartData2.series"
                :categories="chartData2.categories"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-6">
              <ChartRadar
                chart-id="chart-radar-2"
                height="350"
                :markers="0"
                show-data-labels
                :colors="['#4E342E']"
                :grid-colors="!isDark ? ['#f8f8f8', '#fff'] : ['#383a42', '#717886']"
                :series="chartData2.series.slice(0, 1)"
                :categories="chartData2.categories"
                :dark="isDark"
              />
            </div>
          </div>
        </q-card-section>
      </BaseCard>
    </Transition>

    <Transition v-if="showChart.area">
      <BaseCard title="Area">
        <div class="row">
          <div class="col-12 col-md-6 q-pa-sm">
            <ChartArea
              class="q-my-sm"
              chart-id="chart-area"
              height="350"
              palette="palette1"
              type="area"
              :stroke-width="2"
              :colors="['#8D6E63', '#9E9E9E', '#607D8B']"
              :series="chartData.series.slice(0, 3)"
              :categories="chartData.categories"
              strokestyle="smooth"
              :label-rotate="-45"
              show-toolbar
              zoom
              :dark="isDark"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <ChartArea
              class="q-my-sm"
              chart-id="chart-area-2"
              height="350"
              type="area"
              :stroke-width="2"
              :colors="['#8D6E63', '#9E9E9E', '#607D8B']"
              :series="chartData.series.slice(0, 3)"
              :categories="chartData.categories"
              strokestyle="straight"
              :xaxis-tickamount="3"
              :dark="isDark"
            />
          </div>
        </div>
      </BaseCard>
    </Transition>

    <Transition v-if="showChart.line">
      <BaseCard class="q-my-md" title="Line">
        <div class="row">
          <div class="col-12 col-md-6 q-pa-sm">
            <ChartArea
              class="q-my-sm"
              chart-id="chart-line"
              height="350"
              palette="palette1"
              type="line"
              :series="chartData.series.slice(6, 9)"
              :categories="chartData.categories"
              strokestyle="straight"
              :label-rotate="-45"
              :stroke-width="3"
              :dark="isDark"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <ChartArea
              class="q-my-sm"
              chart-id="chart-line-2"
              height="350"
              palette="palette8"
              type="line"
              :series="chartData.series.slice(6, 9)"
              :categories="chartData.categories"
              strokestyle="smooth"
              :xaxis-tickamount="3"
              :stroke-width="3"
              :dark="isDark"
            />
          </div>
        </div>
      </BaseCard>
    </Transition>

    <Transition v-if="showChart.bar">
      <BaseCard class="q-my-md" title="Bar">
        <ClientOnly>
          <ChartArea
            class="q-my-sm"
            chart-id="chart-bar"
            height="350"
            palette="palette3"
            type="bar"
            :colors="['#64748B', '#94A3B8', '#CBD5E1']"
            :series="chartData.series.slice(3, 6)"
            :categories="chartData.categories"
            strokestyle="smooth"
            :label-rotate="-45"
            :dark="isDark"
          />
          <div class="row">
            <div class="col-12 col-md-6">
              <ChartArea
                class="q-my-sm"
                chart-id="chart-bar-simple"
                height="350"
                palette="palette3"
                type="bar"
                :opacity="0.3"
                :series="chartData.series.slice(0, 1)"
                :categories="chartData.categories"
                strokestyle="smooth"
                :label-rotate="-90"
                :dark="isDark"
              />
            </div>
            <div class="col-12 col-md-6">
              <ChartArea
                class="q-my-sm"
                chart-id="chart-bar-horizontal"
                height="350"
                palette="palette4"
                type="bar"
                horizontal
                :series="chartData.series.slice(0, 1)"
                :categories="chartData.categories"
                strokestyle="smooth"
                :dark="isDark"
              />
            </div>
          </div>
        </ClientOnly>
      </BaseCard>
    </Transition>

    <Transition v-if="showChart.pine">
      <BaseCard class="q-my-md" title="Pie/Donuts">
        <div class="row">
          <div class="col-12 col-md-6">
            <ChartPie
              class="q-my-sm"
              chart-id="chart-pine"
              height="350"
              palette="palette1"
              type="pie"
              :series="simpleSeries"
              :categories="simpleCategories"
              :dark="isDark"
            />
          </div>
          <div class="col-12 col-md-6">
            <ChartPie
              class="q-my-sm"
              chart-id="chart-donut"
              height="350"
              palette="palette5"
              type="donut"
              :colors="[
                '#78350f',
                '#92400e',
                '#b45309',
                '#d97706',
                '#f59e0b',
                '#fbbf24',
                '#fcd34d'
              ]"
              :series="simpleSeries"
              :categories="simpleCategories"
              :dark="isDark"
            />
          </div>
        </div>
      </BaseCard>
    </Transition>
  </BasePage>
</template>
