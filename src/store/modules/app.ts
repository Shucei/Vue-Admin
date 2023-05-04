import { TAGS_VIEW } from '@/constant'
import LocalCache from '@/utils/storage'

export interface AppState {
  sidebarOpened: boolean
  language: string
  tagsViewList: any[]
}

export default {
  namespaced: true,
  state: (): AppState => ({
    sidebarOpened: true,
    language: LocalCache.getItem('lang') || 'zh',
    tagsViewList: LocalCache.getItem(TAGS_VIEW) || []
  }),
  mutations: {
    /**
     * 侧边栏伸缩变量控制
     */
    triggerSidebarOpened(state: AppState) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 设置国际化
     */
    setLanguage(state: AppState, lang: string) {
      LocalCache.setItem('lang', lang)
      state.language = lang
    },
    /**
     * 进入新的路由添加tag不能重复
     */
    addTagsViewlist(state: AppState, tag: any) {
      const isfind = state.tagsViewList.some((item) => item.path === tag.path)
      // 重复就不需要添加进入
      if (!isfind) {
        state.tagsViewList.push(tag)
        LocalCache.setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(
      state: AppState,
      { index, tag }: { index: number; tag: any }
    ) {
      state.tagsViewList[index] = tag
      LocalCache.setItem(TAGS_VIEW, state.tagsViewList)
    },

    /**
     * 删除tag栏
     * @param {*} state
     * @param {*} payload
     * @returns
     */
    removeTagsView(state: AppState, payload: { type: string; index: number }) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      LocalCache.setItem(TAGS_VIEW, state.tagsViewList)
    },
    resetTagsView(state: AppState) {
      state.tagsViewList = []
    }
  },
  actions: {}
}
