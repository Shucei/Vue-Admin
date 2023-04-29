import layout from '@/layout/index.vue'
export default {
  path: '/user',
  component: layout,
  name: 'userManagement',
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      name: 'userManage',
      component: () => import('@/views/user-manage/index.vue'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index.vue'),
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'import',
      component: () => import('@/views/import/index.vue'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
