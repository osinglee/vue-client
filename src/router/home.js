export default [
  {
    path: '/',
    component: () => import('../view/home/home')
  },
  {
    path: '/payment',
    component: () => import('../view/home/payment')
  },
  {
    path: '/about',
    component: () => import('../view/home/about')
  }
]
