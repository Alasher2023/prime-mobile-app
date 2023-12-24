import apiClient from '@/Composables/request'
import { type searchInfoObject } from '@/views/home'

enum OldSumDailyType {
  'Month' = '1',
  'Year' = '2'
}

//DataShow
export const GetDataShow = async (params: searchInfoObject) => {
  return await apiClient.get(`/api/SumDaily/GetDataShow/${params.comp_cd},${params.shop_type_cd},${params.shop_cd},${params.b_day},${params.type}`)
}

// DataTable & Chart
//1時間帯別売上・客数
export const GetDataTableSalesAndGuests =async (params:searchInfoObject) => {
    return await apiClient.get(`/api/SumDaily/GetSalesAndGuests/${params.comp_cd},${params.shop_type_cd},${params.shop_cd},${params.b_day},${params.type}`)
}

// 部門別
export const GetDataTableDepartmental =async (params:searchInfoObject) => {
    return await apiClient.get(`/api/SumDaily/GetDepartmental/${params.comp_cd},${params.shop_type_cd},${params.shop_cd},${params.b_day},${params.type}`)
}

// グループ別
export const GetDataTableGroup =async (params:searchInfoObject) => {
    return await apiClient.get(`/api/SumDaily/GetGroup/${params.comp_cd},${params.shop_type_cd},${params.shop_cd},${params.b_day},${params.type}`)
}

// 客層別
export const GetDataTableCustomerSegment =async (params:searchInfoObject) => {
    return await apiClient.get(`/api/SumDaily/GetCustomerSegment/${params.comp_cd},${params.shop_type_cd},${params.shop_cd},${params.b_day},${params.type}`)
}

// 客数別
export const GetDataTableNumberOfGuests =async (params:searchInfoObject) => {
    return await apiClient.get(`/api/SumDaily/GetNumberOfGuests/${params.comp_cd},${params.shop_type_cd},${params.shop_cd},${params.b_day},${params.type}`)
}
