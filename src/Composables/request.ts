import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // if (error.response.status === 401) {
    //     localStorage.removeItem("token");
    //     window.location.href = "/login";
    // }

    switch (error.response.status) {
      case 500:
        //接口错误
        break
      case 401:
        //未登录
        console.log('未登录')
        break
      case 403:
        console.log('无权限')
        //无权限
        break
      case 404:
        console.log('接口不存在')
        //接口不存在
        break
      default:
        console.log('未知错误')
        break
    }

    return Promise.reject(error)
  }
)

export default apiClient
