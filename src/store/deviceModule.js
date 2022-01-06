export const deviceModule = {
  state: {
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

    webSocket: null,
  },

  mutations: {
    selectSmaddle(state, smaddle) {
      state.selectedSmaddle = smaddle
    },

    setWebSocket(state, socket) {
      state.webSocket = socket
    },

    //used for setting the smaddle data from backend
    setSmaddle(state, smaddle) {
      state.markerData.set(smaddle.properties.DeviceToken, smaddle)
    },

    //used to process the smaddle data given by DeviceApi
    updateGeoJson(state, socketData) {
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

    setMarker(state, payload) {
      state.markerData.get(payload.id).marker = payload.marker;
    }
  },

  actions: {
    registerDevices({state, commit}) {
      //Todo get the list with devices from backend user model then register those via this websocket connection
      const deviceTokens = [];
      for (let smaddle of state.markerData.values()) {
        deviceTokens.push(smaddle.geoJson.properties.DeviceToken); //get all the tokens of the smaddles we want to track
      }

      let socket = new WebSocket("ws://localhost:8888")
      socket.onopen = () => socket.send(JSON.stringify({
        "action": "REGISTER",
        "instructions": [""],
        "smaddles": deviceTokens
      }))

      socket.onmessage = (e) => {
        let data = JSON.parse(e.data).features
        commit("updateGeoJson", data)
      }
      commit('setWebSocket', socket)
    }
  },
}