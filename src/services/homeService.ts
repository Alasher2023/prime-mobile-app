import apiClient from "@/Composables/request"

enum OldSumDailyType {
    "Month" = "1",
    "Year" = "2"
}

// 导出一个异步函数，用于获取数据
export async function getData(comp_cd: number, shop_type_cd: number, shop_cd: number, b_day: number, r_type: number) {
    
    let data: any[] = []

    try {

        const Apis = [
            `/api/SumDaily/GetSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type}`,
            `/api/SumDaily/GetOldSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type},${OldSumDailyType.Month}`,
            `/api/SumDaily/GetOldSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type},${OldSumDailyType.Year}`,
            `/api/SumDaily/GetAmtPlan/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${r_type}`
        ]

        await Promise.all(Apis.map(Api => apiClient.get(Api)))
        .then(res => data = res)
        .catch(err => console.error(err))
        
    } catch (error) {
        //接受到一个错误时停止promise.all的执行
        console.log(error)
    }

    return data
}