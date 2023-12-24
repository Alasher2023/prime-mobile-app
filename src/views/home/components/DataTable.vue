<script setup lang="ts">

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { type tableDataInterface } from '../index'

const props = defineProps({
    ds : {
        type: Array as () => tableDataInterface[],
        requied : true
    },
    grid_header : {
        type : String,
        requied : true
    }
})

</script>

<template>
    <DataTable :value="props.ds" class="p-datatable-sm">
        <Column field="sort" header="No"></Column>
        <Column field="label" :header="props.grid_header"></Column>
        <Column field="value" header="数量"></Column>
        <Column field="total" header="合計"></Column>
        <Column field="percent" header="構成%"></Column>
      </DataTable>
</template>../indexType