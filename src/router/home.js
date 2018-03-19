export default [
  {
    path: '/',
    name: '／',
    component: () => import('../view/home/home')
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('../view/home/payment')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../view/home/about')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('../view/home/editor')
  },
  {
    path: '/new-vuex',
    name: 'new-vuex',
    component: () => import('../view/new-vuex')
  }, {
    path: '/new2',
    name: 'new2',
    component: () => import('../view/new2')
  }
]
