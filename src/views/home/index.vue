<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import homeView from '@/components/layout/HomeLayout/homeLayout_index.vue'
import datashow from './components/DataShow.vue'
import combochart from './components/ComboChartAndGrid.vue'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Calendar from 'primevue/calendar'
import { type searchInfoObject } from '@/views/home/index'
import { onMounted, ref, watch } from 'vue'

enum RequestType {
  'Monthly' = 1,
  'Daily' = 2
}
const Title = ref()
const CalendarDate = ref(new Date())
const SelectButtonValue = ref('日')
const SelectButtonOptions = ref(['日', '月'])
// const calendarDateFormat = computed(() => SelectButtonValue.value == "月" ? "yy年mm月" : "yy年mm月dd日")
const s_info = ref<searchInfoObject>()

function formatDate(date : Date, sep="") {
  const yyyy = date.getFullYear();
  const mm = ('00' + (date.getMonth()+1)).slice(-2);
  const dd = ('00' + date.getDate()).slice(-2);

  return `${yyyy}${sep}${mm}${sep}${dd}`;
}

function fncAddDate(value: number) {
  let OldDate = new Date(CalendarDate.value)
  let NewDate =
    SelectButtonValue.value == '月'
      ? new Date(OldDate.setMonth(OldDate.getMonth() + value))
      : new Date(OldDate.setDate(OldDate.getDate() + value))
  CalendarDate.value = NewDate
}

const setSearchValue = () => {
  s_info.value = {
    comp_cd: 1,
    shop_type_cd: 1,
    shop_cd: 47,
    b_day: formatDate(CalendarDate.value),
    type: SelectButtonValue.value == '月' ? RequestType.Monthly : RequestType.Daily
  }
}

watch(CalendarDate,() => {
  setSearchValue()
})

watch(SelectButtonValue, () => {
  CalendarDate.value = new Date(CalendarDate.value)
})

onMounted(() => {
  setSearchValue()
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
                  :dateFormat="SelectButtonValue == '月' ? 'yy年mm月' : 'yy年mm月dd日'"
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
                    class: 'h-1rem w-10rem focus:shadow-none'
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
                  <!-- 数据展展示 -->
                  <datashow :search-info="s_info"></datashow>
                </div>
                <div class="col-12 md:col-6">
                  <div class="grid grid-nogutter">
                    <div class="col-12">
                      <!-- 饼图1 -->
                      <combochart :search-info="s_info"></combochart>
                    </div>
                    <div class="col-12">
                      <!-- 饼图2 -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <!-- 图标3 -->
            </div>
          </div>
        </main>
      </div>
    </template>
  </homeView>
</template>
