import { createStore } from 'vuex'
import getters from './getters'
import { RootState } from './types'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
// 创建并导出 store 实例
export default createStore<RootState>({
  modules: {
    user,
    app,
    theme
  },
  getters
})
