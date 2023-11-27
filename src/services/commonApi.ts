import  axios, {type AxiosInstance} from "axios"

const apiClient: AxiosInstance = axios.create({
    // APIのURI
    baseURL: "http://localhost:5173/api",
    // リクエストヘッダ
    headers: {
      "Content-type": "application/json",
    },
  });
  
  export default apiClient

