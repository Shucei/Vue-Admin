import { Module } from 'vuex'
import {
  getUserInfo as getUser,
  login as submitLogin,
  getUserDetailByIdApi
} from '@/api/user'
// import md5 from 'md5'
// md5(password)
import LocalCache from '@/utils/storage'
interface IRootState {
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
      const data = await submitLogin({
        username,
        password
      })
      console.log('data', data)

      context.commit('setToken', data)
      const curTime = Date.now()
      LocalCache.setItem('loginTime', curTime)
    },
    async getUserInfo(context) {
      const result: any = await getUser()
      // 将员工的基本信息和用户基本资料合并
      const baseResult = result
      context.commit('setUserInfo', baseResult)
      return baseResult
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}

export default LoginUser
