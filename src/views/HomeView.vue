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
import { ref, reactive, watch, onMounted } from 'vue'
import apiClient from '@/Composables/request'

enum OldSumDailyType {
  'Month' = '1',
  'Year' = '2'
}

enum RequestType {
  'Daily' = 1,
  'Monthly' = 2
}

interface SalesInfoInterface {
  _Sales: Number | String
  _TaxNormal: Number | String
  _TaxReduced: Number | String
  _TupleNum: Number | String
  _TuplePrice: Number | String
  _GuestNum: Number | String
  _GuestPrice: Number | String
  _BudgetRatiosPercent: Number | String
  _BudgetRatiosPrice: Number | String
  _MonthRatiosPercent: Number | String
  _MonthRatiosPrice: Number | String
  _YearRatiosPercent: Number | String
  _YearRatiosPrice: Number | String
}
const SalesInfo = reactive<SalesInfoInterface>({
  _Sales: 0,
  _TaxNormal: 0,
  _TaxReduced: 0,
  _TupleNum: 0,
  _TuplePrice: 0,
  _GuestNum: 0,
  _GuestPrice: 0,
  _BudgetRatiosPercent: 0,
  _BudgetRatiosPrice: 0,
  _MonthRatiosPercent: 0,
  _MonthRatiosPrice: 0,
  _YearRatiosPercent: 0,
  _YearRatiosPrice: 0
})
const Title = ref()
const CalendarDate = ref(new Date())
const SelectButtonValue = ref('日')
const SelectButtonOptions = ref(['日', '月'])

interface ChartDoughnutDataInterface {
  chartlabel: Array<string>
  chartvalue: Array<number>
  chartcolor?: Array<string>
}
const ChartDoughnutData = reactive<ChartDoughnutDataInterface>({
  chartlabel: [],
  chartvalue: []
})
interface ChartComboDataInterface {
  lables: Array<string>
  linelable: String
  linevalue: Array<number>
  barlable: String
  barvalue: Array<number>
}
const ChartComboData = reactive<ChartComboDataInterface>({
  lables: [],
  linelable: '',
  linevalue: [],
  barlable: '',
  barvalue: []
})

watch(SelectButtonValue, () => {
  CalendarDate.value = new Date(CalendarDate.value)
  SelectButtonValue.value == '月'
    ? getData(1, 1, 47, 20230501, RequestType.Monthly)
    : getData(1, 1, 47, 20230501, RequestType.Daily)
})

function fncAddDate(value: number) {
  let OldDate = new Date(CalendarDate.value)
  let NewDate =
    SelectButtonValue.value == '月'
      ? new Date(OldDate.setMonth(OldDate.getMonth() + value))
      : new Date(OldDate.setDate(OldDate.getDate() + value))
  CalendarDate.value = NewDate
}

async function getData(
  comp_cd: number,
  shop_type_cd: number,
  shop_cd: number,
  b_day: number,
  r_type: number
) {
  const Apis = [
    `/api/SumDaily/GetSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type}`,
    `/api/SumDaily/GetOldSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type},${OldSumDailyType.Month}`,
    `/api/SumDaily/GetOldSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type},${OldSumDailyType.Year}`,
    `/api/SumDaily/GetAmtPlan/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type}`
  ]

  await Promise.all(Apis.map((Api) => apiClient.get(Api)))
    .then((res) => {
      let [SumDaily, OldSumDailyMonth, oldSumDailyYear, amtPlan] = res
      const formatter = new Intl.NumberFormat('ja-JP')
      SalesInfo._Sales = formatter.format(SumDaily.data[0]['g_amt_outtax'])
      SalesInfo._TaxNormal = formatter.format(SumDaily.data[0]['tax1_g_amt_outtax'])
      SalesInfo._TaxReduced = formatter.format(SumDaily.data[0]['tax2_g_amt_outtax'])
      SalesInfo._TupleNum = formatter.format(SumDaily.data[0]['chk_cnt'])
      SalesInfo._TuplePrice = formatter.format(
        Math.ceil(
          SumDaily.data[0]['chk_cnt'] == 0
            ? 0
            : SumDaily.data[0]['g_amt_outtax'] / SumDaily.data[0]['chk_cnt']
        )
      )
      SalesInfo._GuestNum = formatter.format(SumDaily.data[0]['guest_num'])
      SalesInfo._GuestPrice = formatter.format(
        Math.ceil(
          SumDaily.data[0]['guest_num'] == 0
            ? 0
            : SumDaily.data[0]['g_amt_outtax'] / SumDaily.data[0]['guest_num']
        )
      )
      // SalesInfo._BudgetRatiosPercent =
    })
    .catch((err) => {
      throw new Error(err)
    })
}

