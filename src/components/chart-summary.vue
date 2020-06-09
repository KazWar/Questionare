<script>
  import Chart from 'chart.js'
  import { GraphDataService } from '../services/index'

  export default {
    name: 'chart-summary',

    data() {
      return {
        options : {
          startAngle:45,
          layout:{
            padding:{
              top:210,
              right:120
            }
          },
          maintainAspectRatio: false,
          scale:{
            gridLines:{
              display:false,
              circular: true,
              color:['rgba(241, 169, 160, 1)',
                'rgba(241, 169, 160, 1)',
                'rgba(253, 227, 167, 1)',
                'rgba(249, 180, 45,1)',
                'rgba(135, 211, 124, 1)',
                'rgba(129, 207, 224, 1)'],
              lineWidth:2
            },
            ticks: {
              display:false,
              min: 0,
              max:120,
              stepSize: 20
            },
            pointLabels: {
              fontSize: 14,
              display: false
            }
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    },

    methods:{
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId).getContext('2d');
        const radarChart = new Chart(ctx, {
          type: 'radar',
          data: chartData,
          options: this.options
        });
      },

      scaleData (data) {
        if (data) {
          const factor = 20
          for (const dataset of data.datasets) {
            dataset.data = dataset.data
              ? dataset.data.map(value => value + factor)
              : []
          }
        }
        return data
      }
    },

    computed:{
      chartData: function () {
        const data = GraphDataService.createChartData(this.company, this.department)
        return this.scaleData(data)
      },

      company () {
        return this.$route.params.company
      },

      department () {
        return this.$route.params.department
      }
    },

    mounted(){
      console.log(this.chartData)
      this.createChart('chart-summary', this.chartData);
    }
  }

</script>

<template>
  <div style="
    margin-left: 100px">
    <img style="height:1400px; width:1400px; position: absolute; z-index: -10" src="assets/chart-background.png"/>
    <div>
      <canvas id="chart-summary"></canvas>
    </div>
  </div>
</template>

<style lang="scss">
  #chart-summary {
    z-index: 10;
    width: 1220px;
    height: 1220px;
  }
</style>
