import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedSmaddle: null,
    daysWhenOffline: 7, //amount of days when tracker is registered as offline
    geoJson: new Map([["4ea2353a-fc4d-4463-b244-1279243b4396", {
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
    }]]),
    //updated from geojson server (sascha)
    user: null,
    status: null,
    webSocket: null,
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

    //used for setting the smaddle data from backend
    setSmaddle(state, smaddle)
    {
      state.geoJson.set(smaddle.properties.DeviceToken, smaddle)
    },

    //used to process the smaddle data given by DeviceApi
    updateGeoJson(state, socketData)
    {
      socketData.forEach(smaddle => {
        state.geoJson.set(smaddle.properties.Id,
            {
              type: "feature",
              properties: {...state.geoJson.get(smaddle.properties.Id).properties, ...smaddle.properties},
              geometry: smaddle.geometry
            })
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
        fetch('http://localhost:8888',{
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

  //  geojson related actions
    registerDevices({state, commit}, device)
    {
      //Todo get the list with devices from backend user model then register those via this websocket connection
      const deviceTokens = [];
      for (let smaddle of state.geoJson.values()) {
        deviceTokens.push(smaddle.properties.DeviceToken); //get all the tokens of the smaddles we want to track
      }

      let socket = new WebSocket("ws://localhost:8888")
      socket.onopen = () => socket.send(JSON.stringify({
        "action": "REGISTER",
        "instructions":[""],
        "smaddles": deviceTokens
      }))

      socket.onmessage = (e) => {
        let data = JSON.parse(e.data).features
        commit("updateSmaddles", data)
        console.log(state.geoJson.get("4ea2353a-fc4d-4463-b244-1279243b4396").geometry.coordinates)
      }
      commit('setWebSocket', socket)
      console.log(device)
    }
  },
  modules: {
  }
})
