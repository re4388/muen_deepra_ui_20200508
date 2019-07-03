<template>
  <div class="small">
    {{ graphData }}
    <GraphDisplayLineChart :chart-data="datacollection"></GraphDisplayLineChart>
  </div>
</template>

<script>
  import GraphDisplayLineChart from './GraphDisplayLineChart.js'
  export default {
    name: 'GraphDisplay',
    components: {
      GraphDisplayLineChart
    },
    props: ['graphData'],
    data() {
      return {
        datacollection: null
      }
    },
    // call data after DOM mounted
    mounted() {
      this.fillData()
    },
    methods: {
      fillData() {
        this.graphData = {
          labels: [1, 2, 3, 4, 5],
          datasets: [{
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [1, 2, 3, 4, 5]
          }, {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [1, 2, 3, 4, 5]
          }]
        }
      },
    }
  }

</script>

<style>
  .small {
    max-width: 200px;
    max-height: 200px;
    /* margin: 150px auto; */
  }

</style>
