import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 移动端适配
import 'amfe-flexible'
// 解决移动端300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
