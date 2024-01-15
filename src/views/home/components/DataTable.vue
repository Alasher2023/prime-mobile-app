<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { type tableDataInterface } from '../index'

const props = defineProps({
  ds: {
    type: Array as () => tableDataInterface[],
    requied: true
  },
  grid_header: {
    type: String,
    requied: true
  }
})
</script>

<template>
    <DataTable
      :value="props.ds"
      showGridlines
      stripedRows
      :size="'small'"
      :rowClass="
        () => {
          return 'text-xs'
        }
      "
      :pt="{
        thead: { class: 'text-xs white-space-nowrap' }
      }"
    >
      <Column field="label" :header="props.grid_header">
        <template #body="slotProps">
          <div class="w-7rem white-space-nowrap overflow-x-hidden">
            {{ slotProps.data.label }}
          </div>
        </template>
      </Column>
      <Column field="qty" header="数量" class="w-1 bg-blue-100"></Column>
      <Column field="total" header="合計" class="w-auto bg-red-100"></Column>
      <Column field="percent" header="構成%" class="w-1 bg-yellow-100"></Column>
    </DataTable>
</template>
