import { privateRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
export interface PermissonState {
  dynamicRoutes: RouteRecordRaw[]
}

export default {
  namespaced: true,
  state: (): PermissonState => ({
    dynamicRoutes: []
  }),
  mutations: {
    SET_ROUTES(state: PermissonState, value: RouteRecordRaw[]): void {
      state.dynamicRoutes = value
    }
  },
  actions: {
    filterRoutes({ commit }: any, menus: string[]) {
      const accessedRoutes = privateRoutes.filter((route) => {
        return menus.includes(route.name as string)
      })
      // const accessedRoutes = []
      // menus.forEach((element: any) => {
      //   accessedRoutes.push(
      //     ...privateRoutes.filter((route: any) => route.name === element)
      //   )
      // })
      accessedRoutes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      commit('SET_ROUTES', accessedRoutes)
      return accessedRoutes
    }
  }
}
