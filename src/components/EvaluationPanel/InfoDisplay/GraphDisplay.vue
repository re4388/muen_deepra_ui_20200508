<template>
  <div class="container mt-3">
    <vue-c3 :handler="handler"></vue-c3>
  </div>
</template>

<script>
import Vue from "vue";
import VueC3 from "vue-c3";
import "c3/c3.min.css";

import { CLIENT_RENEG_LIMIT } from "tls";
export default {
  name: "GraphDisplay",
  components: {
    VueC3
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
      handler: new Vue() // C3 handler
    };
  },

  mounted() {
    this.handler.$emit("init", this.options); // C3, need to init first
  },
  computed: {
    // c3 options, data和各種設定都在這邊，動態的所以放在computed
    options() {
      return {
        data: {
          columns: [
            ["Precision", ...this.graphData["x"]],
            ["Recall", ...this.graphData["y"]]
          ]
        },
        axis: {
          x: {
            show: true,

            label: {
              text: "Score threshold",
              position: "outer-center"
            }
          },
          y: {
            show: true,
            label: {
              text: "Precision / Recall",
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
          position: "bottom"
        }
      };
    }
  },

  watch: {
    newThreshold() {
      this.showAnnotation();
    }
  },

  methods: {
    showAnnotation() {
      this.handler.$emit("dispatch", chart => {
        chart.tooltip.show({
          x: this.newThreshold
        });
      });
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
