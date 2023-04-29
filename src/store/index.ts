import { createStore } from 'vuex'
import { RootState } from './types'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import permission from './modules/permission'
import getters from './getters'

// 创建并导出 store 实例
export default createStore<RootState>({
  modules: {
    user,
    app,
    theme,
    permission
  },
  getters
})
