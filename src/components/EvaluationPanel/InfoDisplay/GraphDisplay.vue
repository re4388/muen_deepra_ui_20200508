<template>
  <div class="small pl-5">
    <GraphDisplayLineChart :chart-data="datacollection"></GraphDisplayLineChart>
    Threshold Value: {{ newValue }}
    <br>

  </div>
  <!-- 有沒有辦法newValue一改變，就可以讓fillData重新跑一次-->

</template>

<script>
  import GraphDisplayLineChart from './GraphDisplayLineChart.vue'
  export default {
    name: 'GraphDisplay',
    components: {
      GraphDisplayLineChart
    },
    props: ['graphData', 'newValue'], 

    // need to define the data that we are going to use in html
    data() {
      return {
        datacollection: {},
        // threshold: this.newValue
      }
    },

    // get data after DOM is mounted
    mounted() {
      this.fillData()
      // console.log(this.newValue)
    },


    // computed:{
    //   threshold(){
    //     this.fillData()
    //   }
    // },
  

  watch: {
    // whenever question changes, this function will run
    newValue: function () {
      this.fillData()
    }
  },

  // methods defined here
  // we will use newValue
  // we will get part of the props, token from parent, inside charJS graph data strcuture
  methods: {
    fillData() {
      this.datacollection = {
        labels: [...this.graphData["x"]],
        datasets: [{
          label: 'Taiwan',
          backgroundColor: 'rgba(238,238,238,0.2)',
          //=> "x": [1, 2, 3, 2, 1]
          data: this.graphData["x"].map(i => i * (this.newValue +0.2) * 10) 
        }, {
          label: 'Global',
          backgroundColor: 'rgba(119,119,119,0.8)',
          //=> "y": [3, 2, 1, 4, 5]
          data: this.graphData["y"].map(i => i + (this.newValue +0.2) * 10) 
        }]
      }
    },
    // changeThreshold() {
    //   return this.newValue
    // },
    // echo(){
    //   console.log(this.threshold)
    // }
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
