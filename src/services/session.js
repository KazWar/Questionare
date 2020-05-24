import { DataService } from "./data-service";

export const Session = {
  // Indicates that the user is currently logging in.
  // It controls visibility of the login dialog etc.
  isLoggingIn: false,

  // Indicates that the user has succesfully logged in
  isLoggedIn: false,

  // Indicates that there's no logged in user yet
  get isLoggedOut () {
    return !this.isLoggedIn
  },

  // Details of the logged in user
  user: null,

  // Initiates login process
  startLogin () {
    this.isLoggingIn = true
    console.log('Login initiated', this)
  },

  // Finishes the login process
  finishLogin () {
    this.isLoggingIn = false
    console.log('Login finished')
  },

  // Authenticates the user
  login (userName, password) {
    if (userName && password) {
      return DataService.authenticate(userName, password)
    } else {
      return Promise.resolve(false)
    }
    this.isLoggedIn = true
    this.user = {
      name: userName
    }

    return Promise.resolve(false)

    console.log('Logged in as', this.user)
  },

  // Log out the user
  logout () {
    this.isLoggedIn = false
    this.user = null
    console.log('Logged out')
  }
}
