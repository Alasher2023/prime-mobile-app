import http from './commonApi'

class ApiService
{
    getSumDaily(comp_cd:number, shop_type_cd:number, shop_cd:number, b_day:number): Promise<any> {
        return http.get(`/api/SumDaily/${comp_cd},${shop_type_cd},${shop_cd},${b_day}`);
    }
}

export default new ApiService();