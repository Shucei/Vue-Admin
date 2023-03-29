import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
/**
 * 私有路由表
 */
// const privateRoutes = [
//   {
//     path: '/user',
//     component: layout,
//     redirect: '/user/manage',
//     meta: {
//       title: 'user',
//       icon: 'personnel'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         component: () => import('@/views/user-manage/index'),
//         meta: {
//           title: 'userManage',
//           icon: 'personnel-manage'
//         }
//       },
//       {
//         path: '/user/role',
//         component: () => import('@/views/role-list/index'),
//         meta: {
//           title: 'roleList',
//           icon: 'role'
//         }
//       },
//       {
//         path: '/user/permission',
//         component: () => import('@/views/permission-list/index'),
//         meta: {
//           title: 'permissionList',
//           icon: 'permission'
//         }
//       },
//       {
//         path: '/user/info/:id',
//         name: 'userInfo',
//         component: () => import('@/views/user-info/index'),
//         props: true,
//         meta: {
//           title: 'userInfo'
//         }
//       },
//       {
//         path: '/user/import',
//         name: 'import',
//         component: () => import('@/views/import/index'),
//         meta: {
//           title: 'excelImport'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     component: layout,
//     redirect: '/article/ranking',
//     meta: {
//       title: 'article',
//       icon: 'article'
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         component: () => import('@/views/article-ranking/index'),
//         meta: {
//           title: 'articleRanking',
//           icon: 'article-ranking'
//         }
//       },
//       {
//         path: '/article/:id',
//         component: () => import('@/views/article-detail/index'),
//         meta: {
//           title: 'articleDetail'
//         }
//       },
//       {
//         path: '/article/create',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleCreate',
//           icon: 'article-create'
//         }
//       },
//       {
//         path: '/article/editor/:id',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleEditor'
//         }
//       }
//     ]
//   }
// ]

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  // {
  //   path: '/',
  //   redirect: '/home', //重定向
  //   component: layout,
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: () => import('@/views/home/index.vue'),
  //       meta: {
  //         title: 'home',
  //         icon: 'home'
  //       }
  //     },
  //     {
  //       path: '/profile',
  //       name: 'profile',
  //       component: () => import('@/views/profile/index.vue'),
  //       meta: {
  //         title: 'profile',
  //         icon: 'individual'
  //       }
  //     },
  //     {
  //       path: '/401',
  //       name: '401',
  //       component: () => import('@/views/error-page/401.vue')
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  }
]

const routes: Array<RouteRecordRaw> = [...publicRoutes]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
