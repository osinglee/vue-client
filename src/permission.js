import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {store} from './store'
import {Msg} from './tools/message';

NProgress.configure({showSpinner: false}); // NProgress Configuration

/** 路由控制 */
router.beforeEach((to, from, next) => {
  /** 判断访问的是前台还是后台 */
  const isAdmin = /\/admin/.test(to.path);
  /** 判断用户是否已经登录 */
  const {isLogin, userInfo} = store.getters;
  if (isAdmin) NProgress.start();
  if (isLogin) {
    /** 已经登录情况下访问 /login, 则直接进入 /admin */
    if (to.path === '/login') {
      next({path: '/admin'});
      NProgress.done()
    } else {
      console.error(userInfo);
      /* eslint-disable no-constant-condition */
      if ('判断访问权限') {
        next() // store.getters.roles, to.meta.roles
      } else {
        next({path: '/404', replace: true, query: {noGoBack: true}})
      }
    }
  } else {
    if (!isAdmin) {
      /** 浏览门户前台页面 */
      next()
    } else {
      next('/login');
      NProgress.done();
      Msg.error('检测到您当前未登录，请先登录');
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
