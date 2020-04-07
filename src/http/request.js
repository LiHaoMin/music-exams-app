import axios from 'axios'
import { Toast } from 'vant'

const baseURL = '/api'

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
    // TODO 请求头添加token
    // config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err && err.response) {
    } else {
      err.message = '连接服务器失败'
    }
    return Promise.reject(err.response)
  }
)

http.get = function (url, options) {
  // let loading = true
  if (!options || options.isShowLoading !== false) {
    // TODO 显示loading
  }
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          // TODO 隐藏loading
        }
        resolve(response)
        // reject(response.msg)
      })
      .catch(e => {
        Toast(e)
      })
  })
}

http.post = function (url, data, options) {
  // let loading = true
  if (!options || options.isShowLoading !== false) {
    // TODO 显示loading
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then(response => {
        if (!options || options.isShowLoading !== false) {
          // TODO 隐藏loading
        }
        resolve(response)
        // reject(response.msg)
      })
      .catch(e => {
        Toast(e)
      })
  })
}

export default http
