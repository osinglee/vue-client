// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import ElementUI from 'element-ui'
import * as filters from './tools/filter'
import './assets/icon/iconfont.css'
import './assets/styles/index.scss'
import './assets/icon/iconfont.js'
import './permission'

Vue.use(ElementUI, {
  size: 'medium',
});

/** 注册管道 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = false; // 生产提示关闭

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
