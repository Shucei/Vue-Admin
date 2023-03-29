import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant/index'
import LocalCache from '@/utils/storage'
import variables from '@/styles/variables.module.scss'
export default {
  namespaced: true,
  state: () => ({
    mainColor: LocalCache.getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor (state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      LocalCache.setItem(MAIN_COLOR, newColor)
    }
  },
  actions: {}
}