function setChartData() {
  ChartDoughnutData.chartlabel = ['A', 'B']
  ChartDoughnutData.chartvalue = [540, 325]

  ChartComboData.lables = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  ChartComboData.linelable = 'Dataset 1'
  ChartComboData.linevalue = [50, 25, 12, 48, 56, 76, 42]
  ChartComboData.barlable = 'Dataset 2'
  ChartComboData.barvalue = [21, 84, 24, 75, 37, 65, 34]
}

onMounted(() => {
  getData(1, 1, 47, 20230501, RequestType.Daily)
  setChartData()
})
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
                  :label="SelectButtonValue == '月' ? '前月' : '前日'"
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
                  :label="SelectButtonValue == '月' ? '翌月' : '翌日'"
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
                        <div class="col-2 text-xs">売上</div>
                        <div class="col-10 text-3xl text-right -mb-3">
                          {{ SalesInfo._Sales }} 円
                        </div>
                      </div>
                    </div>
                    <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
                    <div class="col-12 -mb-2">
                      <div class="grid">
                        <div class="col"></div>
                        <div class="col-4 text-xs text-left">
                          標準税率対象額<br />軽減税率対象額
                        </div>
                        <div class="col-7 text-xs text-right">
                          {{ SalesInfo._TaxNormal }} 円<br />{{ SalesInfo._TaxReduced }} 円
                        </div>
                      </div>
                    </div>
                    <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
                    <div class="col-12">
                      <div class="grid -mb-2">
                        <div class="col-3 text-xs text-left">組/単価<br />客/単価</div>
                        <div class="col-4 text-xs text-right">
                          {{ SalesInfo._TupleNum }} 組<br />{{ SalesInfo._GuestNum }} 名
                        </div>
                        <div class="col-5 text-xs text-right">
                          {{ SalesInfo._TuplePrice }} 円<br />{{ SalesInfo._GuestPrice }} 円
                        </div>
                      </div>
                    </div>
                    <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
                    <div class="col-12">
                      <div class="grid -mb-2">
                        <div class="col-3 text-xs text-left">予算比</div>
                        <div class="col-4 text-xs text-right">
                          {{ SalesInfo._BudgetRatiosPercent }} %
                        </div>
                        <div class="col-5 text-xs text-right">
                          {{ SalesInfo._BudgetRatiosPrice }} 円
                        </div>
                      </div>
                    </div>
                    <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
                    <div class="col-12">
                      <div class="grid -mb-2">
                        <div class="col-3 text-xs text-left">前月比</div>
                        <div class="col-4 text-xs text-right">
                          {{ SalesInfo._MonthRatiosPercent }} %
                        </div>
                        <div class="col-5 text-xs text-right">
                          {{ SalesInfo._MonthRatiosPrice }} 円
                        </div>
                      </div>
                    </div>
                    <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
                    <div class="col-12">
                      <div class="grid -mb-2">
                        <div class="col-3 text-xs text-left text-center">前年当月比</div>
                        <div class="col-4 text-xs text-right">
                          {{ SalesInfo._YearRatiosPercent }} %
                        </div>
                        <div class="col-5 text-xs text-right">
                          {{ SalesInfo._YearRatiosPrice }} 円
                        </div>
                      </div>
                    </div>
                    <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
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
                          <doughnut_chart
                            :label="ChartDoughnutData.chartlabel"
                            :value="ChartDoughnutData.chartvalue"
                          />
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
                  <!-- <combo_chart
                    :labels="ChartComboData.lables"
                    :linelable="ChartComboData.linelable"
                    :linevalue="ChartComboData.linevalue"
                    :barlable="ChartComboData.barlable"
                    :barvalue="ChartComboData.barvalue"
                  /> -->
                </template>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </template>
  </homeView>
</template>
