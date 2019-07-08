<template>
  <div class="small pl-5">
    <GraphDisplayLineChart :chart-data="datacollection"></GraphDisplayLineChart>
    <div class="thresholdValue">
      Threshold Value: <span>{{ newValue }}</span>
    </div>
    <br>
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
        required:true,
      },
      newValue:{
        type:Number,
        required:true,
      }
    },
    
    data() {
      return {
        datacollection: {},
      }
    },
    
    mounted() {
      this.fillData()
    },

    watch: {
      newValue() {
        this.fillData()
      }
    },

    methods: {
      fillData() {
        // code if we can't use spread operator:
        // let label = []
        // this.graphData["x"].forEach(i => label.push(i))
        this.datacollection = {
          labels: [...this.graphData["x"]],
          // labels:label,
          datasets: [{
            label: 'Taiwan',
            backgroundColor: 'rgba(238,238,238,0.2)',
            //=> "x": [1, 2, 3, 2, 1]
            data: this.graphData["x"].map(i => i * (this.newValue + 0.2) * 10)
          }, {
            label: 'Global',
            backgroundColor: 'rgba(119,119,119,0.8)',
            //=> "y": [3, 2, 1, 4, 5]
            data: this.graphData["y"].map(i => i + (this.newValue + 0.2) * 10)
          }]
        }
      },
      // changeThreshold() {
      //   return this.newValue
      // },
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
