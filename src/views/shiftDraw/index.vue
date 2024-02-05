<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toolbar from 'primevue/toolbar'
import SelectButton from 'primevue/selectbutton'
import { shiftTypeValue, type targetElementsObject, type shiftDrawData } from './index'
import cData from './data'
import { db } from '@/Composables/db'

const doChangeIndexedDB = async (params: shiftDrawData, deleteOnly = false) => {
  try {
    await db.shiftDraws
      .where({ name: params.name, row: params.row })
      .delete()
      .then(() => {
        if (!deleteOnly) {
          db.shiftDraws.add({
            name: params.name,
            age: params.age,
            city: params.city,
            shifts: JSON.parse(JSON.stringify(params.shifts)),
            showflg: params.showflg,
            row: params.row
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

const shiftData = ref()

const fncAddRow = () => {
  let newData = {
    name: 'lulv',
    age: 26,
    city: 'changshu',
    shifts: new Proxy(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      {}
    ),
    showflg: true,
    row: shiftData.value.filter((x: { name: string }) => x.name === 'lulv').length + 1
  }
  shiftData.value.push(newData)
  doChangeIndexedDB(newData)
}

const fncDeleteRow = () => {
  let row = shiftData.value.find(
    (x: { row: number; name: string }) =>
      x.row == shiftData.value.filter((x: { name: string }) => x.name === 'lulv').length &&
      x.name === 'lulv'
  )
  if (row === undefined) return false
  let index = shiftData.value.indexOf(row)
  shiftData.value.splice(index, 1)
  doChangeIndexedDB(row, true)
}

const fncChangeRow = () => {
  let row = shiftData.value.find(
    (x: { row: number; name: string }) => x.row == 2 && x.name === 'liyang'
  )
  if (row === undefined) return false
  let chgData = [2, 3, 4, 5]
  for (const i of chgData) {
    row.shifts[i] = shiftTypeValue.work
  }
  doChangeIndexedDB(row)
}

const fncDoRegister = () => {
  //Insert
  let objInsert = shiftData.value.filter(
    (el: { row: number; name: string }) =>
      cData.findIndex(
        (x: { name: string; row: number }) => x.name === el.name && x.row == el.row
      ) === -1
  )

  //Delete
  let objDelete = cData.filter(
    (el: { row: number; name: string }) =>
      shiftData.value.findIndex(
        (x: { name: string; row: number }) => x.name === el.name && x.row == el.row
      ) === -1
  )

  //upData
  let objUpdata = shiftData.value.filter(
    (el: { name: string; row: number; shifts: any }) =>
      cData.findIndex(
        (x) =>
          x.name === el.name &&
          x.row === el.row &&
          JSON.stringify(x.shifts) !== JSON.stringify(el.shifts)
      ) > -1
  )

  let msg = `Insert: ${objInsert.length},\n Delete: ${objDelete.length},\n Updata: ${objUpdata.length}`
  alert(msg)
}
const drawType = ref()
const drawTypeOptions = ref([
  { label: '削除', value: shiftTypeValue.nothing },
  { label: '勤務', value: shiftTypeValue.work },
  { label: '休憩', value: shiftTypeValue.rest }
])

const targetElements = reactive<targetElementsObject>({
  name: '',
  row: -1,
  startIndex: -1,
  endIndex: -1,
  editedElementIndex: [],
  editedElement: []
})
watch(targetElements, () => {
  if (targetElements.endIndex === -1) return false

  let oriData = shiftData.value.find(
    (x: { row: number; name: string }) =>
      x.row == targetElements.row && x.name === targetElements.name
  )
  let checkDatas = shiftData.value.filter(
    (x: { row: number; name: string }) =>
      x.row < targetElements.row && x.row > 1 && x.name === targetElements.name
  )
  for (const i of targetElements.editedElementIndex) {
    let bChgFlg = true
    for (const checkData of checkDatas) {
      if (checkData.shifts[i] !== shiftTypeValue.nothing) {
        bChgFlg = false
      }
    }
    if (bChgFlg) oriData.shifts[i] = drawType.value
  }
  doChangeIndexedDB(oriData)
  targetElements.startIndex = -1
  targetElements.endIndex = -1
  targetElements.editedElementIndex = []
  targetElements.editedElement = []
})

function onMouseDown(event: MouseEvent) {
  let el = event.target as HTMLElement
  targetElements.name = el.getAttribute('keyName') as string
  targetElements.row = parseInt(el.getAttribute('rowIndex') as string)
  targetElements.startIndex = parseInt(el.getAttribute('shiftindex') as string)
  targetElements.endIndex = -1
  targetElements.editedElementIndex.push(parseInt(el.getAttribute('shiftindex') as string))

  let elements = document.getElementsByName(el.getAttribute('name') as string)
  for (const element of elements) {
    targetElements.editedElement.push([
      element.getBoundingClientRect().left,
      element.getBoundingClientRect().right,
      parseInt(element.getAttribute('shiftindex') as string)
    ])
  }
}
// function onMouseEnter(event: MouseEvent) {
//   if (targetElements.startIndex != -1) {
//     let el = event.target as HTMLElement
//     let elIndex = parseInt(el.getAttribute('shiftindex') as string)
//     let elStartIndex = elIndex > targetElements.startIndex ? targetElements.startIndex : elIndex
//     let elEndIndex = elIndex > targetElements.startIndex ? elIndex : targetElements.startIndex
//     targetElements.editedElementIndex = []
//     while (elStartIndex <= elEndIndex) {
//       targetElements.editedElementIndex.push(elStartIndex)
//       elStartIndex += 1
//     }
//   }
// }

onMounted(() => {
  shiftData.value = structuredClone(cData)
  db.shiftDraws.count().then((x) => {
    if (x > 0) {
      if (confirm('load indexedDB data?')) {
        db.shiftDraws.each((shiftDraw) => {
          let row = shiftData.value.filter(
            (el: { name: string; row: number }) =>
              el.name === shiftDraw.name && el.row === shiftDraw.row
          )
          if (row.length === 1) {
            row[0].shifts = shiftDraw.shifts
          } else {
            let newData = {
              name: shiftDraw.name,
              age: shiftDraw.age,
              city: shiftDraw.city,
              shifts: shiftDraw.shifts,
              showflg: shiftDraw.showflg,
              row: shiftDraw.row
            }
            shiftData.value.push(newData)
          }
        })
      }
    }
  })

  drawType.value = shiftTypeValue.work
  document.addEventListener('mouseup', () => {
    if (targetElements.startIndex != -1) {
      targetElements.endIndex =
        targetElements.editedElementIndex[targetElements.editedElementIndex.length - 1]
    }
  })
  document.addEventListener('mousemove', (event: MouseEvent) => {
    if (targetElements.startIndex != -1) {
      let clientX = event.clientX
      let lastElementIndex =
        targetElements.editedElementIndex[targetElements.editedElementIndex.length - 1]
      let lastElementClientLeft = targetElements.editedElement.filter(
        (x) => x[2] == lastElementIndex
      )[0][0]
      let lastElementClientRight = targetElements.editedElement.filter(
        (x) => x[2] == lastElementIndex
      )[0][1]
      if (lastElementClientLeft <= clientX && lastElementClientRight >= clientX) {
        return true
      }
      for (const el of targetElements.editedElement) {
        let clientXLeft = el[0]
        let clientXRight = el[1]
        let elIndex = el[2]
        if (clientXLeft <= clientX && clientXRight >= clientX) {
          let elStartIndex =
            elIndex > targetElements.startIndex ? targetElements.startIndex : elIndex
          let elEndIndex = elIndex > targetElements.startIndex ? elIndex : targetElements.startIndex
          targetElements.editedElementIndex = []
          while (elStartIndex <= elEndIndex) {
            targetElements.editedElementIndex.push(elStartIndex)
            elStartIndex += 1
          }
        }
      }
    }
  })
})
</script>

<template>
  <Card>
    <template #header>
      <Toolbar>
        <template #start></template>
        <template #center>
          <SelectButton
            v-model="drawType"
            :options="drawTypeOptions"
            optionLabel="label"
            optionValue="value"
            aria-labelledby="basic"
          />
        </template>
        <template #end></template>
      </Toolbar>
    </template>
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
            <span>{{ slotProps.data.name }}</span>
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
              :name="slotProps.data.name + slotProps.data.row"
              :shiftIndex="index"
              :rowIndex="slotProps.data.row"
              :keyName="slotProps.data.name"
              :class="[
                'border-solid border-1 border-y-none border-primary-100 flex-1',
                {
                  'bg-yellow-100': slotProps.data.row >= 2,
                  'bg-blue-100': slotProps.data.row === 1,
                  'bg-pink-600': shift === shiftTypeValue.work,
                  'bg-gray-600': shift === shiftTypeValue.rest,
                  'bg-red-600':
                    targetElements.editedElementIndex.indexOf(index) > -1 &&
                    targetElements.name === slotProps.data.name &&
                    targetElements.row === slotProps.data.row
                }
              ]"
              @mousedown.stop.prevent="onMouseDown"
            ></div>
          </template>
        </Column>
      </DataTable>
    </template>
    <template #footer>
      <div>
        <button class="h-3rem w-5rem m-3" @click="fncDoRegister">登録</button>
        <button class="h-3rem w-5rem m-3" @click="fncAddRow">add data</button>
        <button class="h-3rem w-5rem m-3" @click="fncDeleteRow">del data</button>
        <button class="h-3rem w-5rem m-3" @click="fncChangeRow">chg data</button>
      </div>
    </template>
  </Card>
</template>
../../Composables/db