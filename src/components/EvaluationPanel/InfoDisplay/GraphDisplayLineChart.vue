<script>

// get Line and mixins from Vue-Chart.js
  import {
    Line,
    mixins
  } from 'vue-chartjs'

// get reactiveProp from mixins
  const {
    reactiveProp
  } = mixins

  export default {
    extends: Line, // use extends to get the Line chart 
    mixins: [reactiveProp], 
    props: ['options'], 
    mounted() {
      // this.chartData is created in the mixin.
      // If you want to pass options please create a local options object
      this.renderChart(this.chartData, this.options)
    }
  }

</script>
