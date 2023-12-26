<script setup lang="ts">
import { ref, watch } from 'vue'
import { GetDataShow } from '@/api/home'
import { type searchInfoObject, type SalesInfoInterface } from '../index'
import Divider from 'primevue/divider'

const SalesInfo = ref<SalesInfoInterface>()
const props = defineProps({
  searchInfo: { type: Object as () => searchInfoObject, requied: true }
})

async function getData() {
  GetDataShow(props.searchInfo as searchInfoObject).then((res) => {
    // let [SumDaily, OldSumDailyMonth, oldSumDailyYear, amtPlan] = res
    const formatter = new Intl.NumberFormat('ja-JP')
    if(res.data.length != 0){
      SalesInfo.value = {
        Sales: formatter.format(res.data[0]['g_amt_outtax']),
        TaxNormal: formatter.format(res.data[0]['tax1_g_amt_outtax']),
        TaxReduced: formatter.format(res.data[0]['tax2_g_amt_outtax']),
        TupleNum: formatter.format(res.data[0]['chk_cnt']),
        TuplePrice: formatter.format(
          Math.ceil(
            res.data[0]['chk_cnt'] == 0
              ? 0
              : res.data[0]['g_amt_outtax'] / res.data[0]['chk_cnt']
          )
        ),
        GuestNum: formatter.format(res.data[0]['guest_num']),
        GuestPrice: formatter.format(
          Math.ceil(
            res.data[0]['guest_num'] == 0
              ? 0
              : res.data[0]['g_amt_outtax'] / res.data[0]['guest_num']
          )
        ),
        BudgetRatiosPercent: (res.data[0]['amt_plan'] == 0
          ? 0
          : (res.data[0]['g_amt_outtax'] / res.data[0]['amt_plan']) * 100
        ).toFixed(1),
        BudgetRatiosPrice: formatter.format(res.data[0]['amt_plan']),
        MonthRatiosPercent: (res.data[0]['g_amt_outtax_month'] == 0
          ? 0
          : (res.data[0]['g_amt_outtax'] / res.data[0]['g_amt_outtax_month']) * 100
        ).toFixed(1),
        MonthRatiosPrice: formatter.format(res.data[0]['g_amt_outtax_month']),
        YearRatiosPercent: (res.data[0]['g_amt_outtax_year'] == 0
          ? 0
          : (res.data[0]['g_amt_outtax'] / res.data[0]['g_amt_outtax_year']) * 100
        ).toFixed(1),
        YearRatiosPrice: formatter.format(res.data[0]['g_amt_outtax_year'])
      }
    }else{
      SalesInfo.value = {
        Sales: 0,
        TaxNormal: 0,
        TaxReduced: 0,
        TupleNum: 0,
        TuplePrice: 0,
        GuestNum: 0,
        GuestPrice: 0,
        BudgetRatiosPercent: 0,
        BudgetRatiosPrice: 0,
        MonthRatiosPercent: 0,
        MonthRatiosPrice: 0,
        YearRatiosPercent: 0,
        YearRatiosPrice: 0
      }
    }
  })
}

watch(props, () => {
  getData()
})

</script>

<template>
  <div class="col-12 md:col-6">
    <div class="grid grid-nogutter px-3">
      <div class="col-12">
        <div class="grid">
          <div class="col-2 text-xs">売上</div>
          <div class="col-10 text-3xl text-right -mb-3">{{ SalesInfo?.Sales }} 円</div>
        </div>
      </div>
      <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
      <div class="col-12 -mb-2">
        <div class="grid">
          <div class="col"></div>
          <div class="col-4 text-xs text-left">標準税率対象額<br />軽減税率対象額</div>
          <div class="col-7 text-xs text-right">
            {{ SalesInfo?.TaxNormal }} 円<br />{{ SalesInfo?.TaxReduced }} 円
          </div>
        </div>
      </div>
      <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
      <div class="col-12">
        <div class="grid -mb-2">
          <div class="col-3 text-xs text-left">組/単価<br />客/単価</div>
          <div class="col-4 text-xs text-right">
            {{ SalesInfo?.TupleNum }} 組<br />{{ SalesInfo?.GuestNum }} 名
          </div>
          <div class="col-5 text-xs text-right">
            {{ SalesInfo?.TuplePrice }} 円<br />{{ SalesInfo?.GuestPrice }} 円
          </div>
        </div>
      </div>
      <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
      <div class="col-12">
        <div class="grid -mb-2">
          <div class="col-3 text-xs text-left">予算比</div>
          <div class="col-4 text-xs text-right">{{ SalesInfo?.BudgetRatiosPercent }} %</div>
          <div class="col-5 text-xs text-right">{{ SalesInfo?.BudgetRatiosPrice }} 円</div>
        </div>
      </div>
      <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
      <div class="col-12">
        <div class="grid -mb-2">
          <div class="col-3 text-xs text-left">前月比</div>
          <div class="col-4 text-xs text-right">{{ SalesInfo?.MonthRatiosPercent }} %</div>
          <div class="col-5 text-xs text-right">{{ SalesInfo?.MonthRatiosPrice }} 円</div>
        </div>
      </div>
      <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
      <div class="col-12">
        <div class="grid -mb-2">
          <div class="col-3 text-xs text-left text-center">前年当月比</div>
          <div class="col-4 text-xs text-right">{{ SalesInfo?.YearRatiosPercent }} %</div>
          <div class="col-5 text-xs text-right">{{ SalesInfo?.YearRatiosPrice }} 円</div>
        </div>
      </div>
      <Divider :pt="{ root: { class: 'my-1' } }"></Divider>
    </div>
  </div>
</template>
../indexType
