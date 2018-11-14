import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {store} from './store'
import {db} from './tools/db'

NProgress.configure({showSpinner: false}); // NProgress Configuration

/** 路由控制 */
router.beforeEach(async(to, from, next) => {
  /** 判断用户是否已经登录 */
  if (db.get('user.login')) {
    /** 已经登录情况下访问 /login, 则直接进入 /admin */
    if (to.path === '/login') {
      next();
    } else {
      // if (store.getters.permission.length === 0) {
      //   /** 获取当前权限菜单加入到路由中 */
      //   try {
      //     await store.dispatch('accountGetPermission');
      //     await store.dispatch('GetRouters', store.getters.permission);
      //     router.addRoutes(store.getters.addRouters.concat([{path: '*', redirect: '/404'}]));
      //     next({...to, replace: true}); // *** 后面不可再出现代码。否则会重复执行此函数 ***
      //   } catch (e) {
      //     await store.dispatch('accountLogoutSubmit');
      //     next({path: '/'})
      //   }
      // } else {
      //
      // }
      next()
    }
  } else {
    if (noPermission(to.path)) {
      console.log(to.path);
      next();
    } else {
      console.log(1);
      next('/login');
    }
  }
});

function noPermission(path) {
  return ['/404', '/login', '/index'].indexOf(path) > -1
}

router.afterEach(() => {
  NProgress.done()
});
