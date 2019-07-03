<template>
  <div class="small">
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
    props: ['graphData'],  //  fake data: { "x": [ 12, 22, 32, 4, 5 ], "y": [ 1, 2, 3, 4, 5 ] }

    // need to define the data that we are going to use in html
    data() {
      return {
        datacollection: null
      }
    },

    // get data after DOM is mounted
    mounted() {
      this.getData()
    },

    // methods defined here
    // we will get part of the props, token from parent, inside charJS graph data strcuture
    methods: {
      getData() {
        this.datacollection = {
          labels: this.graphData["x"],
          datasets: [{
            label: 'Data 1',
            // backgroundColor: '#f87979',
            data: this.graphData["x"]
          }, {
            label: 'Data 2',
            // backgroundColor: 'blue',
            data: this.graphData["y"]
          }]
        }
      },

    }
  }

</script>

<style>
  .small {
    max-width: 400px;
    max-height: 400px;
    /* margin: 150px auto; */
  }

</style>
