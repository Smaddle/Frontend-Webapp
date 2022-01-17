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
    /**
     * Registers a new user in the backend
     * @param state
     * @param registerData - user object to be registered
     * @returns {Promise<void>}
     */
    async register(state, registerData) {
      return new Promise((resolve,reject) =>{
        fetch(URL + '/Users/register', {
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
        }).then((res) =>{
          if (res.status === 200){
            resolve(200)
          }else if (res.status === 400) {
            res.json().then(data => {
              reject(data)
            });
          }
        })
      })
    },

    /**
     * Attempts to login the user.
     * @param commit
     * @param loginData - object existing of username or email and password.
     * @returns {Promise<void>}
     */
    async login({ commit }, loginData) {
      try {
        commit('setRequestStatus', 'fetching')
        let res = await fetch(URL + '/Users/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({username: loginData.username, password: loginData.password})
        })
        if (res.status === 200) {
          let data = await res.json()
          commit('setUser', data)
          commit('setDevices', data.devices)
          commit('setRequestStatus', null)
        }
        else {
          commit('setRequestStatus', res.status)
          commit('setUser', null)
        }
      }
      catch(e) {
          commit('setUser', null)
          console.log(e)
        }
    },

    /**
     * Sends request to logout the current user and redirects to login
     * @param commit
     * @returns {Promise<void>}
     */
    async logout({commit}) {
      try {
        let res = await fetch(URL + '/Users/logout', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        if (res.status === 200) {
          console.log('logging out')
          commit('setUser', null)
          commit('setDevices', [])
          await router.push({name: 'Inloggen'})
        }
      }
      catch(e) {
        console.log(e)
      }
    },

    /**
     * Get the current user (based on the cookie set).
     * This is useful, if the user is still logged in and does not need to go to the login page to get the data.
     * @param commit
     * @returns {Promise<void>}
     */
    async getUser({ commit, dispatch }) {
      commit("setRequestStatus", 'fetching');
      try {
        let res = await fetch(URL + '/Users/currentUser', {method: "GET", credentials: "include"})
        if (res.status === 200) {
          let user = await res.json()
          commit('setUser', user);
          commit('setRequestStatus', null)
          commit('setDevices', user.devices)
          dispatch('setSelectedDevice')
        }

        else {
          commit('setRequestStatus', res.status)
          commit('setUser', null)
          router.push('/auth')
        }
      }
      catch (e) {
        commit('setRequestStatus', '?')
        commit('setUser', null)
      }
    },

    /**
     * Used to edit the logged in users data.
     * @param commit
     * @param updatedUser - Object of the user like it should be set in backend.
     * @returns {Promise<void>}
     */
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
        }
        else {
          commit('setUser', updatedUser)
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}
