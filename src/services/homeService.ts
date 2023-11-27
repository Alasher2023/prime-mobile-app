import http from './commonApi'

class ApiService
{
    getSumDaily(comp_cd:number, shop_type_cd:number, shop_cd:number, b_day:number): Promise<any> {
        return http.get(`/api/SumDaily/GetSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day}`);
    }

    getOldSumDaily(comp_cd:number, shop_type_cd:number, shop_cd:number, b_day:number, type:number): Promise<any> {
        return http.get(`/api/SumDaily/GetOldSumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day},${type}`);
    }

    getAmtPlan(comp_cd:number, shop_type_cd:number, shop_cd:number, b_day:number): Promise<any> {
        return http.get(`/api/SumDaily/GetAmtPlan/${comp_cd},${shop_type_cd},${shop_cd},${b_day}`);
    }
}

export default new ApiService();