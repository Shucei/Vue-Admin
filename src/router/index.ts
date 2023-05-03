import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import articleCreate from './modules/articleCreate'
import articleRanking from './modules/articleRanking'
import permissionList from './modules/permissionList'
import roleList from './modules/roleList'
import userManage from './modules/userManage'
import layout from '@/layout/index.vue'
import store from '@/store'
/**
 * 私有路由表
 */

export const privateRoutes: RouteRecordRaw[] = [
  articleCreate,
  articleRanking,
  permissionList,
  roleList,
  userManage
]

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/home', //重定向
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'home',
          icon: 'home'
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'individual'
        }
      }
    ]
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   // redirect: '/profile',
  //   component: layout,
  //   children: [
  //     {
  //       path: '/profile',
  //       name: 'profile',
  //       component: () => import('@/views/profile/index.vue'),
  //       meta: {
  //         title: 'profile',
  //         icon: 'individual'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "error-page" */ '@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

// 重置路由
export function resetRouter() {
  if (store.getters.userInfo && store.getters.userInfo.role.menus) {
    const menus = store.getters.userInfo.role.menus
    menus.forEach((element: any) => {
      router.hasRoute(element) && router.removeRoute(element) // 删除路由
    })
    router.push('/')
  }
}

export default router
