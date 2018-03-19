import Vue from 'vue'
import Router from 'vue-router'
import home from './home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../view/login/reg')
    },
    {
      path: '',
      component: () => import('../packages/ui/container'),
      children: [
        ...home,
      ]
    }
  ]
})

export default router
