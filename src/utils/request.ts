import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import router from '@/router'
import { ElMessage } from 'element-plus'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

// 拦截器
interface HyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responeseInterceptor?: (config: T) => T
  responeseInterceptorCatch?: (error: any) => any
}
// 继承AxiosRequestConfig
interface HyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HyRequestInterceptors<T>
  showLoading?: boolean
}

class hyRequest {
  public instance: AxiosInstance
  interceptors?: HyRequestInterceptors
  showLoading: boolean //用于自定义显示loading
  static getHyRequest = new hyRequest({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: parseInt(process.env.VUE_APP_BASE_TIME_OUT as string)
    // interceptors: {
    //   requestInterceptor: (config) => {
    //     console.log('实例请求成功拦截')
    //     return config
    //   },
    //   requestInterceptorCatch: (err) => {
    //     console.log('实例请求失败拦截')
    //     return err
    //   },
    //   responeseInterceptor: (res) => {
    //     console.log('实例响应成功拦截')
    //     return res
    //   },
    //   responeseInterceptorCatch: (err) => {
    //     console.log('实例响应失败拦截')
    //     return err
    //   }
    // }
  })
  constructor(config: HyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 用于默认情况为显示,为null或者undefined返回??后面
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
        const token = store.getters.token
        if (token) {
          config.headers.Authorization = 'Bearer ' + token
          // token过期处理，主动处理
          const newTime = Date.now()
          const curTime = localStorage.getItem('loginTime') as any
          if (newTime - curTime > 100000) {
            store.dispatch('user/logout')
            router.push('/login')
            nprogress.done()
            return Promise.reject(new Error('账号过期，请重新登录'))
          } else {
            // 续期，若在n秒内没有任何操作就过期，若操作了就重新赋个时间戳，保持时间的更新
            localStorage.setItem('loginTime', JSON.stringify(Date.now()))
          }
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        nprogress.done()
        const { status, message, data } = config.data
        if (status >= 200 && status < 400) {
          ElMessage({
            message: message,
            type: 'success',
            duration: 1500
          })
        } else {
          ElMessage.error(message)
          return Promise.reject(new Error())
        }
        return data
      },
      (err) => {
        nprogress.done()
        // 判断后端token过期日期，被动处理token过期
        // console.log(err)
        // if (err.response && err.response.data.status === 401) {
        //   // 当等于10002的时候 表示 后端告诉我token超时了
        //   store.dispatch('user/logout') // 登出action 删除token
        //   router.push('/login')
        //   ElMessage({
        //     message: '账号过期，请重新登录',
        //     type: 'error',
        //     duration: 2000
        //   })
        // } else {
        //   ElMessage.error(err.message) // 提示错误信息
        // }
        return err
      }
    )
  }

  request<T>(config: HyRequestConfig<T>): Promise<T> {
    // 返回一个Promise对象，将得到的请求结果返回出去
    return new Promise((resolve, reject) => {
      // 单独的拦截器
      if (config.interceptors?.requestInterceptor) {
        console.log('单独的请求拦截')
        config = config.interceptors.requestInterceptor(config as any)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responeseInterceptor) {
            console.log('单独的响应拦截')
            res = config.interceptors.responeseInterceptor(res)
          }
          this.showLoading = true // 再将值设置回来，防止影响下一个请求
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true // 再将值设置回来，防止影响下一个请求
          reject(err)
        })
    })
  }

  get<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default hyRequest.getHyRequest
