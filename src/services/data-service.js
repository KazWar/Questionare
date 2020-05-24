import axios from "axios";

let base_url = "http://localhost:9100/v1"

export const DataService = {
  summary: null,
  authenticated: null,

  get posts () {
    return this.summary ? this.summary.details : []
  },

  get hasSummary () {
    return this.summary != null
  },

  getSummary () {
    if (this.hasSummary) {
      console.log('Already had the summary', this.summary)
      return Promise.resolve(this.summary)
    }

    console.log('Retrieving the summary...')
    const options = {
      url: base_url + `/summary?withDetails=true`,
      method: 'get',
      credentials: 'omit'
    }
    return axios(options)
      .then(response => {
        this.summary = response.data
        console.log('Retrieved the summary', this.summary)
        return this.summary
      })
  },

  authenticate (usr, pwd) {
    console.log('Authenticating the user...')
    const options = {
      url: base_url + `/authenticate`,
      params: {
        username: usr,
        password: pwd
      },
      method: 'get'
    }
    return axios(options)
      .then(response => {
        if(response.status === 200){
          return true
        } else {
          console.log("Failed to authenticate user with the given credentials.")
          return false
        }
      })
      .catch(error => {
        console.error(error)
        return false
      })
  }
}
