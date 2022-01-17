import config from '../config'

const DEVICE_URL = config.DEVICE_WS_API_URL;
const URL = config.API_URL;
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
    //Gets all the devices with state stolen
    devicesStolen(state) {
      return { type: 'FeatureCollection', features: state.devices.features.filter(device => device.properties.status === 'stolen' && device.geometry.coordinates != undefined) }
    },

    //Gets all the devices with state normal
    devicesNormal(state) {
      return { type: 'FeatureCollection', features: state.devices.features.filter(device => device.properties.status === 'normal') }
    },

    //Gets all the devices with state offline
    devicesOffline(state) {
      return { type: 'FeatureCollection', features: state.devices.features.filter(device => device.properties.status === 'offline') }
    },

    //Gets the deviceTokens for all devices given by the backend. These are used to register in the DeviceApi
    getDeviceTokens(state) {
      const deviceTokens = []
      for (let device of state.devices.features) {
        deviceTokens.push(device.properties.deviceToken) //get all the tokens of the smaddles we want to track
      }

      return deviceTokens
    },

    //Gets the selected device, by filtering state.devices for a device with deviceToken equal to selectedDevice
    getSelectedDevice(state) {
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
      if (devices === null || devices.length === 0) {
        state.devices.features = [];
      }
      if(state.devices.features.length == 0) {
        devices.forEach(device => {
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
                // deviceToken: '4ea2353a-fc4d-4463-b244-1279243b4396'
              }
            }
          )
        })
      }
    },
    setDeviceRequestStatus(state, status) {
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
      state.devices = { ...state.devices }

    },
  },

  actions: {
    //Opens the websocket connection to the deviceApi.
    //This sends all the deviceTokens given by getDeviceTokens to receive updated data about those.
    registerDevices({ state, commit, getters }) {
      let socket = new WebSocket(DEVICE_URL)
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

    createDevice({ commit }, name) {
      return new Promise((resolve, reject) => {
        commit('setDeviceRequestStatus', 'fetching')
        fetch(URL + '/devices/create', { method: "POST", credentials: "include", body: JSON.stringify({ name: name }) }).then(res => {
          if (res.status === 200) {
            res.json().then(device => {
              commit('setDeviceRequestStatus', null)
              resolve(device)
            })
          } else {
            commit('setDeviceRequestStatus', res.status)
            reject(res)
          }
        }).catch(err => {
          commit('setDeviceRequestStatus', null)
          reject(err)
        })
      })
    },

    async getDevices({ commit }) {
      try {
        commit('setDeviceRequestStatus', 'fetching')
        let res = await fetch(URL + '/devices', { method: "GET", credentials: "include" })
        if (res.status === 200) {
          let devicesArray =  await res.json()
          commit('setDeviceRequestStatus', null)
          commit('setDevices', devicesArray)
        }
        else {
          commit('setDeviceRequestStatus', res.status)
        }
      }
      catch(e) {
        console.log(e)
      }
    },

    clearDevices({ commit }) {
      commit('setDevices', null)
    },

    setSelectedDevice({ commit }, deviceToken) {
      setTimeout(() => commit('setSelectedDevice', deviceToken), 500)
    },

    async linkDevice({ commit }, deviceToken) {
      let res = await fetch(URL + '/devices/linkdevice', {
        method: "POST",
        credentials: "include",
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(deviceToken)})
      if (res.status === 200) {
        alert('device linked')
      }
      else {
        alert('unable to link device')
        console.log(res.status)
      }
      commit('setSelectedDevice', deviceToken)
    }
  },
}
//
// {
//   "id": "677d8449-a357-47ed-88af-edd5fde838c5",
//   "deviceToken": "a03bfdc1-8602-49c2-94bf-8649a6d88ba8",
//   "name": "LinkTest1"
// }