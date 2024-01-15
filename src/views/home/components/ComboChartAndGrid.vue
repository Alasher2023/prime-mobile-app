<script setup lang="ts">
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import { GetDataTableSalesAndGuests } from '@/api/home'
import { ref, watch } from 'vue'
import { type searchInfoObject } from '../index'

/**
 * 通用
 */
const props = defineProps({
  grid_header: { type: String, requied: true },
  searchInfo: { type: Object as () => searchInfoObject, requied: true }
})
watch(props, () => {
  GetData()
})
async function GetData() {
  GetDataTableSalesAndGuests(props.searchInfo as searchInfoObject)
    .then((res) => {
      chartDs1.value = []
      chartDs2.value = []
      chartLabels.value = []
      if(res.data.length == 0) return
      for (let i = 0; i <= 23; i++) {
        let key_amt = 'time' + i.toString() + '_amt'
        let key_guest = 'time' + i.toString() + '_guest'
        chartDs1.value.push(res.data[0].item[key_guest])
        chartDs2.value.push(res.data[0].sales[key_amt])
        chartLabels.value.push(i)
      }
      chartData.value = setChartData()
      chartOptions.value = setChartOptions()
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * Chart
 */
const chartData = ref()
const chartOptions = ref()
const chartLabels = ref<Array<Object>>()
const chartDs1 = ref<Array<Object>>()
const chartDs2 = ref<Array<Object>>()

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: chartLabels,
    datasets: [
      {
        type: 'line',
        label: '客数',
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
        data: chartDs2
      },
      {
        type: 'bar',
        label: '売上',
        backgroundColor: documentStyle.getPropertyValue('--green-500'),
        data: chartDs1,
        borderColor: 'white',
        borderWidth: 2,
        yAxisID: 'y'
      }
    ]
  }
}
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          autoSkip : false,
          font: {
            size : 9,
            family : 'math'
          }
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
    }
  }
}
</script>

<template>
  <Card>
    <template #title>
      <p class="mr-auto bg-primary">1時間帯別売上・客数</p>
    </template>
    <template #content>
      <div class="">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full mr-auto" />
      </div>
    </template>
  </Card>
</template>
../indexType
