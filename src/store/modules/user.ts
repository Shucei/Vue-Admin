import { Module } from 'vuex'
import { getUserInfoById, login as submitLogin } from '@/api/user'
import LocalCache from '@/utils/storage'
import { resetRouter } from '@/router'

export interface IRootState {
  token: string
  userInfo: any
}
const LoginUser: Module<IRootState, any> = {
  namespaced: true,
  state: () => ({
    token: LocalCache.getItem('token') || '', // 设置token为共享状态
    userInfo: {}
  }),
  mutations: {
    setToken(state, data) {
      state.token = data
      LocalCache.setItem('token', data)
    },
    setUserInfo(state, userInfo) {
      LocalCache.setItem('userInfo', userInfo)
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求
     * @param {*} context
     * @param {*} userInfo
     * @returns
     */
    async login(context, userInfo) {
      const { username, password } = userInfo
      const { data } = await submitLogin({
        username,
        password
      })

      context.commit('setToken', data.token)
      const curTime = Date.now()
      LocalCache.setItem('loginTime', curTime)
    },
    async getUserInfo(context) {
      const { data } = await getUserInfoById()
      const baseResult = data
      context.commit('setUserInfo', baseResult)
      return baseResult
    },
    logout(context) {
      context.commit('setToken', '')
      resetRouter()
      context.commit('setUserInfo', {})
    }
  }
}

export default LoginUser
