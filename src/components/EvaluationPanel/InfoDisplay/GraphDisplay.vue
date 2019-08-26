<template>
  <div class="container mt-3">
    <vue-c3 :handler="handler" class="bg-color2 rounded"></vue-c3>
    <!-- <button @click="change">XXX</button> -->
  </div>
</template>

<script>
// import vue
import Vue from "vue";
// import c3 related package
import * as d3 from "d3";
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
      // chartTitle: "",
      // xAxisLabel: "",
      // yAxisLabel: "",
      dist: [],
      test2: 0
    };
  },
  created() {
    let vm = this;
    // console.log(this.graphData)
  },
  mounted() {
    this.initData(); // must to initdata first, then init C3 options
    this.handler.$emit("init", this.options); // init C3 options
    // console.table(this.dataColumn[1])
    // console.log(this.handler)
  },
  computed: {
    chartTitle() {
      if (this.graphData.modelType === "multiType") {
        return "ROC Chart";
      } else if (this.graphData.modelType === "binaryModel") {
        return "ROC Chart";
      } else if (this.graphData.modelType === "regression") {
        return "Regression Line";
      }
    },
    xAxisLabel() {
      if (this.graphData.modelType === "multiType") {
        return "1 - Specificity (False Positive Rate)";
      } else if (this.graphData.modelType === "binaryModel") {
        return "1 - Specificity (False Positive Rate)";
      } else if (this.graphData.modelType === "regression") {
        return "independent variable";
      }
    },
    yAxisLabel() {
      if (this.graphData.modelType === "multiType") {
        return "Sensitivity (True Positive Rate)";
      } else if (this.graphData.modelType === "binaryModel") {
        return "Sensitivity (True Positive Rate)";
      } else if (this.graphData.modelType === "regression") {
        return "dependent variable";
      }
    },
    AxisYMax() {
      if (this.graphData.modelType === "multiType") {
        return 1;
      } else if (this.graphData.modelType === "binaryModel") {
        return 1;
      } else if (this.graphData.modelType === "regression") {
        return;
      }
    },
    AxisYMin() {
      if (this.graphData.modelType === "multiType") {
        return 0;
      } else if (this.graphData.modelType === "binaryModel") {
        return 0;
      } else if (this.graphData.modelType === "regression") {
        return;
      }
    },
    tickValue() {
      if (this.graphData.modelType === "multiType") {
        return [0, 0.2, 0.4, 0.6, 0.8, 1];
      } else if (this.graphData.modelType === "binaryModel") {
        return [0, 0.2, 0.4, 0.6, 0.8, 1];
      } else if (this.graphData.modelType === "regression") {
        return;
      }
    },
    type() {
      if (this.graphData.modelType === "multiType") {
        return undefined;
      } else if (this.graphData.modelType === "binaryModel") {
        return undefined;
      } else if (this.graphData.modelType === "regression") {
        return "scatter";
      }
    },
    options() {
      let vm = this;
      return {
        padding: {
          top: 0
        },
        title: {
          show: false,
          text: this.chartTitle,
          position: "top-center", // top-left, top-center and top-right
          padding: {
            top: 20,
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
          columns: this.dataColumn,
          type: this.type,
          types: {
            line: "line"
          },
          colors: {
            line: "orange",
            dependent_y_axis: "#00ff00",
            precision: "#00ff00",
            recall: "orange",
            "ROC curve": "orange"
            // data3: '#0000ff'
          }
        },
        axis: {
          x: {
            show: true,
            tick: {
              values: this.tickValue,
              outer: false
            },
            label: {
              text: this.xAxisLabel,
              position: "outer-center"
            }
          },
          y: {
            show: true,
            max: this.AxisYMax,
            min: this.AxisYMin,
            tick: {
              values: this.tickValue,
              outer: false
            },
            label: {
              text: this.yAxisLabel,
              position: "outer-middle"
            }
          }
        },
        tooltip: {
          // grouped: false,
          format: {
            title(d) {
              // return `第 ${d + 1} 個資料點`;
              return;
            },
            value: function(value, ratio, id) {
              var format = d3.format(".2f");
              return format(value);
            }
          },
          contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
            console.log(d[0].id);
            if (d[0].id === "dependent_y_axis" || d[0].id === "line") {
              // Use default rendering
              let $$ = this;
              let config = $$.config;
              let CLASS = $$.CLASS;
              let titleFormat =
                config.tooltip_format_title || defaultTitleFormat;
              let nameFormat =
                config.tooltip_format_name ||
                function(name) {
                  return name;
                };
              let valueFormat =
                config.tooltip_format_value || defaultValueFormat;
              let text, i, title, value, name, bgcolor;
              name = nameFormat(d[0].name);
              value = valueFormat(d[0].value, d[0].ratio, d[0].id, d[0].index);
              bgcolor = $$.levelColor
                ? $$.levelColor(d[0].value)
                : color(d[0].id);
              // console.log(bgcolor)
              // 另外的資料提供，線到點的距離
              // 50 elt
              let dist = vm.dist;
              // let dist2 = dist.map(i => (i * 10000).toFixed(2));
              // 如果選到 line, 用 inlince css 讓其顯示於外面外
              let pos = "";
              if (d[0].id === "line") {
                pos = `style="position: absolute; top: -1000px;"`;
              } else {
                pos = "";
              }
              // 架設 html
              text = `
                            <table ${pos} class='c3-tooltip'>
                                <tr>
                                    <th colspan='2'> 與回歸線差距 </th>
                                </tr> 
                                <tr class='c3-tooltip-name-${d[0].id}'>
                                    <td class='name'>
                                    <span style='background-color:${bgcolor}'></span>
                                    ${d[0].id}
                                    </td>
                                    <td class='value'>
                                    ${dist[d[0].index]} 
                                    </td>
                                </tr>
                            </table> 
                            `;
              return text;
            } else {
              return this.getTooltipContent(
                d,
                defaultTitleFormat,
                defaultValueFormat,
                color
              );
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
      console.log("this.newThreshold", this.newThreshold);
      this.showAnnotation();
    },
    graphData() {
      // console.log('DD')
      this.initData();
      this.handler.$emit("init", this.options);
    }
  },
  methods: {
    initData() {
      // get data from upper component
      // console.log(this.graphData)
      this.axisSetting = this.graphData["axisSetting"];
      this.dataColumn = this.graphData["dataColumn"];
      // this.chartTitle = this.graphData["ChartTitle"];
      // this.xAxisLabel = this.graphData["xAxisLabel"];
      // this.yAxisLabel = this.graphData["yAxisLabel"];
      this.dist = this.graphData["distFromLine"];
    },
    showAnnotation() {
      console.log("threshold", this.dataColumn[0][this.newThreshold]);
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
.c3-focused .c3-line {
  stroke-width: 5px !important;
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