<template>
  <div class="card flex justify-content-center">
    <Chart type="doughnut" :data="chartData" :options="chartOptions" style="width: 50%" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Chart from 'primevue/chart'

const props = defineProps({
  label: { type: Array<string>, requied: true },
  value: { type: Array<number>, requied: true },
  color: { type: Array<string> }
})

watch(props, () => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

// onMounted(() => {
//     chartData.value = setChartData();
//     chartOptions.value = setChartOptions();
// });

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: props.label,
    datasets: [
      {
        data: props.value,
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
          color: textColor
        }
      }
    }
  }
}
</script>
