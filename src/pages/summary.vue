<script>
  import chartSummary from '../components/chart-summary.vue'

  export default {
    name: 'Summary',

    components: {
      "chart-summary" : chartSummary
    },

    data() {
      return {
        errors: []
      }
    },

    computed:{
      company () {
        return this.$route.params.company
      },

      department () {
        return this.$route.params.department
      }
    }
  }

</script>

<template>
  <div class="column">
    <div class="q-pa-lg text-center summary-title">
      <span class="text-h2 text-uppercase">
        {{company}} - {{department}} - summary
      </span>
    </div>
    <div class="q-pa-lg">
      <chart-summary></chart-summary>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .summary-title{
    background-color: #00cdcd;
    width: 100%;
    font-family: Roboto,-apple-system,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 24px
  }
</style>
