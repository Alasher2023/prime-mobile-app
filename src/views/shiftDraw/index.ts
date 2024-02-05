export enum shiftTypeValue {
  nothing = 0,
  work = 1,
  rest = 2,
  editing = 3
}

export type shiftDrawData = {
  name: string
  age: number
  city: string
  shifts: Array<number>
  showflg: boolean
  row: number
}

export type targetElementsObject = {
  name: string
  row: number
  startIndex: number
  endIndex: number
  editedElementIndex: Array<number>
  editedElement: Array<number[]>
}
