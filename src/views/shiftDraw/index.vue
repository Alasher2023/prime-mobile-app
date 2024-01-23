<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
import { string } from 'yup'

const cData = [
  {
    name: 'liyang',
    age: 36,
    city: 'shanghai',
    shifts: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    showflg:true,
    row: 1
  },
  {
    name: 'liyang',
    age: 36,
    city: 'shanghai',
    shifts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    showflg:true,
    row: 2
  },
  {
    name: 'liyang',
    age: 36,
    city: 'shanghai',
    shifts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    showflg:false,
    row: 3
  },
  {
    name: 'lulv',
    age: 26,
    city: 'changshu',
    shifts: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    showflg:true,
    row: 1
  },
  {
    name: 'lulv',
    age: 26,
    city: 'changshu',
    shifts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    showflg:true,
    row: 2
  }
]

const shiftData = ref()

onMounted(() => {
  shiftData.value = cData
})


const drawType = ref(0)
var arrShiftChg: (string | null)[] = []
var arrEl:(HTMLElement)[] = []
var recordFlg = false
function onMouseDown(event:MouseEvent) {
  recordFlg = true
  arrShiftChg = []
  let el = event.target as HTMLElement
  let shiftIndex = el.getAttribute('shiftindex')
//   el.style.marginTop = "1rem";
//   arrEl.push(el)
  arrShiftChg.push(shiftIndex)
  
}

function onMouseMove(event:MouseEvent) {
  if (!recordFlg) return false
  let el = event.target as HTMLElement
  let shiftIndex = el.getAttribute('shiftindex')
//   el.style.marginTop = "1rem";
  console.log(el.style.backgroundColor)
  if (arrShiftChg.indexOf(shiftIndex) > -1){
    // do nothing
  }else{
    arrShiftChg.push(shiftIndex)
    // arrEl.push(el)
    console.log(shiftIndex)
  }
}

function onMouseUp(event:MouseEvent) {
  recordFlg = false
  let el = event.target as HTMLElement
  let shiftIndex = el.getAttribute('shiftindex')
  if (arrShiftChg.indexOf(shiftIndex) > -1){
    // do nothing
  }else{
    arrShiftChg.push(shiftIndex)
    arrEl.push(el)
  }
  let shiftRow = el.getAttribute('rowIndex')
  let keyName = el.getAttribute('keyName')
  let sData = shiftData.value.find(x => x.row == shiftRow && x.name === keyName)
  arrShiftChg.forEach(x => {
    sData.shifts[x] = drawType.value
  })
  arrEl.forEach(x => {
    x.style.marginTop = "0rem"
  })
  
}
</script>

<template>
  <Card>
    <template #content>
      <DataTable
        :value="shiftData"
        rowGroupMode="rowspan"
        groupRowsBy="name"
        sortMode="single"
        sortField="name"
        :sortOrder="1"
        tableStyle="min-width: 50rem"
      >
        <Column
          field="name"
          :pt="{
            root: {
              class: 'p-0'
            }
          }"
        >
          <template #body="slotProps">
            <span
            >{{ slotProps.data.name }}</span>
            <!-- <br>
            <span>{{ slotProps.data.age }}</span>
            <br>
            <span>{{ slotProps.data.city }}</span> -->
          </template>
        </Column>
        <Column
          field="shifts"
          class="flex"
          :pt="{
            root: {
              class: 'p-0 w-24rem h-1rem'
            }
          }"
        >
          <template #body="slotProps">
            <div
              v-for="(shift, index) in slotProps.data.shifts"
              :key="index"
              :shiftIndex="index"
              :rowIndex="slotProps.data.row"
              :keyName="slotProps.data.name"
              :class="[
                'border-solid border-1 border-y-none border-primary-100 flex-1',
                {
                  'bg-yellow-100' : slotProps.data.row >= 2,
                  'bg-blue-100' : slotProps.data.row === 1,
                  'bg-pink-100': shift === 1,
                  'bg-gray-100': shift === 2,
                }
              ]"
                @mousedown.stop.prevent ="onMouseDown"
                @mousemove.stop.prevent="onMouseMove"
                @mouseup.stop.prevent="onMouseUp"
            
            >
              <!-- {{ shift.toString() }} -->
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
    <template #footer>
        <div>
    <button class="h-3rem w-3rem m-3" @click="() => drawType = 1">1</button>
    <button class="h-3rem w-3rem m-3" @click="() => drawType = 2">2</button>
    <button class="h-3rem w-3rem m-3" @click="() => drawType = 0">0</button>
    <button class="h-3rem w-3rem m-3" @click="() => {
        shiftData.push(
            {
                name: 'lulv',
                age: 26,
                city: 'changshu',
                shifts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                showflg:true,
                row: 3
            }
        )
    }">add data</button>
    <button class="h-3rem w-3rem m-3" @click="() => {
        let sData = shiftData.value.find(x => x.row == 3 && x.name === 'lulv')
        let index = shiftData.indexOf(sData)
        shiftData.splice()
    }">del data</button>
  </div>
    </template>
  </Card>
</template>
