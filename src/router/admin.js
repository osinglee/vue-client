export default [
  {
    path: '/admin',
    component: () => import('../packages/ui/container'),
    children: [
      {
        path: '/',
        name: 'admin',
        component: () => import('../view/login/index.vue')
      },
    ]
  }
]
