export enum shiftTypeValue {
    nothing = 0,
    work = 1,
    rest = 2,
    editing = 3
}

export type targetElementsObject = {
    name : string,
    row : number
    startIndex : number,
    endIndex : number,
    editedElementIndex : Array<number>
}