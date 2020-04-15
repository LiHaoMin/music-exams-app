import Vue from 'vue'
import Vuex from 'vuex'
import { getLocalStore, setLocalStore } from '@/utils/global'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    userInfo: JSON.parse(getLocalStore('user_info') || '{}')
  },
  mutations: {
    setUserInfo (state, user) {
      Object.assign(state.userInfo, user)
      setLocalStore('user_info', state.userInfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
