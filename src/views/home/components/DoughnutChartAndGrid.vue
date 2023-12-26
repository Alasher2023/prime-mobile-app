<script setup lang="ts">
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import DataTable from './DataTable.vue'
import { GetDataTableDepartmental } from '@/api/home'
import { type searchInfoObject, type tableDataInterface } from '../index'
import { ref, watch } from 'vue'

/**
 * 通用
 */
const props = defineProps({
  grid_header: { type: String, requied: true },
  searchInfo: { type: Object as () => searchInfoObject, requied: true }
})
function getData() {
  GetDataTableDepartmental(props.searchInfo as searchInfoObject)
    .then((res) => {
      chartLabels.value = []
      chartDs1.value = []
      if (res.data.length == 0) return
      res.data.forEach((x) => {
        if (x.g_sum != 0) {
          chartLabels.value?.push(x.key.depT_NM)
          chartDs1.value?.push(x.g_sum)
        }
      })
      chartData.value = setChartData()
      chartOptions.value = setChartOptions()
    })
    .catch((err) => {
      console.error(err)
    })
}
watch(props, () => {
  getData()
})

/**
 *  Datatable
 * */

/**
 *  Chart
 * */
const chartData = ref()
const chartOptions = ref()
const chartLabels = ref<Array<Object>>()
const chartDs1 = ref<Array<Object>>()

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: chartLabels,
    datasets: [
      {
        data: chartDs1,
        backgroundColor: [
          documentStyle.getPropertyValue('--blue-500'),
          documentStyle.getPropertyValue('--yellow-500'),
          documentStyle.getPropertyValue('--green-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--blue-400'),
          documentStyle.getPropertyValue('--yellow-400'),
          documentStyle.getPropertyValue('--green-400')
        ]
      }
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor,
          textAlign: 'left'
        },
        position: 'right',
        onClick : (sender,eventArgs) => {
          alert(eventArgs.text)
        }
      }
    }
  }
}
</script>

<template>
  <Card>
    <template #title>
      <p class="mr-auto bg-primary">chart with doughnut</p>
    </template>
    <template #content>
      <div class="">
        <Chart
          type="doughnut"
          :data="chartData"
          :options="chartOptions"
          class="h-full mr-auto"
          :pt="{ root: { class: 'w-16rem' } }"
        />
      </div>
    </template>
    <template #footer>
      <DataTable :grid_header="props.grid_header" :searchInfo="props.searchInfo"></DataTable>
    </template>
  </Card>
</template>
