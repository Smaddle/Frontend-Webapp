import Vue from 'vue'
import Vuex from 'vuex'
import { userModule } from './userModule.js'
import { deviceModule } from './deviceModule'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedSmaddle: null,
    daysWhenOffline: 7, //amount of days when tracker is registered as offline
  },

  mutations: {
    selectSmaddle(state,smaddle) {
      state.selectedSmaddle = smaddle
    }
  },

  actions: {
    setSelectedSmaddle({commit}, smaddle) {
      commit('selectSmaddle', smaddle)
    }
  },

  modules: {
    user: userModule,
    device: deviceModule
  }
})
