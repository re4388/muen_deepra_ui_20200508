<template>
  <div class="container mt-3">
    <vue-c3 :handler="handler" class="bg-color2 rounded"></vue-c3>
  </div>
</template>

<script>
// import backend data
import deepraData_10 from "../deepra.10Class.json";
console.log(deepraData_10["metrics"]["precision_prcurve"]["0"]);

// import vue
import Vue from "vue";

// import c3 related package
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
      handler: new Vue() // C3 handler
    };
  },

  mounted() {
    this.handler.$emit("init", this.options); // init C3 options
  },
  computed: {
    // c3 options, data和各種設定都在這邊，動態的所以放在computed
    options() {
      return {
        data: {
          // size: {
          //   height: 600,
          //   width: 600
          // },
          title: {
            text: "My Title"
          },
          xs: {
            "tpr_roccurve of class 9": "fpr_roccurve of class 9",
            "tpr_roccurve of class 8": "fpr_roccurve of class 8",
            "tpr_roccurve of class 7": "fpr_roccurve of class 7",
            "tpr_roccurve of class 6": "fpr_roccurve of class 6",
            "tpr_roccurve of class 5": "fpr_roccurve of class 5",
            "tpr_roccurve of class 4": "fpr_roccurve of class 4",
            "tpr_roccurve of class 3": "fpr_roccurve of class 3",
            "tpr_roccurve of class 2": "fpr_roccurve of class 2",
            "tpr_roccurve of class 1": "fpr_roccurve of class 1",
            "tpr_roccurve of class 0": "fpr_roccurve of class 0"
          },
          columns: [
            [
              "fpr_roccurve of class 0",
              ...deepraData_10["metrics"]["fpr_roccurve"]["0"]
            ],
            [
              "tpr_roccurve of class 0",
              ...deepraData_10["metrics"]["tpr_roccurve"]["0"]
            ],
            [
              "fpr_roccurve of class 1",
              ...deepraData_10["metrics"]["fpr_roccurve"]["1"]
            ],
            [
              "tpr_roccurve of class 1",
              ...deepraData_10["metrics"]["tpr_roccurve"]["1"]
            ],
            [
              "fpr_roccurve of class 2",
              ...deepraData_10["metrics"]["fpr_roccurve"]["2"]
            ],
            [
              "tpr_roccurve of class 2",
              ...deepraData_10["metrics"]["tpr_roccurve"]["2"]
            ],
            [
              "fpr_roccurve of class 3",
              ...deepraData_10["metrics"]["fpr_roccurve"]["3"]
            ],
            [
              "tpr_roccurve of class 3",
              ...deepraData_10["metrics"]["tpr_roccurve"]["3"]
            ],
            [
              "fpr_roccurve of class 4",
              ...deepraData_10["metrics"]["fpr_roccurve"]["4"]
            ],
            [
              "tpr_roccurve of class 4",
              ...deepraData_10["metrics"]["tpr_roccurve"]["4"]
            ],
            [
              "fpr_roccurve of class 5",
              ...deepraData_10["metrics"]["fpr_roccurve"]["5"]
            ],
            [
              "tpr_roccurve of class 5",
              ...deepraData_10["metrics"]["tpr_roccurve"]["5"]
            ],
            [
              "fpr_roccurve of class 6",
              ...deepraData_10["metrics"]["fpr_roccurve"]["6"]
            ],
            [
              "tpr_roccurve of class 6",
              ...deepraData_10["metrics"]["tpr_roccurve"]["6"]
            ],
            [
              "fpr_roccurve of class 7",
              ...deepraData_10["metrics"]["fpr_roccurve"]["7"]
            ],
            [
              "tpr_roccurve of class 7",
              ...deepraData_10["metrics"]["tpr_roccurve"]["7"]
            ],
            [
              "fpr_roccurve of class 8",
              ...deepraData_10["metrics"]["fpr_roccurve"]["8"]
            ],
            [
              "tpr_roccurve of class 8",
              ...deepraData_10["metrics"]["tpr_roccurve"]["8"]
            ],
            [
              "fpr_roccurve of class 9",
              ...deepraData_10["metrics"]["fpr_roccurve"]["9"]
            ],
            [
              "tpr_roccurve of class 9",
              ...deepraData_10["metrics"]["tpr_roccurve"]["9"]
            ]
          ]
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
              text: "1 - Specificity (False Positive Rate)",
              position: "outer-center"
              // textColor: 'white',
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
              text: "Sensitivity (True Positive Rate)",
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
            value(value, ratio, id) {
              return `${value} `;
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
          position: "bottom"
        }
      };
    }
  },

  watch: {
    newThreshold() {
      // console.log(this.newThreshold)
      // this.showAnnotation();
    }
  },

  methods: {
    // showAnnotation() {
    //   this.handler.$emit("dispatch", chart => {
    //     chart.tooltip.show({
    //       x: this.newThreshold
    //     });
    //   });
    // }
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
