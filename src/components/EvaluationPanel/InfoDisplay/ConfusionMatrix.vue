<template>
  <div class="container">
    <svg
      :width="`${width + margin.left + margin.right}`"
      :height="`${height + margin.top + margin.bottom}`"
    >
      <g :transform="`translate(${margin.left},${margin.top})`">
        <!-- background Rect -->
        <rect stroke="black" stroke-width="2px" :width="width" :height="height" />

        <!-- rows -->
        <g
          v-for="(arr, key) in confusionMatrix"
          :key="key +'1'"
          :transform="`translate(0, ${yScale(key)})`"
        >
          <!-- cells -->
          <g
            v-for="(num, key2) in arr"
            :key="key2 +'2'"
            :fill="colorMap(num)"
            :transform="`translate(${xScale(key2)}, 0)`"
          >
            <rect :width="xBandwidth" :height="yBandwidth" />
            <!-- text -->
            <text
              font-size="16px"
              dy=".32em"
              :x="xBandwidth / 2"
              :y="yBandwidth / 2"
              text-anchor="middle"
              :fill="( num >= maxValue / 2) ? 'white' : 'black'"
            >{{ num }}</text>
          </g>
        </g>

        <!-- tooptip possibilities -->
        <!--第一種
    https://kabbouchi.github.io/vue-tippy/4.0/demo.html 
    <text 
    // 加入這兩行可以引入tooltip
    :content="showTooptip(key,key2)" 
    v-tippy='{ interactive : true, trigger: "click" }'
    >
    {{ num }}
    </text> 
        -->

        <!--第二種
    https://bootstrap-vue.js.org/docs/directives/popover/#popovers
    <text 
    // 加入這一行是用vuebs4，可以選
    v-b-popover="showTooptip(key,key2)" 
    >
    {{ num }}
    </text> 
        -->

        <!-- lables -->
        <g class="labels">
          <!-- column Labels -->
          <g
            v-for="(item, key) in labels"
            :key="key +'b'"
            class="column-label"
            :transform="`translate(${xScale(key)}, ${height})`"
          >
            <line
              stroke="black"
              stroke-width="1px"
              :x1="xBandwidth/ 2"
              :x2="xBandwidth/ 2"
              y1="0"
              y2="5"
            />
            <text
              font-size="16px"
              :x="xBandwidth * (1 / 5)"
              :y="yBandwidth * (1 / 2)"
              dy=".22em"
              text-anchor="end"
              transform="rotate(-60)"
            >{{ item }}</text>
          </g>
          <!-- row Labels -->
          <g
            v-for="(item, key) in labels"
            :key="key +'a'"
            class="row-label"
            :transform="`translate(0, ${yScale(key)})`"
          >
            <line
              stroke="black"
              stroke-width="1px"
              :y1="yBandwidth / 2"
              :y2="yBandwidth / 2"
              x1="0"
              x2="-5"
            />
            <text
              font-size="16px"
              x="-8"
              :y="yBandwidth * (1 / 2)"
              dy=".32em"
              text-anchor="end"
            >{{ item }}</text>
          </g>
        </g>

        <!-- Text -->

        <text 
        font-size="16px" 
        :x="0.6*width" 
        :y="1.12*height" 
        dy=".32em" 
        text-anchor="end"
        >Predicted Label</text>

        <text
          font-size="16px"
          writing-mode="tb"
          :x=" -0.25* width"
          :y="0.6 * height"
          dy=".32em"
          text-anchor="end"
        >True Label</text>
      </g>
    </svg>

    <!-- {{ data.thresholdValue[this.newThreshold - 1] }} -->
    <!-- TODO: no show threshold when we hit confution matrix for all -->
    <!-- TODO: show "please select threhold" but not show only zero-->
    <!-- TODO: need to show newThreshold val, so I need to link throshold data to here as well-->

    <!-- {{   confusionMatrix  }} -->
  </div>
</template>



<script>
import * as d3 from "d3";

export default {
  name: "ConfusionMatrix",
  props: ["data", "newThreshold"],
  data() {
    return {
      width: 600,
      height: 600,
      margin: {
        top: 50,
        right: 100,
        bottom: 100,
        left: 250
      },
      startColor: "#ffffff",
      endColor: "#e67e22",
      confusionMatrix: null,
      lableMatrix: null,
      labels: null
    };
  },
  mounted() {
    this.init();
  },
  // created() {},
  // updated(){
  //     console.log('')
  // },
  methods: {
    // 顯示toop tip
    // showTooptip(key, key2) {
    //   return this.lableMatrix[key][key2];
    // },

    // 掛載dom時，prop data 進入 data
    init() {
      // console.log(this.data)
      // console.log(...this.data.confusionMatrixLable);
      // console.log(...this.data.confusionMatrix);
      this.confusionMatrix = [...this.data.confusionMatrix];
      this.lableMatrix = [...this.data.confusionMatrixAnnotation];
      this.labels = [...this.data.confusionMatrixLable];
    }
  },
  computed: {
    // setuop color map and related variables
    maxValue() {
      return d3.max(this.confusionMatrix, item => {
        return d3.max(item, d => {
          return d;
        });
      });
    },

    minValue() {
      return d3.min(this.confusionMatrix, item => {
        return d3.min(item, d => {
          return d;
        });
      });
    },

    colorMap() {
      return d3
        .scaleLinear()
        .domain([this.minValue, this.maxValue])
        .range([this.startColor, this.endColor]);
    },

    // setup scale and related variable
    numrows() {
      return this.confusionMatrix.length;
    },

    numcols() {
      return this.confusionMatrix[0].length;
    },

    xScale() {
      return d3
        .scaleBand()
        .domain(d3.range(this.numcols))
        .range([0, this.width]);
    },

    yScale() {
      return d3
        .scaleBand()
        .domain(d3.range(this.numrows))
        .range([0, this.height]);
    },

    xBandwidth() {
      return this.xScale.bandwidth();
    },

    yBandwidth() {
      return this.yScale.bandwidth();
    }
  }
};
</script>


<style scoped>
</style>

