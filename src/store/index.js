import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedSmaddle: null,
    daysWhenOffline: 7, //amount of days when tracker is registered as offline
    markerData: [
      {
        type: 'Feature',
        properties: {
          id: 0,
          name:'Driewieller van Sascha',
          last_updated: 1639405146,
          stolen: false,
          battery: 20
        },
        geometry: {
          type: 'Point',
          coordinates: [5, 52]
        }
      },
      {
        type: 'Feature',
        properties: {
          id: 1,
          name:'Eénwieller van Robin',
          last_updated: 1639405146,
          stolen: false,
          battery: 30
        },
        geometry: {
          type: 'Point',
          coordinates: [5, 52.5]
        },

      },
      {
        type: 'Feature',
        properties: {
          id: 2,
          name:'Smaddle Jules',
          last_updated: 1639405146,
          stolen: false,
          battery: 60
        },
        geometry: {
          type: 'Point',
          coordinates: [4.411096572875977,51.82320616544812]
        }
      },
      {
        type: 'Feature',
        properties: {
          id: 3,
          name:'Smaddle Niels',
          last_updated: 1639405146,
          stolen: true,
          battery: 80
        },
        geometry: {
          type: 'Point',
          coordinates: [4.56731915473938,51.78630065436369]
        }
      },
      {
        type: 'Feature',
        properties: {
          id: 3,
          name: 'Smaddle Martijn',
          last_updated: 1638800926,
          stolen: false,
          battery: 100
        },
        geometry: {
          type: 'Point',
          coordinates: [4.484079480171204,51.91714442767075]
        }
      }
    ], //updated from geojson server (sascha)
    user: null,
    status: null
  },
  mutations: {
    selectSmaddle(state,smaddle){
      state.selectedSmaddle = smaddle
    },
    setUser(state,userData){
      state.user = userData
    },
    setStatus(state,status){
      state.status = status
    }

  },
  actions: {
    setSelectedSmaddle({commit}, smaddle){
      commit('selectSmaddle', smaddle)
    },
    login({commit}, loginData){
      return new Promise((resolve, reject) =>{
        commit('setStatus', 'fetching')
        fetch('https://api.smaddle.nl/users/login',{
          method: 'POST',
          body: loginData
        }).then(response => response.json().then((data)=>{
          commit('setStatus', response.status)
          commit('setUser', data)
          resolve(data)
        })).catch((e)=>{
          reject(e)
        })
      })
    },
    register({commit}, registerData){
      return new Promise((resolve, reject) =>{
        commit('setStatus', 'fetching')
        fetch('https://api.smaddle.nl/users/register',{
          method: 'POST',
          body: registerData
        }).then(response => response.json().then((data)=>{
          commit('setStatus', response.status)
          resolve(data)
        })).catch((e)=>{
          reject(e)
        })
      })
    },
  },
  modules: {
  }
})
