<template>
    <div class="container">
        
        
    <svg
    :width="`${width + margin.left + margin.right}`"
    :height="`${height + margin.top + margin.bottom}`"
    >

    <g :transform="`translate(${margin.left},${margin.top})`">
        

    <!-- background Rect -->

        <rect
        stroke="black"
        stroke-width="2px"
        :width="width"
        :height="height"
        >
        

    <!-- rows -->
        <div 
        v-for="(array, index) in confusionMatrix" 
        :key="index"
        class="row"
        >
        <g :transform="`translate(0, ${yScale.index})`">

        <!-- cells -->
            <div
            v-for="(num, index2) in array"
            :key=index2
            class="cell"
            fill="colorMap(index2)" 
            @mouseover="showTooltip(index, index2, $event)"
            @mouseout="hiddenTooltip"
            >
                <rect
                :width="xScale.bandwidth()"
                :height="yScale.bandwidth()"
                >
                <!-- text -->
                    <text
                    font-size="16px"
                    dy=".32em"
                    :x="xScale.bandwidth() / 2"
                    :y="yScale.bandwidth() / 2 "
                    text-anchor="middle"
                    :fill="( num >= maxValue / 2) ? 'white' : 'black'"

                    >
                    {{ num }}
                    </text>
                </rect>
            <g :transform="`translate(${xScale.index}, 0)`">
            </div>
        </div>

        </rect>
        
        <!-- lables -->
        <g
        class="labels"
        >
        <!-- column Labels -->
            <g 
            v-for="(item, index) in labels"
            :key="index"
            class="column-label"
            :transform="`translate(${xScale.index}, ${height})`"
            >
                <line
                stroke="black"
                stroke-width="1px"
                :x1="xScale.bandwidth() / 2"
                :x2="xScale.bandwidth() / 2"
                y1="0"
                y2="5"
                />
                <text
                font-size="16px"
                :x="xScale.bandwidth() * (1 / 5)"
                :y="yScale.bandwidth() * (1 / 2)"
                dy=".22em"
                text-anchor="end"
                transform="rotate(-60)"
                >
                {{ item }}
                </text>
            </g>
        <!-- row Labels -->
            <g 
            v-for="(item, index) in labels"
            :key="index"
            class="row-label"
            :transform="`translate(0, ${yScale.index})`"
            >
                <line
                stroke="black"
                stroke-width="1px"
                :y1="yScale.bandwidth() / 2"
                :y2="yScale.bandwidth() / 2"
                x1="0"
                x2="-5"
                />
                <text
                font-size="16px"
                x="-8"
                :y="yScale.bandwidth() * (1 / 2)"
                dy=".32em"
                text-anchor="end"
                >
                {{ item }}
                </text>
            </g>
        </g>

        <!-- Text -->

            <text
            rotate="30"
            font-size="16px"
            writing-mode="tb"
            x="155"
            y="280"
            dy=".32em"
            text-anchor="end"
            transform="rotate(90,100,100)"
            >
            True Label
            </text>

            <text
            rotate="30"
            font-size="16px"
            writing-mode="tb"
            x="170"
            y="320"
            dy=".32em"
            text-anchor="end"
            transform="rotate(90,100,100)"
            >
            True Label
            </text>


        <!-- tooptip -->
            <div
            :class="{ tooltip: true, hidden: hideTooltip}"
            class="tooltip"
            position="absolute"
            width="60px"
            opacity="0"
            >
            </div>


        
        </svg>




        <div class="file-info"></div>

        <!-- {{ data.thresholdValue[this.newThreshold - 1] }} -->
        <!-- TODO: no show threshold when we hit confution matrix for all -->
        <!-- TODO: show "please select threhold" but not show only zero-->
        <!-- TODO: need to show newThreshold val, so I need to link throshold data to here as well-->
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
            startColor = "#ffffff",
            endColor = "#e67e22",
            confusionMatrix: [
            ...this.matrix
            // ex.
            // [169, 10],
            // [7, 46],
            ],
            lableMatrix:[
            ...this.data.confusionMatrixAnnotation
            // ex.
            // ["img01, img03"],
            // ["no_img", "img05"],
        ],
            labels:[
            ...this.data.confusionMatrixLable
            // ["Class A", "Class B"]
        ],

        };
    },
    created() {
        console.log(this.data.thresholdValue[this.newThreshold - 1]);

        if (this.data.confusionMatrix.length === this.data.lablesNum) {
            this.matrix = this.data.confusionMatrix;
        } else {
            this.matrix = this.data.confusionMatrix[this.newThreshold - 1];
        }
    },
    methods: {
        init(){
            //  //清除坐標軸
            // document.querySelector(".axisX").innerHTML = "";
            // document.querySelector(".axisY").innerHTML = "";
            // // 插入X軸座標
            // d3.select(".axisX").call(this.xAxis);
            // // 插入Y軸座標
            // d3.select(".axisY").call(this.yAxis);
        },

        setAttributes(el, attrs) {
            for(let key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
        },

        showTooltip(index, index2, event) {
            let mouseX = event.clientX + 20;
            let mouseY = event.clientY;

            // 設置位置
            let tooltip = document.querySelector(".tooltip")
            tooltipAttObj = {
                "style":`left: ${mouseX}px; top: ${mouseY}px`,
                "style":"line-height: 20px",
                "style": "background: lightsteelblue",
                "style": "display: inline-block",
                "style": "margin: 10px;",
                "style": "padding-bottom: 10px;",
                "style": "padding-left: 15px;",
                "style": "padding-right: 15px;",
                "style": "border-radius: 20px;",
            }
            this.setAttributes(tooltip, tooltipAttObj)


            // 插入內容
            document.querySelector(
                ".tooltip"
            ).innerHTML = `${this.lableMatrix[index][index2].number} `;

            // 顯示 tooltip
            this.hideTooltip = false;
        },
        hiddenTooltip() {
            this.hideTooltip = true;
        }
    },
    computed:{

        colorMap(){
            return d3
            .scaleLinear()
            .domain([this.minValue, this.maxValue])
            .range([this.startColor, this.endColor]);
        },

        maxValue(){
            return d3.max(this.confusionMatrix, item => {
            return d3.max(item, d => {
                return d;
            });
            })
        },

        minValue(){
            return d3.min(data, item => {
            return d3.min(item, d => {
                return d
            });
            })
        },

        numrows(){
            return data.length; // => 2
        },

        numcols(){
            return data[0].length //2 
        },

        // setup scale
        xScale(){
            return d3
            .scaleBand() // scaleBand
            .domain(d3.range(this.numcols)) // d3.range(numcols) => (0,1)
            .range([0, this.width]); 
        },

        yScale(){
            d3
            .scaleBand()
            .domain(d3.range(this.numrows)) // d3.range(numrows) => (0,1)
            .range([0, this.height]); // height = 250
        }



    },
    mounted() {

        this.init();
        // console.log(...this.data.confusionMatrix)

        // setup svg margin -> done
        // var margin = {
        //     top: 50,
        //     right: 50,
        //     bottom: 100,
        //     left: 100
        // };

        //data assignment
        // var confusionMatrix = [
        //     ...this.matrix
        //     // ex.
        //     // [169, 10, 12, 0, 12],
        //     // [7, 46, 12, 1, 1],
        //     // [1, 2, 3, 33, 0],
        //     // [0, 2, 3, 3, 22],
        //     // [1, 0, 3, 6, 2]
        // ];

        // var lableMatrix = [
        //     ...this.data.confusionMatrixAnnotation
        //     // ex.
        //     // ["img01, img03", "img02,img04", "img23", "no img", "img09"],
        //     // ["no_img", "img05", "img12", "img09", "no img"],
        //     // ["no_img", "img05", "img12", "no img  ", "no img"],
        //     // ["no_img", "img05", "img12", "no img  ", "no img"],
        //     // ["no_img", "img05", "img12", "no img  ", "no img"]
        // ];

        // var labels = [
        //     ...this.data.confusionMatrixLable
        //     // "Class A", "Class B", "Class C", "Class D", "Class E"
        // ];

        // var width = 250,
        //     height = 250,
            // data = confusionMatrix,
            // data2 = lableMatrix,
            // container = "#d3",
            // labelsData = labels,
            // startColor = "#ffffff",
            // endColor = "#e67e22";

        // error checking
        // if (!data) {
        //     throw new Error("Please pass data");
        // }

        // if (!Array.isArray(data) || !data.length || !Array.isArray(data[0])) {
        //     throw new Error("It should be a 2-D array");
        // }

        // var maxValue = d3.max(data, array => {
        //     return d3.max(array, d => {
        //         return d;
        //     });
        // });

        // var minValue = d3.min(data, function(array) {
        //     return d3.min(array, function(d) {
        //         return d;
        //     });
        // });

        // 根據資料結構算row and col
        // for example:
        // [ [169,10],
        // [7 ,46] ];
        // var numrows = data.length; // => 2
        // var numcols = data[0].length; // => 2

        // svg 定義寬和高, need group before translate, http://tutorials.jenkov.com/svg/g-element.html
        // var svg = d3
        //     .select(this.$el)
        //     .select(".d3")
        //     .append("svg")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr(
        //         "transform",
        //         "translate(" + margin.left + "," + margin.top + ")"
        //     );

        // append rect for confution matrix
        // var background = svg
        //     .append("rect")
        //     .style("stroke", "black")
        //     .style("stroke-width", "2px")
        //     .attr("width", width)
        //     .attr("height", height);

        // // setup scale
        // var x = d3
        //     .scaleBand() // scaleBand
        //     .domain(d3.range(numcols)) // d3.range(numcols) => (0,1)
        //     .range([0, width]); // width = 250

        // var y = d3
        //     .scaleBand()
        //     .domain(d3.range(numrows)) // d3.range(numrows) => (0,1)
        //     .range([0, height]); // height = 250

        //選擇所有的roll->綁定data->獲取enter部分(資料比元素多的部份)->平移
        // var row = svg
        //     .selectAll(".row")
        //     .data(data)
        //     .enter()
        //     .append("g")
        //     .attr("class", "row")
        //     .attr("transform", function(d, i) {
        //         return "translate(0," + y(i) + ")";
        //     });

        // 在row裡面選擇所有的cell->顯示數據->enter->translate
        // var cell = row
        //     .selectAll(".cell")
        //     .data(function(d) {
        //         return d;
        //     })
        //     .enter()
        //     .append("g")
        //     .attr("class", "cell")
        //     .attr("transform", function(d, i) {
        //         return "translate(" + x(i) + ", 0)";
        //     });

        // // cell rect
        // cell.append("rect")
        //     .attr("width", x.bandwidth())
        //     .attr("height", y.bandwidth());
        // .style("stroke-width", 1)
        // .style("stroke", 'blue')

        // cell text
        // cell.append("text")
        //     .style("font-size", "16px")
        //     .attr("dy", ".32em") // dy: 距離y點的距離
        //     .attr("x", x.bandwidth() / 2)
        //     .attr("y", y.bandwidth() / 2)
        //     .attr("text-anchor", "middle")
        //     .style("fill", function(d, i) {
        //         // 如果比最大值/2還大，就白色不然就黑色
        //         return d >= maxValue / 2 ? "white" : "black";
        //     })
        //     .text(function(d) {
        //         return d;
        //     });

        // Define the div for the tooltip
        // var div = d3
        //     .select("body")
        //     .append("div")
        //     .attr("class", "tooltip")
        //     // .attr('position','absolute')
        //     // .attr('width','60px')
        //     .style("opacity", 0);

        // console.log(data,data2)

        // Add color

        // colorMap by max, min val and self-defined color
        // var colorMap = d3
        //     .scaleLinear()
        //     .domain([minValue, maxValue])
        //     .range([startColor, endColor]);

        // row.selectAll(".cell")
        //     .data(function(d, i) {
        //         return data[i];
        //     })
        //     .style("fill", colorMap);

        // Add tooltip

        // row
        //   .selectAll(".cell")
        //   .data(function(d, i) {
        //     return data[i];
        //   })
        //   .on("mouseover", function(d, i) {
        //     div
        //       .transition()
        //       .duration(200)
        //       .style("opacity", 1);
        //     div
        //       .html("<br /> File include: " + d)
        //       .style("background", "lightsteelblue")
        //       .style("line-height", "20px")
        //       .style("display", "inline-block")
        //       .style("height", "60px")
        //       // .style('margin','10px')
        //       .style("padding-bottom", "10px")
        //       .style("padding-left", "15px")
        //       .style("padding-right", "15px")
        //       .style("border-radius", "20px")
        //       // .style('text-align','center')
        //       .style("left", d3.event.pageX + "px")
        //       .style("top", d3.event.pageY + "px");
        //   })
        //   .on("mouseout", function(d) {
        //     div
        //       .transition()
        //       .duration(200)
        //       .style("opacity", 0);
        //   });

        // // lable Part
        // var labels = svg.append("g").attr("class", "labels");

        // // col label
        // var columnLabels = labels
        //     .selectAll(".column-label")
        //     .data(labelsData)
        //     .enter()
        //     .append("g")
        //     .attr("class", "column-label")
        //     .attr("transform", function(d, i) {
        //         return "translate(" + x(i) + "," + height + ")";
        //     });

        // columnLabels
        //     .append("line")
        //     .style("stroke", "black")
        //     .style("stroke-width", "1px")
        //     .attr("x1", x.bandwidth() / 2)
        //     .attr("x2", x.bandwidth() / 2)
        //     .attr("y1", 0)
        //     .attr("y2", 5);

        // columnLabels
        //     .append("text")
        //     .style("font-size", "16px")
        //     .attr("x", x.bandwidth() * (1 / 5))
        //     .attr("y", y.bandwidth() * (1 / 2))
        //     .attr("dy", ".22em")
        //     .attr("text-anchor", "end")
        //     .attr("transform", "rotate(-60)")
        //     .text(function(d, i) {
        //         return d;
        //     });

        // // row label
        // var rowLabels = labels
        //     .selectAll(".row-label")
        //     .data(labelsData)
        //     .enter()
        //     .append("g")
        //     .attr("class", "row-label")
        //     .attr("transform", function(d, i) {
        //         return "translate(" + 0 + "," + y(i) + ")";
        //     });

        // rowLabels
        //     .append("line")
        //     .style("stroke", "black")
        //     .style("stroke-width", "1px")
        //     .attr("x1", 0)
        //     .attr("x2", -5)
        //     .attr("y1", y.bandwidth() / 2)
        //     .attr("y2", y.bandwidth() / 2);

        // rowLabels
        //     .append("text")
        //     .style("font-size", "16px")
        //     .attr("x", -8)
        //     .attr("y", y.bandwidth() / 2)
        //     .attr("dy", ".32em")
        //     .attr("text-anchor", "end")
        //     .text(function(d, i) {
        //         return d;
        //     });
        
    }
};
</script>


<style>
</style>

