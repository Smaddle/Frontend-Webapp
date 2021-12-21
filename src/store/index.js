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
          battery: 20,
          DeviceToken: "4ea2353a-fc4d-4463-b244-1279243b4396"
        },
        geometry: {
          type: 'Point',
          coordinates: [5, 52]
        }
      },
    ], //updated from geojson server (sascha)
    user: null,
    status: null,
    webSocket: null
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
    },
    setWebSocket(state, socket){
      state.webSocket = socket
    },

    updateSmaddles(state, socketData)
    {
      state.markerData.forEach((marker) => {
        let updatedData = socketData.filter(smaddle => smaddle.properties.Id == marker.properties.DeviceToken)
        //overwrite the fields marker and updatedData have in common with updatedData
        marker = {...marker, ...updatedData}
      })
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

  //  geojson realted actions
    registerDevices({state, commit}, device)
    {
      //Todo get the list with devices from backend user model then register those via this websocket connection
      let socket = new WebSocket("ws://track.smaddle.nl:8888")
      socket.onopen = () => socket.send(JSON.stringify({
        "action": "REGISTER",
        "instructions":[""],
        "smaddles": state.markerData.map(smaddle => smaddle.properties.DeviceToken) //get a list of all the device tokens to track
      }))

      socket.onmessage = (e) => {
        let data = JSON.parse(e.data.features)
        console.log(data)
        commit("updateSmaddles", data)
      }
      commit('setWebSocket', socket)
      console.log("device registered")
      console.log(commit)
      console.log(device)
    }
  },
  modules: {
  }
})
