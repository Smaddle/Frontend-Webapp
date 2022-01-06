import router from '../router'

export const userModule = {
  state: {
    user: null,
    loggedIn: false
  },

  mutations: {
    setUser(state, userData) {
      state.user = userData
    },

    setStatus(state, value) {
      state.loggedIn = value
    }
  },

  actions: {
    async register(state, registerData) {
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
        if (res.status === 200) {
          await router.push({name: 'Inloggen'})
        }
      } catch (e) {
        console.log(e)
      }
    },

    async login({commit}, loginData) {
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
        if (res.status === 200) {
          commit('setUser', await res.json())
          commit('setStatus', true)
          await router.push({name: 'Home'})
        }
      } catch (e) {
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
            "emailAddress": updatedUser.emailAddress,
            "firstName": updatedUser.firstName,
            "middleName": null,
            "lastName": updatedUser.lastName,
            "devices": updatedUser.devices
          })
        })
        if (res.status === 401) {
          router.push({name: 'Inloggen'})
        } else {
          commit('setUser', updatedUser)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}