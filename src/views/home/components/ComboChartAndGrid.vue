<script setup lang="ts">
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import DataTable from './DataTable.vue'
import { GetDataTableSalesAndGuests } from '@/api/home'
import { onMounted, ref, watch } from 'vue'
import { type searchInfoObject, type tableDataInterface} from '../index'
import { object } from 'yup'


/**
 * 通用
 */
const props = defineProps({
  grid_header: { type: String, requied: true },
  searchInfo: { type: Object as () => searchInfoObject, requied: true }
})
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
watch(props,() => {
  GetData()
})
function GetData() {
  let temp_amt_data = []
  let temp_guest_datat = []
  GetDataTableSalesAndGuests(props.searchInfo as searchInfoObject).then((res) => {
      
    for(let i = 0;i < 23; i ++){
        let key_amt = "time" + i.toString() + "_amt"
        let key_guest = "time" + i.toString() + "_guest"
        temp_amt_data.push(res.data[0][key_amt])
        temp_guest_datat.push(res.data[0][key_guest])
      }
    console.log(temp_amt_data)
    console.log(temp_guest_datat)
  }).catch(err => {
    console.log(err)
  })  
}

/**
 * DataTable
 */
const tableData = ref<tableDataInterface[]>()

/**
 * Chart
 */
const chartData = ref()
const chartOptions = ref()
const chartLabels = ref<Array<String>>()
const chartDs = ref<Array<Object>>()

const setChartData = async () => {
    
}



// const setChartData = () => {

//   return {
//     labels: chartLabels,
//     datasets: chartDs
//   }

// }
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
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  }
}
</script>

<template>
  <Card>
    <template #title>
      <p class="mr-auto bg-primary">chart with combo</p>
    </template>
    <template #content>
      <div class="">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full mr-auto" />
      </div>
    </template>
    <template #footer>
      <DataTable :grid_header="props.grid_header"></DataTable>
    </template>
  </Card>
</template>
../indexType