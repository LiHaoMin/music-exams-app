import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'

const baseURL = '/musicapp'

const http = {}

const instance = axios.create({
  timeout: 5000,
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
    if (store.state.userInfo.token) {
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
    if (response.code && response.code === -1) {
      Toast(response.msg || '请求失败.')
    }
    if (response.code && response.code === 401) {
      Toast('Token失效.请重新登录.')
    }
    return response.data
  },
  err => {
    if (err && err.response) {
      console.log(err)
    } else {
      err.message = '连接服务器失败'
    }
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
