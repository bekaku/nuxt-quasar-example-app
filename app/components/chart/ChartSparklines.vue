<script setup lang="ts">
import type { ChartMode, ChartThemePalete, IChartSeries, Strokestyle } from '~/types/chart'
interface GridPadding {
  top: number
  right: number
  bottom: number
  left: number
}
const {
  chartId = 'chart-radar-id',
  height = '160',
  width = 'auto',
  mode = 'light',
  palette = 'palette1',
  series,
  colors,
  categories,
  gridPadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  strokeWidth = 1.5,
  opacity = 0.3,
  tooltipEnable = true,
  type = 'area',
  strokestyle = 'straight',
  dark = false
} = defineProps<{
  chartId?: string
  height?: string
  width?: string
  labelunit?: string
  mode?: ChartMode
  palette?: ChartThemePalete
  series: IChartSeries[]
  colors?: string[]
  tooltipEnable?: boolean
  categories: string[]
  gridPadding?: GridPadding
  strokeWidth?: number
  strokestyle?: Strokestyle
  opacity?: number
  dark?: boolean
  type?: 'area' | 'line' | 'bar'
}>()
const chartSeries = ref(series)
const options = ref<any>()
const { isDark } = useTheme()
const watchTimeout = ref<any>()
const chartSparkLinesRef = useTemplateRef<any>('chartSparkLinesRef')

// watchEffect(() => {
//   if (series && series.length > 0) {
//     chartSeries.value = series;
//   }
// });
onUnmounted(() => {
  options.value = undefined
  chartSeries.value = []
  if (watchTimeout.value) {
    clearTimeout(watchTimeout.value)
    watchTimeout.value = undefined
  }
})

onMounted(() => {
  chartSetup()
})

const updateTheme = (darkMode: boolean) => {
  if (chartSparkLinesRef.value) {
    chartSparkLinesRef.value.updateOptions({
      theme: {
        mode: darkMode ? 'dark' : 'light'
      }
    })
  }
}
watch(isDark, state => {
  watchTimeout.value = setTimeout(() => {
    updateTheme(state)
  }, 50)
})
const getCateByIndex = (index: number) => (categories?.length > 0 ? categories[index] : '-')
const chartSetup = () => {
  if (series && series.length > 0) {
    options.value = {
      // series: series.value,
      // series: series,
      chart: {
        background: 'transparent',
        id: chartId,
        width,
        height,
        type,
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easein', // linear, easeout, easein, easeinout, swing, bounce, elastic
          speed: 800
        },
        sparkline: {
          enabled: true
        }
      },
      theme: {
        mode: dark ? 'dark' : mode,
        palette
      },
      plotOptions: {},
      colors: colors && colors.length > 0 ? colors : undefined,
      stroke: {
        width: type == 'bar' ? 0 : strokeWidth,
        curve: strokestyle
      },
      fill: {
        // opacity: type == "bar" ? 1 : 0.3,
        opacity
      },
      xaxis: {
        crosshairs: {
          width: 1
        }
      },
      yaxis: {
        min: 0
      },
      grid: {
        padding: gridPadding
      },
      tooltip: {
        enabled: tooltipEnable,
        fixed: {
          enabled: false
        },
        x: {
          show: false,
          formatter(value: any, options: any) {
            return getCateByIndex(options.dataPointIndex) || '-'
          }
        },
        // y: {
        //   title: {
        //     formatter(seriesName: any) {
        //       return seriesName || '-';
        //     },
        //   },
        // },
        marker: {
          show: false
        }
      },
      responsive: [
        // {
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 200,
        //     },
        //     legend: {
        //       position: 'bottom',
        //     },
        //   },
        // },
      ]
    }
    // chart.value = new ApexCharts(
    //   document.querySelector('#' + chartId),
    //   options
    // );
    // chart.value.render();
  }
}
</script>
<template>
  <ClientOnly>
    <apexchart
      v-if="options"
      v-bind="$attrs"
      ref="chartSparkLinesRef"
      :height="height"
      :type="type"
      :options="options"
      :series="chartSeries"
    />
  </ClientOnly>
</template>
