import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { MAIN_COLOR } from '@/constant'
import LocalCache from '@/utils/storage'
import { generateColors } from '@/utils/theme'

const getters: GetterTree<RootState, RootState> = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  avatar: (state) => state.user.userInfo.staffPhoto,
  cssVar: (state) => {
    return {
      ...state.theme.variables, // 根据theme中variables的值变化而响应变化
      ...generateColors(LocalCache.getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
