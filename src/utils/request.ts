import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
  showLoading?: boolean
}

class hyRequest {
  public instance: AxiosInstance
  interceptors?: HyRequestInterceptors
  showLoading: boolean //用于自定义显示loading
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
    console.log(config.showLoading)
    // 用于默认情况为显示
    this.showLoading = config.showLoading ?? true
    // 对应实例的拦截，自定义拦截内容config(作用于不同的业务比如有的要token有的可以不用)，扩展性更高
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responeseInterceptor,
      this.interceptors?.responeseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器(定义全部都需要的，比如的响应数据的解构)
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          nprogress.start()
        }
        console.log('全局请求拦截')
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        nprogress.done()
        console.log('全局响应拦截')
        return config.data
      },
      (err) => {
        nprogress.done()
        return err
      }
    )
  }

  request(config: HyRequestConfig): void {
    // 单独的拦截器
    if (config.interceptors?.requestInterceptor) {
      console.log('单独的请求拦截')
      config = config.interceptors.requestInterceptor(config as any)
    }
    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }
    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responeseInterceptor) {
          console.log('单独的响应拦截')
          res = config.interceptors.responeseInterceptor(res as any)
        }
        console.log(res)
        this.showLoading = true // 再将值设置回来，防止影响下一个请求
      })
      .catch((err) => {
        this.showLoading = true // 再将值设置回来，防止影响下一个请求
        return err
      })
  }
}

export default hyRequest.getHyRequest
