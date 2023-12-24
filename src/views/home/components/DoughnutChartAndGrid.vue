<script setup lang="ts">
import Card from 'primevue/card'
import Column from 'primevue/column'
import { ref } from 'vue'
// import {
//   type baseDataInterface,
//   type tableDataInterface,
//   type searchInterface
// } from '@/views/home/baseInterface'

// interface chartDataInterface extends baseDataInterface {
//   chartcolor?: string
// }
// const tableData = ref<tableDataInterface[]>()
// const chartData = ref<chartDataInterface[]>()
// const props = defineProps({
//   grid_header: { type: String, requied: true },
//   searchInfo: { type: Array as () => searchInterface[] }
// })
</script>

<template>
  <Card>
    <template #title>
      <p class="mr-auto bg-primary">chart with doughnut</p>
    </template>
    <template #content>

    </template>
    <template #footer>

    </template>
  </Card>
</template>
