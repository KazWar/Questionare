import axios from "axios";

export const DataService = {
  summary: null,

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
      url: `http://localhost:9100/summary?withDetails=true`,
      method: 'get',
      credentials: 'omit'
    }
    return axios(options)
      .then(response => {
        this.summary = response.data
        console.log('Retrieved the summary', this.summary)
        return this.summary
      })
  }
}
