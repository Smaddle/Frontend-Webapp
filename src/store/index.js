import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedSmaddle: null,
    daysWhenOffline: 7, //amount of days when tracker is registered as offline
    markerData: new Map([["4ea2353a-fc4d-4463-b244-1279243b4396", {
      geoJson: {
        type: 'Feature',
        properties: {
          id: 0,
          name: 'Driewieller van Sascha',
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
      marker: null
    }]]),

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
      state.markerData.set(smaddle.properties.DeviceToken, smaddle)
    },

    //used to process the smaddle data given by DeviceApi
    updateGeoJson(state, socketData)
    {
      socketData.forEach(smaddle => {
        state.markerData.set(smaddle.properties.Id,
            {
              geoJson: {
                type: "feature",
                properties: {
                  ...state.markerData.get(smaddle.properties.Id).geoJson.properties,
                  ...smaddle.properties
                },
                geometry: smaddle.geometry
              },
              marker: state.markerData.get(smaddle.properties.Id).marker
            })
          state.markerData.get(smaddle.properties.Id).marker.setLngLat(smaddle.geometry.coordinates)
      })
    },

    setMarker(state, payload)
    {
      state.markerData.get(payload.id).marker = payload.marker;
    }
  },
  actions: {
    setSelectedSmaddle({commit}, smaddle){
      commit('selectSmaddle', smaddle)
    },

    async login({commit}, loginData) {
      commit('setStatus', 'fetching')
      try {
        let res = await fetch('http://localhost:8000/Users/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({username: loginData.username, password: loginData.password})
        })
        if (res.status === 200)
        {
          commit('setStatus', 'loggedIn')
          commit('setUser', await res.json())
          router.push({ name: 'Home'})
        }
      }
      catch (e) {
        console.log(e)
      }
    },

    async register(state, registerData) {
      //todo check if these statuses are necessary
      // commit('setStatus', 'fetching')
      console.log(registerData.lastname)
      try {
        let res = await fetch('http://localhost:8000/Users/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            "Username": registerData.username,
            "Password": registerData.password,
            "EmailAddress": registerData.emailAddress,
            "FirstName": registerData.firstname,
            "MiddleName": registerData.middlename,
            "LastName": registerData.lastname
          })
        })
        console.log(await res.json())
        if (res.status === 200) {
          router.push({name: 'Inloggen'})
        }
        // commit('setStatus', response.status)
      }
      catch (e) {
        console.log(e)
      }
    },

    async updateAccount({commit}, updatedUser) {
      try {
        let res = await fetch('http://localhost:8000/Users/update', {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            "username": updatedUser.username,
            "emailAddress":updatedUser.emailAddress,
            "firstName":updatedUser.firstName,
            "middleName":null,
            "lastName":updatedUser.lastName,
            "devices":updatedUser.devices
          })
        })
        if (res.status === 200)
        {
          commit('setUser', updatedUser)
        }
      }
      catch (e) {
        console.log(e)
      }
    },
  //  geojson related actions
    registerDevices({state, commit})
    {
      //Todo get the list with devices from backend user model then register those via this websocket connection
      const deviceTokens = [];
      for (let smaddle of state.markerData.values()) {
        deviceTokens.push(smaddle.geoJson.properties.DeviceToken); //get all the tokens of the smaddles we want to track
      }

      let socket = new WebSocket("ws://localhost:8888")
      socket.onopen = () => socket.send(JSON.stringify({
        "action": "REGISTER",
        "instructions":[""],
        "smaddles": deviceTokens
      }))

      socket.onmessage = (e) => {
        let data = JSON.parse(e.data).features
        commit("updateGeoJson", data)
      }
      commit('setWebSocket', socket)
    }
  },
  modules: {
  }
})
