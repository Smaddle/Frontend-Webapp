export const deviceModule = {
  state: {
    map: null,
    webSocket: null,

    devices: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
          },
          properties: {
            title: 'Mapbox DC',
            status: 'stolen',
            deviceToken: '4ea2353a-fc4d-4463-b244-1279243b4396'
          }
        }]
    }
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
      //Todo get the list with devices from backend user model then register those via this websocket connection
      const deviceTokens = []
      for (let device of state.devices.features) {
        deviceTokens.push(device.properties.deviceToken) //get all the tokens of the smaddles we want to track
      }

      return deviceTokens
    }
  },

  mutations: {
    setWebSocket(state, socket) {
      state.webSocket = socket
    },

    setMap(state, map) {
      state.map = map
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
      let socket = new WebSocket("ws://localhost:8888")
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
        console.log(`stolen: ${getters.devicesStolen.features.length} normal: ${getters.devicesNormal.features.length} offline: ${getters.devicesOffline.features.length}`)
      }

      commit('setWebSocket', socket)
    }
  },
}