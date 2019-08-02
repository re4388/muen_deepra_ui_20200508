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
                    <!-- @mouseover="showTooltip(key, key2, $event)"
                    @mouseout="hiddenTooltip"-->
                    <g
                        v-for="(num, key2) in arr"
                        :key="key2 +'2'"
                        :fill="colorMap(num)"
                        :transform="`translate(${xScale(key2)}, 0)`"
                    >
                        <rect  :width="xBandwidth" :height="yBandwidth" />
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
                    x="175"
                    y="345"
                    dy=".32em"
                    text-anchor="end"
                >Predicted Label</text>

                <text
                    
                    font-size="16px"
                    writing-mode="tb"
                    x="-90"
                    y="180"
                    dy=".32em"
                    text-anchor="end"
                    
                >True Label</text>

      <!-- svg.append("text")
            // .attr('rotate', 30)
            .style("font-size", "16px")
            // .style("writing-mode", 'tb')
            .attr("x", 155)
            .attr("y", 280)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .text("True Label")
            .attr("transform", "rotate(90,100,100)"); -->
    
            </g>
        </svg>
        <!-- tooptip -->
        <div
            :class="{ tooltip: true, hidden: hideTooltip}"
            class="tooltip"
            position="absolute"
            width="60px"
            opacity="0"
        />

        <div class="file-info"></div>

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
            hideTooltip: true,
            matrix: null,
            width: 250,
            height: 250,
            margin: {
                top: 50,
                right: 50,
                bottom: 100,
                left: 100
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
    created() {},
    methods: {
        init() {
            // console.log(...this.data.confusionMatrixLable);
            console.log(...this.data.confusionMatrix);
            this.confusionMatrix = [...this.data.confusionMatrix];
            // this.lableMatrix = [...this.data.confusionMatrixAnnotation];
            this.labels = [...this.data.confusionMatrixLable];
        },

        setAttributes(el, attrs) {
            for (let key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
        },

        showTooltip(key, index2, event) {
            let mouseX = event.clientX + 20;
            let mouseY = event.clientY;

            // 設置位置
            let tooltip = document.querySelector(".tooltip");
            tooltipAttObj = {
                style: `left: ${mouseX}px; top: ${mouseY}px`,
                style: "line-height: 20px",
                style: "background: lightsteelblue",
                style: "display: inline-block",
                style: "margin: 10px;",
                style: "padding-bottom: 10px;",
                style: "padding-left: 15px;",
                style: "padding-right: 15px;",
                style: "border-radius: 20px;"
            };
            this.setAttributes(tooltip, tooltipAttObj);

            // 插入內容
            document.querySelector(
                ".tooltip"
            ).innerHTML = `${this.lableMatrix[key][index2].number}`;

            // 顯示 tooltip
            this.hideTooltip = false;
        },

        hiddenTooltip() {
            this.hideTooltip = true;
        }
    },

    computed: {
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


<style>
</style>

