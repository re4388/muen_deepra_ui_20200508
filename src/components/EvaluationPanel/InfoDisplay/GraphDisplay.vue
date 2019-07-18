<template>
  <div class="small pl-5">
    <GraphDisplayLineChart :chart-data="lineData" :options="options"></GraphDisplayLineChart>
  </div>
</template>

<script>
import GraphDisplayLineChart from "./GraphDisplayLineChart.vue";
export default {
  name: "GraphDisplay",
  components: {
    GraphDisplayLineChart
  },

  props: {
    graphData: {
      type: Object
      // required:true,
    },
    newThreshold: {
      type: Number
      // required:true,
    }
  },

  data() {
    return {
      lineData: {},
      options: {
        title: {
          display: true,
          text: "Precission & Recall ",
          fontSize: 14,
          fontColor: "black"
        },
        tooltips: {
          enabled: true,
          mode: "index",
          axis: "x"
        },
        animation: {
          duration: 0,
          // easing: "easeInOutBack"
          // easing: 'linear',
          // easing: "easeInOutElastic"
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "black",
            fontSize: 16,
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontStyle: "italic"
          }
        }
      }
    };
  },

  mounted() {
    this.fillData();
    // console.log(...this.graphData["x"])
  },

  watch: {
    newThreshold() {
      this.fillData();
    }
  },

  methods: {
    fillData() {
      this.lineData = {
        labels: [0, 0.2, 0.4, 0.6, 0.8, 1],
        datasets: [
          {
            label: "Precision",
            // fill: false,
            borderColor: "rgba(51, 116, 237, 0.5)",
            // backgroundColor: 'rgba(238,238,238,0.2)',  //=> "x": [1, 2, 3, 2, 1]
            // data: [0.45, 0.5, 0.6, 0.7, 0.8, 1],
            data: [...this.graphData["x"]]
            // data: this.graphData["x"].map(i => i * (this.newThreshold) * 10)
          },
          {
            label: "Recall",
            // fill: false,
            borderColor: "rgba(213, 240, 213, 0.8)",
            // backgroundColor: 'rgba(213, 224, 213, 0.5)',   //=> "y": [3, 2, 1, 4, 5]
            // data:[1, 0.75, 0.5, 0.25, 0.1, 0],
            data: [...this.graphData["y"]]
            // data: this.graphData["y"].map(i => i + (this.newThreshold) * 10)
          }
        ]
      };
    }
  }
};
</script>

<style>
.small {
  max-width: 400px;
  max-height: 400px;
  /* margin: 150px auto; */
}
</style>
