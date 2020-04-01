import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/1',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // TODO 路由页面设置to.meta.requireAuth参数这里判断是否登录页
  const flag = true
  if (flag) {
    // 判断该路由是否需要登录权限
    next()
  } else {
    next({
      name: 'login'
    })
  }
})

export default router
