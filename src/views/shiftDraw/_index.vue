<script setup lang="ts">
import { ref } from 'vue';

const drawType = ref(0)

const shiftData = ref([
  {
    name: 'liyang',
    age: 36,
    city: 'shanghai',
    shifts: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    row: 1
  },
  {
    name: 'liyang',
    age: 36,
    city: 'shanghai',
    shifts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    row: 2
  },
  {
    name: 'liyang',
    age: 36,
    city: 'shanghai',
    shifts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    row: 3
  }
])

var arrShiftChg: (string | null)[] = []
var recordFlg = false
function onMouseDown(event:MouseEvent) {
  recordFlg = !recordFlg
  arrShiftChg = []
  let shiftIndex = (event.target as HTMLElement).getAttribute('shiftindex')
  arrShiftChg.push(shiftIndex)
}

function onMouseMove(event:MouseEvent) {
  if (!recordFlg) return
  let shiftIndex = (event.target as HTMLElement).getAttribute('shiftindex')
  if (arrShiftChg.indexOf(shiftIndex) > -1){
    // do nothing
  }else{
    arrShiftChg.push(shiftIndex)
  }
}

function onMouseUp(event:MouseEvent) {
  recordFlg = !recordFlg
  let shiftIndex = (event.target as HTMLElement).getAttribute('shiftindex')
  if (arrShiftChg.indexOf(shiftIndex) > -1){
    // do nothing
  }else{
    arrShiftChg.push(shiftIndex)
  }
  console.log(arrShiftChg)
  let shiftRow = (event.target as HTMLElement).getAttribute('rowIndex')
  let sData = shiftData.value.find(x => x.row == shiftRow)
  arrShiftChg.forEach(x => {
    sData.shifts[x] = drawType.value
  })
  
}

</script>

<template>
  <div class="flex flex-row p-3 m-3">
    <div class="flex flex-column bg-yellow-100" style="width: 180px">
      <div class="h-1rem">liyang</div>
      <div class="h-1rem">36</div>
      <div class="h-1rem">shanghai</div>
    </div>
    <div class="flex flex-column bg-blue-100" style="width: 580px">
      <div>
        <div
          v-for="item in shiftData"
          :key="item.name"
          class="flex flex-row border-1 border-solid border-primary-100"
        >
          <div
            v-for="(shift, index) in item.shifts"
            :key="index"
            :shiftIndex = "index"
            :rowIndex = "item.row"
            :class="['border-solid border-1 border-y-none border-primary-100 flex-1 h-1rem',
            {'bg-blue-100' : shift === 1, 'bg-gray-100' : shift === 2, 'bg-yellow-100' : shift === 0}]"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
          >
        {{ shift.toString() }}
        </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button class="h-3rem w-3rem" @click="() => drawType = 1">1</button>
    <button class="h-3rem w-3rem" @click="() => drawType = 2">2</button>
    <button class="h-3rem w-3rem" @click="() => drawType = 0">0</button>
  </div>
</template>
