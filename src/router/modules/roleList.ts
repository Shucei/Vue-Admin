import layout from '@/layout/index.vue'
export default {
  path: '/user',
  component: layout,
  name: 'roleList',
  redirect: '/user/role',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      name: 'roleList',
      component: () => import('@/views/RoleList/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
