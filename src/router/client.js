export default [
  {
    path: '/',
    component: () => import('../packages/ui/client-ui'),
    children: [
      {
        path: '/',
        name: 'mh0101',
        component: () => import('../view/client/mh0101')
      }, {
        path: 'mh0102',
        name: 'mh0102',
        component: () => import('../view/client/mh0102')
      },
    ]
  }
]
