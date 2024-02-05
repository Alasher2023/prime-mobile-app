// db.ts
import Dexie, { type Table } from 'dexie';

export interface shiftDraw {
  name: string,
  age: number,
  city: string,
  shifts: Array<number>,
  showflg: boolean,
  row: number
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  shiftDraws!: Table<shiftDraw>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
        shiftDraws: '[name+row], age, city, shifts, showflg' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();