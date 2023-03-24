import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

// 拦截器
interface HyRequestInterceptors {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responeseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responeseInterceptorCatch?: (error: any) => any
}
// 继承AxiosRequestConfig
interface HyRequestConfig extends AxiosRequestConfig {
  interceptors?: HyRequestInterceptors
}

class hyRequest {
  public instance: AxiosInstance
  interceptors?: HyRequestInterceptors
  static getHyRequest = new hyRequest({
    baseURL: process.env.VUE_APP_SERVICE_URL,
    timeout: parseInt(process.env.VUE_APP_BASE_TIME_OUT as string),
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求成功拦截')
        return config
      },
      requestInterceptorCatch: (err) => {
        console.log('请求失败拦截')
        return err
      },
      responeseInterceptor: (res) => {
        console.log('响应成功拦截')
        return res
      },
      responeseInterceptorCatch: (err) => {
        console.log('响应失败拦截')
        return err
      }
    }
  })
  constructor(config: HyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 自定义拦截内容，扩展性更高
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responeseInterceptor,
      this.interceptors?.responeseInterceptorCatch
    )
  }
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default hyRequest.getHyRequest
