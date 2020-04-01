import axios from './request'

export function getTopicsHotList () {
  return axios.get('/topics/hot.json')
}
