import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '@/views/DashBoard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      keepAlive: true
    },
    component: DashBoard
  },
  {
    // 根页面
    path: '/dashboard',
    name: 'DashBoard',
    meta: {
      keepAlive: true
    },
    component: DashBoard,
    children: [
      {
        path: '/dashboard',
        redirect: '/dashboard/home'
      },
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/home/Home'),
        meta: {
          title: '首页'
        }
      },
      {
        // 收藏课程
        path: 'favorite',
        name: 'Favorite',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/favorite/Favorite'),
        meta: {
          title: '收藏课程'
        }
      },
      {
        // 我的学习
        path: 'learn',
        name: 'Learn',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/learn/Learn'),
        meta: {
          title: '我的学习'
        }
      },
      {
        // 我的
        path: 'mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/mine/Mine'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login')
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
