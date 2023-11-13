<script setup lang="ts">
import homeView from '@/components/layout/HomeLayout/homeLayout_index.vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import combo_chart from '@/components/chart/comboChart.vue'
import horizontalbar_chart from '@/components/chart/HorizontalBarChart.vue'
import doughnut_chart from '@/components/chart/doughnutChart.vue'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton';
import Calendar from 'primevue/calendar';

import { ref,watch } from 'vue';

const CalendarDate = ref(new Date())
const SelectButtonValue = ref('Monthly');
const SelectButtonOptions = ref(['Daily', 'Monthly']);

watch(SelectButtonValue, () => {
  CalendarDate.value = new Date(CalendarDate.value)
})

function fncAddDate(value:number){
  let OldDate = new Date(CalendarDate.value)
  let NewDate = SelectButtonValue.value == 'Monthly' ? new Date(OldDate.setMonth(OldDate.getMonth() + value)) : new Date(OldDate.setDate(OldDate.getDate() + value))
  CalendarDate.value = NewDate
}

</script>

<template>
  <homeView>
    <template #default>
      <div class="flex flex-column h-full">
        <header class="flex-none">
          <div class="md:hidden flex flex-column">
            <div class="text-center text-3xl font-bold">Title</div>
            <div class="flex flex-row justify-content-between align-items-center px-3">
              <div><Button label="Pre"
                :pt="{ 
                    root: { class: 'h-1rem w-5rem focus:shadow-none' } 
                }"
                @click="fncAddDate(-1)"/></div>
              <div>
                <Calendar v-model="CalendarDate" :dateFormat="SelectButtonValue == 'Daily'? 'yy年mm月dd日' : 'yy年mm月'" touchUI
                :pt="{
                  root: {class: 'w-9rem'},
                  input: {class: 'border-none text-ms text-center'}
                }" />
              </div>
              <div><Button label="Next"
                :pt="{ 
                    root: { class: 'h-1rem w-5rem focus:shadow-none' } 
                }"
                @click="fncAddDate(1)"/></div>
            </div>
            <div class="align-self-center mt-3">
              <SelectButton v-model="SelectButtonValue" :options="SelectButtonOptions" aria-labelledby="basic" 
              :pt="{
                    button: ({ context }) => ({
                        class: 'h-1rem w-7rem focus:shadow-none'
                    })
                }"/>
            </div>
          </div>
        </header>

        <main class="md:h-full overflow-y-scroll flex-grow-1 p-2">
          <div class="grid grid-nogutter">
            <div class="col-12">
              <div class="grid grid-nogutter">
                <div class="col-12 md:col-6">
                  <Card>
                    <template #header>
                      <p class="ml-auto bg-blue-100">sales</p>
                    </template>
                    <template #title>
                      <p class="mr-auto bg-yellow-100">sales</p>
                    </template>
                    <template #subtitle>
                      <p class="mr-auto bg-green-100">sales</p>
                      <Divider></Divider>
                      <p class="mr-auto bg-green-100">sales</p>
                    </template>
                    <template #content>
                      <p class="m-0 bg-bluegray-100">sales</p>
                    </template>
                  </Card>
                </div>
                <div class="col-12 md:col-6">
                  <div class="grid grid-nogutter">
                    <div class="col-12">
                      <Card>
                        <template #title>
                          <p class="mr-auto bg-primary">chart with doughnut</p>
                        </template>
                        <template #content>
                          <doughnut_chart />
                        </template>
                      </Card>
                    </div>
                    <div class="col-12">
                      <Card>
                        <template #title>
                          <p class="mr-auto bg-primary">chart with horizontalbar</p>
                        </template>
                        <template #content>
                          <horizontalbar_chart />
                        </template>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <Card>
                <template #title>
                  <p class="mr-auto bg-primary">chart with combo</p>
                </template>
                <template #content>
                  <combo_chart />
                </template>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </template>
  </homeView>
</template>
