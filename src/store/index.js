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