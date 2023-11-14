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
import { ref, reactive, watch } from 'vue'

interface SalesInfoInterface {
  _Sales : Number,
  _TaxNormal: Number,
  _TaxReduced : Number,
  _TupleNum : Number,
  _TuplePrice : Number,
  _GuestNum : Number,
  _GuestPrice : Number,
  _BudgetRatiosPercent : Number,
  _BudgetRatiosPrice : Number,
  _MonthRatiosPercent : Number,
  _MonthRatiosPrice : Number,
  _YearRatiosPercent: Number,
  _YearRatiosPrice: Number
}
const SalesInfo = reactive<SalesInfoInterface>({
  _Sales : 0,
  _TaxNormal: 0,
  _TaxReduced : 0,
  _TupleNum : 0,
  _TuplePrice : 0,
  _GuestNum : 0,
  _GuestPrice : 0,
  _BudgetRatiosPercent : 0,
  _BudgetRatiosPrice : 0,
  _MonthRatiosPercent : 0,
  _MonthRatiosPrice : 0,
  _YearRatiosPercent: 0,
  _YearRatiosPrice: 0
})
const Title = ref()
const CalendarDate = ref(new Date())
const SelectButtonValue = ref('月')
const SelectButtonOptions = ref(['日', '月'])

watch(SelectButtonValue, () => {
  CalendarDate.value = new Date(CalendarDate.value)
})

function fncAddDate(value: number) {
  let OldDate = new Date(CalendarDate.value)
  let NewDate =
    SelectButtonValue.value == '月'
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
            <div class="text-center text-3xl font-bold">{{ Title }}</div>
            <div class="flex flex-row justify-content-between align-items-center px-3">
              <div>
                <Button
                  :label="SelectButtonValue == '月'? '前月' : '前日'"
                  :pt="{
                    root: { class: 'h-1rem focus:shadow-none' }
                  }"
                  @click.stop="fncAddDate(-1)"
                />
              </div>
              <div>
                <Calendar
                  v-model="CalendarDate"
                  :dateFormat="SelectButtonValue == '日' ? 'yy年mm月dd日' : 'yy年mm月'"
                  touchUI
                  :pt="{
                    root: { class: 'w-10rem' },
                    input: { class: 'border-none text-ms text-center shadow-none' }
                  }"
                />
              </div>
              <div>
                <Button
                  :label="SelectButtonValue == '月'? '翌月' : '翌日'"
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

        <main class="md:h-full overflow-y-scroll flex-grow-1 pt-4">
          <div class="grid grid-nogutter">
            <div class="col-12">
              <div class="grid grid-nogutter">
                <div class="col-12 md:col-6">
                  <div class="grid grid-nogutter px-3">
                        <div class="col-12">
                          <div class="grid">
                            <div class="col-2 text-xs">
                              売上
                            </div>
                            <div class="col-10 text-3xl text-right -mb-3">
                              {{ SalesInfo._Sales }} 円
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12  -mb-2">
                          <div class="grid">
                            <div class="col"></div>
                            <div class="col-4 text-xs text-left">
                              標準税率対象額<br/>軽減税率対象額
                            </div>
                            <div class="col-7 text-xs text-right">
                              {{ SalesInfo._TaxNormal }} 円<br/>{{ SalesInfo._TaxReduced }} 円
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid -mb-2">
                            <div class="col-3 text-xs text-left">
                              組/単価<br/>客/単価
                            </div>
                            <div class="col-4 text-xs  text-right">
                              {{ SalesInfo._TupleNum }} 組<br/>{{ SalesInfo._GuestNum }} 名
                            </div>
                            <div class="col-5 text-xs  text-right">
                              {{ SalesInfo._TuplePrice }} 円<br/>{{ SalesInfo._GuestPrice }} 円
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid  -mb-2">
                            <div class="col-3 text-xs text-left">
                              予算比
                            </div>
                            <div class="col-4 text-xs text-right">
                              {{ SalesInfo._BudgetRatiosPercent }} %
                            </div>
                            <div class="col-5 text-xs text-right">
                              {{ SalesInfo._BudgetRatiosPrice }} 円
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid -mb-2">
                            <div class="col-3 text-xs text-left">
                              前月比
                            </div>
                            <div class="col-4 text-xs text-right">
                              {{ SalesInfo._MonthRatiosPercent }} %
                            </div>
                            <div class="col-5 text-xs text-right">
                              {{ SalesInfo._MonthRatiosPrice }} 円
                            </div>
                          </div>
                        </div>
                        <Divider :pt="{root:{class: 'my-1'}}"></Divider>
                        <div class="col-12">
                          <div class="grid -mb-2">
                            <div class="col-3 text-xs text-left text-center">
                              前年当月比
                            </div>
                            <div class="col-4 text-xs text-right">
                              {{ SalesInfo._YearRatiosPercent }} %
                            </div>
                            <div class="col-5 text-xs text-right">
                              {{ SalesInfo._YearRatiosPrice }} 円
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
