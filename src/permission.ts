import router from './router'
import store from './store'
import { RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> => {
    if (store.getters.token) {
      if (to.path === '/login') {
        next('/')
      } else {
        if (!store.getters.hasUserInfo) {
          try {
            const { role } = await store.dispatch('user/getUserInfo')
            const newRoutes = await store.dispatch(
              'permission/filterRoutes',
              role.menus
            )
            newRoutes.forEach((element: any) => {
              router.addRoute(element)
            })
            return next(to.path)
          } catch (error) {
            console.error('Failed to get user info:', error)
          }
        }
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) > -1) {
        next()
      } else {
        next('/login')
      }
    }
  }
)
