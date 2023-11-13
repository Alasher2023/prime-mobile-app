<script setup lang="ts">
import homeView from '@/components/layout/HomeLayout/homeLayout_index.vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import combo_chart from '@/components/chart/comboChart.vue'
import horizontalbar_chart from '@/components/chart/HorizontalBarChart.vue'
import doughnut_chart from '@/components/chart/doughnutChart.vue'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Calendar from 'primevue/calendar'

import { ref, watch } from 'vue'

const CalendarDate = ref(new Date())
const SelectButtonValue = ref('Monthly')
const SelectButtonOptions = ref(['Daily', 'Monthly'])

watch(SelectButtonValue, () => {
  CalendarDate.value = new Date(CalendarDate.value)
})

function fncAddDate(value: number) {
  let OldDate = new Date(CalendarDate.value)
  let NewDate =
    SelectButtonValue.value == 'Monthly'
      ? new Date(OldDate.setMonth(OldDate.getMonth() + value))
      : new Date(OldDate.setDate(OldDate.getDate() + value))
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
              <div>
                <Button
                  label="Pre"
                  :pt="{
                    root: { class: 'h-1rem focus:shadow-none' }
                  }"
                  @click.stop="fncAddDate(-1)"
                />
              </div>
              <div>
                <Calendar
                  v-model="CalendarDate"
                  :dateFormat="SelectButtonValue == 'Daily' ? 'yy年mm月dd日' : 'yy年mm月'"
                  touchUI
                  :pt="{
                    root: { class: 'w-10rem' },
                    input: { class: 'border-none text-ms text-center' }
                  }"
                />
              </div>
              <div>
                <Button
                  label="Next"
                  :pt="{
                    root: { class: 'h-1rem focus:shadow-none' }
                  }"
                  @click.stop="fncAddDate(1)"
                />
              </div>
            </div>
            <div class="align-self-center mt-3">
              <SelectButton
                v-model="SelectButtonValue"
                :options="SelectButtonOptions"
                aria-labelledby="basic"
                :pt="{
                  button: ({ context }) => ({
                    class: 'h-1rem w-7rem focus:shadow-none'
                  })
                }"
              />
            </div>
          </div>
        </header>

        <main class="md:h-full overflow-y-scroll flex-grow-1 p-4">
          <div class="grid grid-nogutter">
            <div class="col-12">
              <div class="grid grid-nogutter">
                <div class="col-12 md:col-6">
                  <div class="grid grid-nogutter px-3">
                        <div class="col-12">
                          <div class="grid">
                            <div class="col-2 text-xs">
                              Sales
                            </div>
                            <div class="col-10 text-3xl text-right">
                              21,946,502
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid">
                            <div class="col"></div>
                            <div class="col-4 text-xs text-left">
                              Tax-Normal<br/>Tax-Light
                            </div>
                            <div class="col-7 text-xs text-right">
                              19,207,757<br/>2,739,448
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid">
                            <div class="col-3 text-xs text-left">
                              Price_Tuple<br/>Price_Guest
                            </div>
                            <div class="col-4 text-xs  text-right">
                              18,034 Tuple<br/>21,522 Guest
                            </div>
                            <div class="col-5 text-xs  text-right">
                              1,217<br/>1,020
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid">
                            <div class="col-3 text-xs text-left">
                              BudgetRatios
                            </div>
                            <div class="col-4 text-xs text-right">
                              93.0%
                            </div>
                            <div class="col-5 text-xs text-right">
                              23,600,000
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid">
                            <div class="col-3 text-xs text-left">
                              MonthRatios
                            </div>
                            <div class="col-4 text-xs text-right">
                              107.9%
                            </div>
                            <div class="col-5 text-xs text-right">
                              20,341,986
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid">
                            <div class="col-3 text-xs text-left text-center">
                              YearRatios
                            </div>
                            <div class="col-4 text-xs text-right">
                              105.3%
                            </div>
                            <div class="col-5 text-xs text-right">
                              20,840,274
                            </div>
                          </div>
                        </div>                        
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                      </div>
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
