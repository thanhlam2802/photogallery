// stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: '',
  }),
  actions: {
    setUser(userData, token) {
      this.user = userData
      this.token = token
      this.isLoggedIn = true

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)
      localStorage.setItem('isLoggedIn', 'true')
    },
    logout() {
      this.user = null
      this.token = ''
      this.isLoggedIn = false

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isLoggedIn')
    },
    loadFromLocalStorage() {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      if (user && token && isLoggedIn) {
        this.user = JSON.parse(user)
        this.token = token
        this.isLoggedIn = true
      }
    }
  }
})
