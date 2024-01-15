<script setup lang="ts">
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import DataTable from './DataTable.vue'
import { GetDataTableDepartmental, GetDataTableDepartmentalTable } from '@/api/home'
import { type searchInfoObject, type tableDataInterface } from '../index'
import { ref, watch } from 'vue'

/**
 * 通用
 */
const props = defineProps({
  searchInfo: { type: Object as () => searchInfoObject, requied: true }
})


/**
 *  Datatable
 * */
const gridData = ref<Array<tableDataInterface>>()
const gridHeader = ref<string>('')
function getTableData(dept_cd:number) {
  GetDataTableDepartmentalTable(props.searchInfo as searchInfoObject,dept_cd)
  .then(res => {
    gridData.value = []
    res.data.forEach((x: { key: { menU_NM: string; menU_CD: number }; g_qty: number; g_sum: number }) => {
      let tempArr : tableDataInterface = new Object as tableDataInterface
      tempArr.label = x.key.menU_NM
      tempArr.value = x.key.menU_CD
      tempArr.qty = x.g_qty
      tempArr.total = x.g_sum
      if(chartDs1.value && chartLabelsCD.value){
        tempArr.percent = Intl.NumberFormat('ja', { style: 'percent'}).format(x.g_sum / Number.parseInt(chartDs1.value[chartLabelsCD.value.indexOf(dept_cd)].toString())) 
      }else{
        tempArr.percent = Intl.NumberFormat('ja', { style: 'percent'}).format(0)
      }
      
      gridData.value?.push(tempArr)
    })
  })
  .catch(err => {
    console.log(err)
  })

}


/**
 *  Chart
 * */
const chartData = ref()
const chartOptions = ref()
const chartLabelsCD = ref<Array<Object>>()
const chartLabels = ref<Array<Object>>()
const chartDs1 = ref<Array<Object>>()

  function getData() {
  GetDataTableDepartmental(props.searchInfo as searchInfoObject)
    .then((res) => {
      chartLabelsCD.value = []
      chartLabels.value = []
      chartDs1.value = []
      if (res.data.length == 0) return
      res.data.forEach((x: any) => {
        if (x.g_sum != 0) {
          chartLabelsCD.value?.push(x.depT_CD)
          chartLabels.value?.push(x.depT_NM)
          chartDs1.value?.push(x.g_sum)
        }
      })
      chartData.value = setChartData()
      chartOptions.value = setChartOptions()
    })
    .then(() => {
      if(chartLabelsCD.value && chartLabels.value){
        if(chartLabelsCD.value.length == 0){
          gridHeader.value = ''
          gridData.value = []
        }else{
          gridHeader.value = chartLabels.value[0].toString()
          getTableData(chartLabelsCD.value[0] as number)
        }
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
watch(props, () => {
  getData()
})

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
        onClick : (sender :any,eventArgs :any) => {
          if(chartLabels.value && chartLabelsCD.value){
            getTableData(chartLabelsCD.value[chartLabels.value.indexOf(eventArgs.text)] as number)
            gridHeader.value = eventArgs.text
          }
        }
      }
    }
  }
}
</script>

<template>
  <Card>
    <template #title>
      <p class="mr-auto bg-primary">部門別売上構成</p>
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
      <DataTable :grid_header="'選択部門:' + gridHeader" :ds="gridData"></DataTable>
    </template>
  </Card>
</template>
