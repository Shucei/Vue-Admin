import {
  getUserInfo as getUser,
  login as submitLogin,
  getUserDetailByIdApi
} from '@/api/user.js'
// import md5 from 'md5'
// md5(password)
import LocalCache from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    token: LocalCache.getItem('token') || '', // 设置token为共享状态
    userInfo: {}
  }),
  mutations: {
    setToken (state, data) {
      state.token = data
      LocalCache.setItem('token', data)
    },
    setUserInfo (state, userInfo) {
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
    async login (context, userInfo) {
      const { username, password } = userInfo
      const data = await submitLogin({
        mobile: username,
        password
      })
      context.commit('setToken', data)
      const curTime = Date.now()
      LocalCache.setItem('loginTime', curTime)
    },
    async getUserInfo (context) {
      const result = await getUser()
      // 通过得到的用户基本资料得到id，发送一个得到员工基本信息的请求
      const baseInfo = await getUserDetailByIdApi(result.userId)
      // 将员工的基本信息和用户基本资料合并
      const baseResult = { ...result, ...baseInfo }
      context.commit('setUserInfo', baseResult)
      return baseResult
    },
    logout (context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
