import Vue from 'vue'
import Vuex from 'vuex'
import { userModule } from './userModule.js'
import { deviceModule } from './deviceModule'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapLoaded: false
  },

  mutations: {
    setMapStatus(state, status){
      state.mapLoaded = status
    }
  },

  getters: {
  },

  actions: {
  },

  modules: {
    user: userModule,
    device: deviceModule
  }
})
