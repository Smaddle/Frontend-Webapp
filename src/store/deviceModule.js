export const deviceModule = {
  state: {
    map: null,
    webSocket: null,
    selectedDevice: null,
    devices: {
      type: 'FeatureCollection',
      features: []
    },
    requestStatus: null
    },

  getters: {
    devicesStolen(state) {
      return {type: 'FeatureCollection', features: state.devices.features.filter(device => device.properties.status === 'stolen')}
    },

    devicesNormal(state) {
      return {type: 'FeatureCollection', features: state.devices.features.filter(device => device.properties.status === 'normal')}
    },

    devicesOffline(state) {
      return {type: 'FeatureCollection', features: state.devices.features.filter(device => device.properties.status === 'offline')}
    },

    getDeviceTokens(state) {
      const deviceTokens = []
      for (let device of state.devices.features) {
        deviceTokens.push(device.properties.deviceToken) //get all the tokens of the smaddles we want to track
      }

      return deviceTokens
    },

    getSelectedDevice(state) {
      console.log(state.devices.features.filter(device => device.properties.deviceToken == state.selectedDevice))
      return state.devices.features.filter(device => device.properties.deviceToken == state.selectedDevice)[0]
    }
  },

  mutations: {
    setWebSocket(state, socket) {
      state.webSocket = socket
    },
    setMap(state, map) {
      state.map = map
    },
    setDevices(state, devices) {
      if (devices === null){
        state.devices.features = [];
      }
      devices.forEach(device => {
        console.log(device.name)
        state.devices.features.push(
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
              },
              properties: {
                name: device.name,
                last_updated: 1639405146,
                stolen: false,
                battery: 20,
                status: 'stolen',
                deviceToken: device.id
              }
            }
        )
      })
    },
    setDeviceRequestStatus(state, status){
      state.requestStatus = status
    },
    setSelectedDevice(state, deviceToken) {
      state.selectedDevice = deviceToken
    },

    //used to process the smaddle data given by DeviceApi
    updateDevices(state, updatedGeoJson) {
      updatedGeoJson.features.forEach(geoJson => {
        let index = state.devices.features.findIndex(device => device.deviceToken == geoJson.Id)
        state.devices.features[index] = {
          type: "feature",
          properties: {
            ...state.devices.features[index].properties,
            ...geoJson.properties,
          },
          geometry: geoJson.geometry
        }
      })

      //apparently just updating an index does not get detected as a change so this seemingly useless assignment is necessary
      state.devices = {...state.devices}

    },
  },

  actions: {
    registerDevices({state, commit, getters}) {
      let socket = new WebSocket("ws://localhost:3000")
      socket.onopen = () => socket.send(JSON.stringify({
        "action": "REGISTER",
        "instructions": [""],
        "smaddles": getters.getDeviceTokens
      }))

      socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        commit('updateDevices', data)
        state.map.getSource('stolen-point').setData(getters.devicesStolen)
        state.map.getSource('normal-point').setData(getters.devicesNormal)
        state.map.getSource('offline-point').setData(getters.devicesOffline)
      }

      commit('setWebSocket', socket)
    },
    createDevice({commit}, name){
      return new Promise((resolve, reject)=>{
        commit('setDeviceRequestStatus', 'fetching')
        fetch('http://localhost:8000/devices/create',{method: "POST", credentials: "include", body:JSON.stringify({name: name})}).then(res=>{
          if(res.status === 200){
            res.json().then(device => {
              commit('setDeviceRequestStatus', null)
              resolve(device)
            })
          }else{
            commit('setDeviceRequestStatus', res.status)
            reject(res)
          }
        }).catch(err =>{
          commit('setDeviceRequestStatus', null)
          reject(err)
        })
      })
    },
    getDevices({commit,state}){
      return new Promise((resolve,reject)=>{
        commit('setDeviceRequestStatus', 'fetching')
        fetch('http://localhost:8000/devices', {method: "GET", credentials:"include"}).then(res=>{
          if(res.status === 200){
            res.json().then((devicesArray)=>{
              commit('setDeviceRequestStatus', null)
              commit('setDevices',devicesArray)
              resolve(state.devicesList)
            })

          }else{
            commit('setDeviceRequestStatus', res.status)
            reject(res)
          }
        }).catch(err => {
          commit('setDeviceRequestStatus', null)
          reject(err)
        })
      })
    },
    clearDevices({commit}){
      commit('setDevices', null)
    },
    setSelectedDevice({commit}, deviceToken){
      setTimeout(() => commit('setSelectedDevice',deviceToken), 500)
    }
  },
}