import apiClient from "@/Composables/request"

enum OldSumDailyType {
    "Month" = "0",
    "Year" = "1"
}


// 导出一个异步函数，用于获取数据
export async function getData(comp_cd: number, shop_type_cd: number, shop_cd: number, b_day: number) {
    
    try {

        const sumDaily = () => {
            return apiClient.get(`/api/SumDaily/GetSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day}`)
        }
    
        const oldSumDailyMonth = (type: OldSumDailyType = OldSumDailyType.Month) => {
            return apiClient.get(`/api/SumDaily/GetOldSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${type}`)
        }
    
        const oldSumDailyYear = (type: OldSumDailyType= OldSumDailyType.Year) => {
            return apiClient.get(`/api/SumDaily/GetOldSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${type}`)
        }
    
        const amtPlan = () => {
            return apiClient.get(`/api/SumDaily/GetAmtPlan/${comp_cd},${shop_type_cd},${shop_cd},${b_day}`)
        }

        // 定义一个空数组，用于存储多个异步请求的返回值
        let data: any[] = []

        // 并行执行多个异步请求
        await Promise.all([
            // 并行执行多个异步请求
            sumDaily(),
            oldSumDailyMonth(),
            oldSumDailyYear(),
            amtPlan()
        ])
        .then(res => {
            // 将多个异步请求的返回值，存储到数组中
            data = res
        })
        .catch(err => {
            throw new Error(err);
        })

        return data
        
    } catch (error) {
        //接受到一个错误时停止promise.all的执行
        console.log(error)
    }

}