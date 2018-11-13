// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import ElementUI from 'element-ui'
import * as filters from './tools/filter'
import './assets/icon/iconfont.css'
import './styles/index.scss'
import './permission'

Vue.use(ElementUI, {
  size: 'small',
});

/** 注册管道 */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

/** 生产提示关闭 */
Vue.config.productionTip = false;

new Vue({
  el: '#example',
  router,
  store,
  template: '<App/>',
  components: {App}
});
