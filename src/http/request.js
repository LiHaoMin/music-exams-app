import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'
import { removeLocalStore } from '@/utils/global'

// const baseURL = '/musicapp'
const baseURL = 'http://yinyuebojiangtang.com/api'

const http = {}

const instance = axios.create({
  timeout: 120000,
  baseURL,
  validateStatus (status) {
    // 设置状态码返回true就算报404，但依旧会显示请求成功
    switch (status) {
      case 400:
        Toast('请求出错')
        break
      case 401:
        Toast('授权失败，请重新登录')
        break
      case 403:
        Toast('授权失败，请重新登录')
        break
      case 404:
        Toast('请求错误,未找到该资源')
        break
      case 500:
        Toast('服务端错误')
        break
    }
    return status >= 200 && status < 300
  }
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    if (store.state.userInfo && store.state.userInfo.token) {
      config.headers.token = store.state.userInfo.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code === -1) {
      Toast(res.msg || '请求失败.')
    }
    if (res.code && res.code === 10004) {
      Toast(res.msg || 'Token失效.请重新登录.')
      router.replace({ name: 'Login' })
      removeLocalStore('user_info')
    }
    return res
  },
  err => {
    if (err && err.response) {
      err.message = err.response.status
    } else {
      err.message = '连接服务器失败'
    }
    store.state.isLoading = false
    return Promise.reject(err.response)
  }
)

http.get = function (url, options) {
  if (options && options.isShowLoading) {
    store.state.isLoading = true
  }
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then(response => {
        if (options && options.isShowLoading) {
          store.state.isLoading = false
        }
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

http.post = function (url, data, options) {
  if (options && options.isShowLoading) {
    store.state.isLoading = true
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then(response => {
        if (options && options.isShowLoading) {
          store.state.isLoading = false
        }
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export default http
