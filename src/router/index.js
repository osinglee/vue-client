import Vue from 'vue'
import Router from 'vue-router'
import admin from './admin'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../packages/ui/errorPage/404.vue')
    },
    {
      path: '*',
      name: 'err',
      redirect: '404',
    },
    ...admin,
  ],
  scrollBehavior: () => ({y: 0}),
});

export default router
