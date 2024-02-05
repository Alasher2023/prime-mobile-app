export interface baseDataInterface {
  label: string
  value: number
}

export interface tableDataInterface extends baseDataInterface {
  qty: number
  total: number
  percent: string
}

export type searchInfoObject = {
  comp_cd: number
  shop_type_cd: number
  shop_cd: number
  b_day: number | string
  type: number
}

export type SalesInfoInterface = {
  Sales: number | string
  TaxNormal: number | string
  TaxReduced: number | string
  TupleNum: number | string
  TuplePrice: number | string
  GuestNum: number | string
  GuestPrice: number | string
  BudgetRatiosPercent: number | string
  BudgetRatiosPrice: number | string
  MonthRatiosPercent: number | string
  MonthRatiosPrice: number | string
  YearRatiosPercent: number | string
  YearRatiosPrice: number | string
}

export type datatableObject = {
  name: string
  qty: number
  price: number
}
