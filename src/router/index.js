import Vue from 'vue'
import Router from 'vue-router'
import home from './home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/user/login',
      component: () => import('../view/login/login')
    },
    {
      path: '/user/register',
      component: () => import('../view/login/reg')
    },
    {
      path: '/',
      component: () => import('../view/home/index'),
      children: [
        ...home,
      ]
    }
  ]
})

export default router
