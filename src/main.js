import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http/request'

// 移动端适配
import 'amfe-flexible'
// 解决移动端300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
