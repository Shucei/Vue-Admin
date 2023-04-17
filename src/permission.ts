import router from './router'
import store from './store'
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
            await store.dispatch('user/getUserInfo')
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
