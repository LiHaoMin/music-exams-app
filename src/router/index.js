import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '@/views/DashBoard'
import store from '../store'

// 解决多次点击重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      keepAlive: true
    }
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
        redirect: '/dashboard/home',
        meta: {
          keepAlive: true
        }
      },
      {
        // 首页
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/home/Home'),
        meta: {
          title: '首页',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        // 收藏课程
        path: 'favorite',
        name: 'Favorite',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/favorite/Favorite'),
        meta: {
          title: '收藏课程',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        // 我的学习
        path: 'learn',
        name: 'Learn',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/learn/Learn'),
        meta: {
          title: '我的学习',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        // 我的
        path: 'mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/mine/Mine'),
        meta: {
          title: '我的',
          keepAlive: true,
          requireAuth: true
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
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      title: '首页',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "search" */ '@/views/home/search/Search')
  },
  {
    path: '/classroom/:classroomType',
    name: 'Classroom',
    meta: {
      title: '导师博讲堂',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "classroom" */ '@/views/home/classroom/Classroom')
  },
  {
    path: '/offline-course/:offlineCourseType',
    name: 'OfflineCourse',
    meta: {
      title: '音乐考研',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "OfflineCourse" */ '@/views/home/offline-course/OfflineCourse')
  },
  {
    path: '/offline-course/detail/:id',
    name: 'OfflineCourseDetail',
    meta: {
      title: '实体课',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "OfflineCourse" */ '@/views/home/offline-course/OfflineCourseDetail')
  },
  {
    path: '/offline-course/apply/:id',
    name: 'OfflineCourseApply',
    meta: {
      title: '报名信息填写',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "OfflineCourse" */ '@/views/home/offline-course/OfflineCourseApply')
  },
  {
    path: '/course/detail/:id',
    name: 'CourseDetail',
    meta: {
      title: '课程',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "OfflineCourse" */ '@/views/home/course/CourseDetail')
  },
  {
    path: '/mine/purchase-history',
    name: 'PurchaseHistory',
    meta: {
      title: '购买记录',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/purchase-history/PurchaseHistory')
  },
  {
    path: '/mine/info',
    name: 'Info',
    meta: {
      title: '个人信息',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/info/Info')
  },
  {
    path: '/mine/info/edit',
    name: 'InfoEdit',
    meta: {
      title: '修改昵称',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/info/InfoEdit')
  },
  {
    path: '/mine/help',
    name: 'Help',
    meta: {
      title: '帮助手册',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/help/Help')
  },
  {
    path: '/mine/join/teacher',
    name: 'JoinTeacher',
    meta: {
      title: '成为讲师',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/join/JoinTeacher')
  },
  {
    path: '/mine/join/func',
    name: 'TeacherFunc',
    meta: {
      title: '讲师功能',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/join/TeacherFunc')
  },
  {
    path: '/mine/chat',
    name: 'Chat',
    meta: {
      title: '机器人客服',
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/chat/Chat')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 解决路由跳转页面没有置顶
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

// 路由拦截
router.beforeEach((to, from, next) => {
  let title = ''
  if (to.meta.title) title = to.meta.title
  var list = ['导师博讲堂', '学长博讲堂', '学员博讲堂', '音乐考研', '舞蹈考研', '音乐留学']
  if (to.query.type) title = list[to.query.type - 1]
  document.title = title
  if (to.meta.requireAuth) {
    if (store.state.userInfo.token) {
      next()
    } else {
      next({ name: 'Login', query: { redirect: to.path } })
    }
  } else {
    next()
  }
})

export default router
