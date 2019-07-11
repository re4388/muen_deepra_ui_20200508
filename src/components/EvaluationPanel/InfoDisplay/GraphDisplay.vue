<template>
  <div class="small pl-5">
    <GraphDisplayLineChart 
    :chart-data="datacollection"
    :options="options"
    ></GraphDisplayLineChart>
  </div>
</template>

<script>
  import GraphDisplayLineChart from './GraphDisplayLineChart.vue'
  export default {
    name: 'GraphDisplay',
    components: {
      GraphDisplayLineChart
    },

    props:{
      graphData:{
        type:Object,
        // required:true,
      },
      newThreshold:{
        type:Number,
        // required:true,
      }
    },
    
    data() {
      return {
        datacollection: {},
        options:{
          animation:{
            duration:0
          }
        }
      }
    },
    
    mounted() {
      this.fillData()
    },

    watch: {
      newThreshold() {
        this.fillData()
      }
    },

    methods: {
      fillData() {
        this.datacollection = {
          labels: [...this.graphData["x"]],
          datasets: [{
            label: 'Taiwan',
            backgroundColor: 'rgba(238,238,238,0.2)',  //=> "x": [1, 2, 3, 2, 1]
            data: this.graphData["x"].map(i => i * (this.newThreshold + 0.2) * 10)
          }, {
            label: 'Global',
            backgroundColor: 'rgba(119,119,119,0.8)',   //=> "y": [3, 2, 1, 4, 5]
            data: this.graphData["y"].map(i => i + (this.newThreshold + 0.2) * 10)
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
