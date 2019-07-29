<template>
  <div class="container mt-3">
    <vue-c3 :handler="handler" class="bg-color2 rounded"></vue-c3>
  </div>
</template>

<script>
// import backend data
import deepraData_10 from "../deepra.10Class.json";
// console.log(deepraData_10["metrics"]["precision_prcurve"]["0"]);

// import vue
import Vue from "vue";

// import c3 related package
import * as d3 from 'd3'
import VueC3 from "vue-c3";
import "c3/c3.min.css";

export default {
  name: "GraphDisplay2",
  components: {
    VueC3
  },

  props: {
    graphData: {
      type: Object
    },
    newThreshold: {
      type: Number
    }
  },

  data() {
    return {
      handler: new Vue(), // C3 handler
      axisSetting: {}, // c3 axis setting
      dataColumn: [], // c3 data
      chartTitle:"",
      xAxisLabel:'',
      yAxisLabel:'',
    };
  },
  mounted() {
    this.initData(); // must to initdata first, then init C3 options
    this.handler.$emit("init", this.options); // init C3 options
  },
  computed: {
    // c3 options, data和各種設定都在這邊，動態的所以放在computed
    options() {
      return {
        padding: {
        top: 0
      },
        title: {
        show: false,
        text: this.chartTitle,
        position: 'top-center',   // top-left, top-center and top-right
        padding: {
          top: 3,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
        data: {
          size: {
            height: 1200,
            width: 1200
          },
          xs: this.axisSetting,
          columns: this.dataColumn
        },
        // https://primer.style/css/support/color-system
        // color: {
        //   pattern: ["#24292e", "#d1d5da"]
        // },
        axis: {
          x: {
            padding: {
              left: 0,
              right: 0.1
            },
            // height: 50,
            show: true,
            tick: {
              values: [0, 0.2, 0.4, 0.6, 0.8, 1],
              outer: false
            },
            label: {
              text: this.xAxisLabel,
              position: "outer-center"
              
            }
          },
          y: {
            show: true,
            max: 1,
            min: 0,
            tick: {
              values: [0, 0.2, 0.4, 0.6, 0.8, 1],
              outer: false
            },
            label: {
              text: this.yAxisLabel,
              position: "outer-middle"
            }
          }
        },
        tooltip: {
          format: {
            title(d) {
              // return `第 ${d + 1} 個資料點`;
              return;
            },
            value: function (value, ratio, id) {
              var format = d3.format('.2f');
              return format(value);
            }   
          }
        },
        point: {
          show: false
        },
        grid: {
          x: {
            show: false
          },
          y: {
            show: false
          }
        },
        legend: {
          show: true,
          position: "right"
        }
      };
    }
  },

  watch: {
    newThreshold() {
      console.log("this.newThreshold", this.newThreshold)
      this.showAnnotation();
    }
  },
  methods: {
    initData() {
      // get data from upper component
      // console.log(this.graphData)
      this.axisSetting = this.graphData["axisSetting"];
      this.dataColumn = this.graphData["dataColumn"];
      this.chartTitle = this.graphData["ChartTitle"];
      this.xAxisLabel = this.graphData["xAxisLabel"];
      this.yAxisLabel = this.graphData["yAxisLabel"];
      
    },

    showAnnotation() {
      console.log("threshold",this.dataColumn[0][this.newThreshold])
      this.handler.$emit("dispatch", chart => {
        chart.tooltip.show({
          x: this.dataColumn[0][this.newThreshold]
        });
      });
    }
  }
};
</script>

<style>
.bg-color2 {
  background-color: #696969;
}

.c3-axis-x-label {
  /* background-color: white; */
  /* color: white; */
  /* stroke:yellowgreen;  */
  /* stroke-width: 0.5px */
  fill: white;
}

.c3-axis-y-label {
  fill: white;
}

/* .c3-text { stroke:yellow !important; 
} */
</style>
