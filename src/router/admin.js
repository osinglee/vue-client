export default [
  {
    path: '/admin',
    component: () => import('../packages/ui/container'),
    children: [
      {
        path: '/',
        name: 'admin',
        component: () => import('../view/admin/home/home')
      },
      {
        path: 'payment',
        name: 'payment',
        component: () => import('../view/admin/home/payment')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../view/admin/home/about')
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('../view/admin/home/editor')
      },
      {
        path: 'new-vuex',
        name: 'new-vuex',
        component: () => import('../view/admin/new-vuex')
      }, {
        path: 'new2',
        name: 'new2',
        component: () => import('../view/admin/new2')
      }
    ]
  }
]
