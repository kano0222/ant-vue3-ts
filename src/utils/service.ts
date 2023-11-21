import axios, { type AxiosInstance, type AxiosResponseHeaders, type ResponseType } from "axios"
import { message } from 'ant-design-vue'

const logout = () => {
  localStorage.clear()
  location.reload()
}
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MAIN_API,
  timeout: 50000,
  headers: {
    businessid: "1505713677968433154",
    communityId: '9d90a9a5fe789802f51d3227a214321e'
  },
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么 token
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data
    // console.log(response)
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) { logout() }
      return res
    } else {
      return res
    }
  },
  (error) => {
    console.log(error)
    if (error.response.data && error.response.data.message) {
      message.error(error.response.data.message)
      return error.response.data
    }
    const status = error.response.status
    switch (status) {
      case 400: error.message = "请求错误"; break
      case 401: logout(); break
      case 403: error.message = "拒绝访问"; break
      case 404: error.message = "请求地址出错"; break
      case 408: error.message = "请求超时"; break
      case 500: error.message = "服务器内部错误"; break
      case 501: error.message = "服务未实现"; break
      case 502: error.message = "网关错误"; break
      case 503: error.message = "服务不可用"; break
      case 504: error.message = "网关超时"; break
      case 505: error.message = "HTTP 版本不受支持"; break
      default: break
    }
    message.error(error.message)
    return Promise.reject(error)
  }
)

/** 创建请求方法 */
function createRequest(axiosService: AxiosInstance) {
  return (url: string, method: string, data?: object, headers?: AxiosResponseHeaders, responseType?: ResponseType) => {
    if (method === 'post') {
      return axiosService({
        url,
        method,
        data,
        headers,
        responseType
      })
    } else {
      return axiosService({
        url,
        method,
        params: data,
        headers
      })
    }
  }
}
export default createRequest(service)
