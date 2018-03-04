// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import { Row, Col, DatePicker, Form, FormItem, Input, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.scss'

Vue.prototype.$ELEMENT = {size: 'mini'}

Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

Vue.config.productionTip = false // 生产提示关闭
// Vue.prototype.router = router;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
