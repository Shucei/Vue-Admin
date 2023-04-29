import layout from '@/layout/index.vue'
export default {
  path: '/user',
  component: layout,
  name: 'permissionList',
  redirect: '/user/permission',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      name: 'permissionList',
      component: () => import('@/views/permission-list/index.vue'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
