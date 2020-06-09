import Vue from 'vue'
import axios from 'axios'
import { Configuration } from './configuration'

export const DataService = new Vue({
  data () {
    return {
      summary: null
    }
  },

  computed: {
    posts () {
      return this.summary ? this.summary.details : []
    },

    companies () {
      return this.summary ? this.summary : []
    },

    hasSummary () {
      return this.summary != null
    }
  },

  methods: {
    // Amends the received data to create proper
    // company->departments hierarchy
    transformSummary (input) {
      return input.reduce((result, current) => {
        const { company: companyName, department: departmentName, details, summary } = current

        // Find the company in the output
        // Create if not present yet
        let company = result.find(c => c.name === companyName)
        if (!company) {
          company = {
            name: companyName,
            departments: []
          }
          result.push(company)
        }

        // Find the department in the company,
        // create if not present yet
        let department = company.departments.find(d => d.name === departmentName)
        if (!department) {
          department = {
            name: departmentName,
            details,
            summary
          }
          company.departments.push(department)
        }

        return result
      }, [])
    },

    // Retrieves the summary of surveys
    getSummary () {
      if (this.hasSummary) {
        //console.log('Already had the summary')
        return Promise.resolve(this.summary)
      }

      //console.log('Retrieving the summary...')
      const options = {
        url: Configuration.baseUrl + `/summary`,
        method: 'get',
        credentials: 'omit'
      }
      return axios(options)
        .then(response => {
          let data = response.data
          data = data.data
          //console.log('Retrieved the summary...')

          //console.log('Restructuring the summary...')
          this.summary = this.transformSummary(data)
          //console.log('Restructured the summary...')
        })

    },

    /**
     * Finds a company in the summary, matching the specified name
     * @param {String} name Company name
     */
    getCompany (name) {
      if (this.summary) {
        return this.summary.find(c => c.name === name)
      }
    },

    /**
     * Finds a department in the company, matching the specified name
     * @param {Company} company Company
     * @param {String} name Department name
     */
    getDepartment ({ departments }, name) {
      if (departments) {
        return departments.find(d => d.name === name)
      }
    },

    /**
     * Returns data points from the specified department
     * @param {Department} department
     * @returns Structure containing current and desired data series
     */
    getDepartmentData (department) {
      if (department) {
        return {
          current: department.summary["current-situation"].map(category => category.value),
          desired: department.summary["desired-situation"].map(category => category.value)
        }
      }
    },

    // Retrieves the results for a specified company and department
    getResults (companyName, departmentName) {
      let departmentData

      // console.log("Checking for company")
      for (let company of this.summary){
        if (company.name === companyName){
          // console.log("Obtained company")
          // console.log(company)
          for (let department of company.departments){
            if (department.name === departmentName){
              // console.log("Obtained department Data")
              // console.log(department)
              departmentData = department.details
            }
          }
        }
      }

      // console.log("returning data")
      // console.log(departmentData)
      return departmentData
    },

    submitSurvey (survey) {
      //console.log('inserting the survey...')
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }, //WHy the fuck is this necessary?
        url: Configuration.baseUrl + `/submitSurvey`,
        data : survey
      }
      return axios(options)
        .then(response => {
          if (response.status === 200) {
            // console.log("Survey successfully inserted.")
            return true
          } else {
            // console.log("Failed to insert the survey.")
            return false
          }
        })
        .catch(error => {
          // console.log("Failed to insert the survey.")
          console.error(error)
          return false
        })
    },

    reset() {
      this.summary = null
    }
  }
})
