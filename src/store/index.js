import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    userInfo: {
      nickName: '蜡笔小新',
      phoneNumber: '',
      token: ''
    }
  },
  mutations: {
    setUserInfo (state, user) {
      state.userInfo = { ...user }
    }
  },
  actions: {
  },
  modules: {
  }
})
