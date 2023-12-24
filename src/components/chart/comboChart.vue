<template>
  <div class="card">
    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full mr-auto" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Chart from 'primevue/chart'

// onMounted(() => {
//     chartData.value = setChartData();
//     chartOptions.value = setChartOptions();
// });

interface datasetInterface {
  type: string
  label: string
  borderColor: string
  borderWidth: number
  fill: boolean
  tension: number
  data:Array<number>
}
const chartData = ref()
const chartOptions = ref()

const props = defineProps({
    labels: {type: Array<string>, requied: true},
    ds: {type: Array as () => datasetInterface[],requied: true}
})

watch(props, () => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const setChartData = () => {
  // const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: props.labels,
    datasets: props.ds
    // [
    //   {
    //     type: 'line',
    //     label: props.linelable,
    //     borderColor: documentStyle.getPropertyValue('--blue-500'),
    //     borderWidth: 2,
    //     fill: false,
    //     tension: 0.4,
    //     data: props.linevalue
    //   },
    //   {
    //     type: 'bar',
    //     label: props.barlable,
    //     backgroundColor: documentStyle.getPropertyValue('--green-500'),
    //     data: props.barvalue,
    //     borderColor: 'white',
    //     borderWidth: 2
    //   }
    // ]
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

<!-- 
<script setup lang="ts">
import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
        
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                type: 'line',
                label: 'Dataset 1',
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                data: [50, 25, 12, 48, 56, 76, 42]
            },
            {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: [21, 84, 24, 75, 37, 65, 34],
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                data: [41, 52, 24, 74, 23, 21, 32]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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
    };
}
</script> -->
