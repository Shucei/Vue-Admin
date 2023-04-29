import layout from '@/layout/index.vue'
export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      name: 'articleRanking',
      component: () => import('@/views/article-ranking/index.vue'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      component: () => import('@/views/article-detail/index.vue'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
