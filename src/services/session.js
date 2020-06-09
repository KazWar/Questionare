import Vue from 'vue'
import { Configuration } from './configuration'

export const Session = new Vue({
  data () {
    return {
      // Indicates that the user is currently logging in.
      // It controls visibility of the login dialog etc.
      isLoggingIn: false,
// Details of the logged in user
      user: null,
      // Indicates that the user has succesfully logged in
      isLoggedIn: false
    }
  },

  computed: {
    // Indicates that there's no logged in user yet
    isLoggedOut () {
      return !this.isLoggedIn
    }
  },


  methods: {
    // Initiates login process
    startLogin () {
      this.isLoggingIn = true
      //console.log('Login initiated', this)
    },

    // Finishes the login process
    finishLogin () {
      this.isLoggingIn = false
      //console.log('Login finished')
    },

    // Authenticates the user
    login (username, password) {
      return this
        .authenticate(username, password)
        .then(success => {
          if (success) {
            this.isLoggedIn = true
            this.user = { name: username }
            //console.log('Logged in as', username)
            return true
          } else {
            throw new Error()
          }
        })
        .catch(() => {
          //console.log('Login failed for user', username)
          return false
        })
    },

    // Log out the user
    logout () {
      this.isLoggedIn = false
      this.user = null
      //console.log('Logged out')
    },

    authenticate (usr, pwd) {
      //console.log('Authenticating the user...')
      const options = {
        url: Configuration.baseUrl + `/authenticate`,
        params: {
          username: usr,
          password: pwd
        },
        method: 'get'
      }
      return axios(options)
        .then(response => {
          if (response.status === 200) {
            return true
          } else {
            //console.log("Failed to authenticate user with the given credentials.")
            return false
          }
        })
        .catch(error => {
          console.error(error)
          return false
        })
    }
  }
})
