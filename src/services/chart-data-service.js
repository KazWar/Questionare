import Vue from 'vue'
import { DataService } from './data-service'

export const GraphDataService = new Vue({
  data () {
    return {

    }
  },

  computed: {
  },

  methods: {
    getGraphLabels () {
      if (DataService.summary == null){
        return []
      }

      let situation = DataService.summary[0].departments[0].summary["current-situation"]
      let labels = new Set()

      for (let label of situation){
        let shortLabel = label["key-nl"].replace(" [Huidige situatie]", '')
        labels.add(shortLabel)
      }

      labels = Array.from(labels)
      return labels
    },

    getGraphData (companyName, companyDepartment) {
      const company = DataService.getCompany(companyName)
      const department = DataService.getDepartment(company, companyDepartment)
      const { current, desired } = DataService.getDepartmentData(department) || {}

      return {
        current,
        desired
      }
    },

    createChartData(companyName, companyDepartment){
      let labels = this.getGraphLabels()

      const data = this.getGraphData(companyName, companyDepartment)

      return {
        "labels": labels,
        "datasets": [
          {
            label: 'Current',
            backgroundColor: 'rgb(255, 99, 132,0.2)',
            borderColor: 'rgb(255, 99, 132)',
            "data": data.current
          },
          {
            label: 'Desired',
            backgroundColor: 'rgb(200, 140, 20,0.2)',
            borderColor: 'rgb(200, 140, 20)',
            "data": data.desired
          }
        ]
      }
    }
  }
})
