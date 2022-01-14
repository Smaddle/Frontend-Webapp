import config from '../config'
import router from '../router'

const URL = config.API_URL;

export const userModule = {
  state: {
    user: null,
    loggedIn: false,
    requestStatus: null
  },

  mutations: {
    setUser(state, userData) {
      state.user = userData
    },

    setStatus(state, value) {
      state.loggedIn = value
    },
    setRequestStatus(state, value) {
      state.requestStatus = value
    }
  },

  actions: {
    async register(state, registerData) {
      try {
        let res = await fetch(URL + '/Users/register', {
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
        if (res.status === 200) {
          await router.push({ name: 'Inloggen' })
        }
      } catch (e) {
        console.log(e)
      }
    },

    login({ commit }, loginData) {
      commit('setRequestStatus', 'fetching')
      return new Promise((resolve, reject) => {
        fetch(URL + '/Users/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({ username: loginData.username, password: loginData.password })
        }).then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              commit('setDevices', data.devices)
              commit('setUser', data)
              commit('setRequestStatus', null)
              resolve(data)
            })
          } else {
            commit('setRequestStatus', res.status)
            commit('setUser', null)
            reject(res)
          }
        }).catch(e => {
          commit('setUser', null)
          console.log(e)
        })
      })
    },

    getUser({ commit }) {
      commit("setRequestStatus", 'fetching');
      return new Promise((resolve, reject) => {
        fetch(URL + '/Users', { method: "GET", credentials: "include" })
          .then(res => {
            if (res.status === 200) {
              res.json().then(data => {
                commit('setUser', data[0]); // TODO: GET CURRENT USER
                commit('setRequestStatus', null)
                resolve(data[0])
              })
            } else {
              commit('setRequestStatus', res.status)
              commit('setUser', null)
              reject(res)
            }
          }).catch(error => {
            commit('setRequestStatus', '?')
            commit('setUser', null)
            reject(error);
          })
      })
    },

    async updateAccount({ commit }, updatedUser) {
      try {
        let res = await fetch(URL+'/Users/update', {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            "username": updatedUser.username,
            "emailAddress": updatedUser.emailAddress,
            "firstName": updatedUser.firstName,
            "middleName": null,
            "lastName": updatedUser.lastName,
            "devices": updatedUser.devices
          })
        })
        if (res.status === 401) {
          router.push({ name: 'Inloggen' })
        } else {
          commit('setUser', updatedUser)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}