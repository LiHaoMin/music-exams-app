import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http/request'

// 移动端适配
import 'amfe-flexible'
import FastClick from 'fastclick'
import { Toast, Lazyload } from 'vant'

// 解决移动端300毫秒延迟
FastClick.attach(document.body)
Vue.use(Toast)
Vue.use(Lazyload)
Toast.setDefaultOptions({
  position: 'bottom',
  duration: 2000
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
