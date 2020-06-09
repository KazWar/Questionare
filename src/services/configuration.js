import Vue from 'vue'

export const Configuration = new Vue({
  computed: {
    baseUrl () {
      return window.configuration.baseUrl
    },

    testUrl () {
      return window.configuration.testUrl
    }
  }
})
