<template>
  <div class="small">
    <GraphDisplayLineChart :chart-data="datacollection"></GraphDisplayLineChart>
    <!-- {{ newValue }} -->
  </div>

</template>

<script>
  import GraphDisplayLineChart from './GraphDisplayLineChart.vue'
  export default {
    name: 'GraphDisplay',
    components: {
      GraphDisplayLineChart
    },
    props: ['graphData', 'newValue'], // fake data: { "x": [ 12, 22, 32, 4, 5 ], "y": [ 1, 2, 3, 4, 5 ] }

    // need to define the data that we are going to use in html
    data() {
      return {
        datacollection: {},
      }
    },

    // get data after DOM is mounted
    created() {
      this.getChatData()
      console.log(this.newValue)
    },

    // methods defined here
    // we will get part of the props, token from parent, inside charJS graph data strcuture
    methods: {
      getChatData() {
        this.datacollection = {
          labels: [...this.graphData["x"], ...this.graphData["y"]],
          datasets: [{
            label: 'Taiwan',
            // backgroundColor: '#f87979',
            data: this.graphData["x"].map(x => x + this.newValue) //=> "x": [12, 22, 32, 4, 5]
          }, {
            label: 'Global',
            // backgroundColor: 'blue',
            data: this.graphData["y"] //=> "y": [1, 2, 3, 4, 5]
          }]
        }
      }
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
