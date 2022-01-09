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
    selectSmaddle(state, deviceToken) {
      state.selectedSmaddle = deviceToken
    }
  },

  getters: {
    getSelectedSmaddle: state => {
      return state.device.markerData.get(state.selectedSmaddle)
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
