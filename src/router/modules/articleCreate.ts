import layout from '@/layout/index.vue'
export default {
  path: '/article',
  component: layout,
  redirect: '/article/create',
  name: 'articleCreate',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      name: 'articleCreate',
      component: () => import('@/views/article-create/index.vue'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    }
  ]
}
