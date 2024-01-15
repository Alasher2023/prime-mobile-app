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
  Sales: Number | String
  TaxNormal: Number | String
  TaxReduced: Number | String
  TupleNum: Number | String
  TuplePrice: Number | String
  GuestNum: Number | String
  GuestPrice: Number | String
  BudgetRatiosPercent: Number | String
  BudgetRatiosPrice: Number | String
  MonthRatiosPercent: Number | String
  MonthRatiosPrice: Number | String
  YearRatiosPercent: Number | String
  YearRatiosPrice: Number | String
}
