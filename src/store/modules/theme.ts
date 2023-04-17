import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant/index'
import LocalCache from '@/utils/storage'
import variables from '@/styles/variables.module.scss'

export interface ThemeState {
  mainColor: any
  variables: any
}

export default {
  namespaced: true,
  state: (): ThemeState => ({
    mainColor: LocalCache.getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state: ThemeState, newColor: string) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      LocalCache.setItem(MAIN_COLOR, newColor)
    }
  },
  actions: {}
}
