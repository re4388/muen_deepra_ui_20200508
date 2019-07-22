<template>
  <div class="container">
    <div class="d3"></div>
    <div class="file-info"></div>
  </div>
</template>



<script>
import * as d3 from "d3";

export default {
  props: ["data"],
  mounted() {
    // console.log(this.data);

    // setup svg margin
    var margin = {
      top: 50,
      right: 50,
      bottom: 100,
      left: 100
    };

    //data assignment
    var confusionMatrix = [
      ...this.data.confusionMatrix
      // [169, 10, 12, 0, 12],
      // [7, 46, 12, 1, 1],
      // [1, 2, 3, 33, 0],
      // [0, 2, 3, 3, 22],
      // [1, 0, 3, 6, 2]
    ];

    var lableMatrix = [
      ...this.data.lableMatrix
      // ["img01, img03", "img02,img04", "img23", "no img", "img09"],
      // ["no_img", "img05", "img12", "img09", "no img"],
      // ["no_img", "img05", "img12", "no img  ", "no img"],
      // ["no_img", "img05", "img12", "no img  ", "no img"],
      // ["no_img", "img05", "img12", "no img  ", "no img"]
    ];

    var labels = [
      ...this.data.labels
      // "Class A", "Class B", "Class C", "Class D", "Class E"
    ];

    var width = 250,
      height = 250,
      data = confusionMatrix,
      data2 = lableMatrix,
      container = "#d3",
      labelsData = labels,
      startColor = "#ffffff",
      endColor = "#e67e22";

    // error checking
    if (!data) {
      throw new Error("Please pass data");
    }

    if (!Array.isArray(data) || !data.length || !Array.isArray(data[0])) {
      throw new Error("It should be a 2-D array");
    }

    var maxValue = d3.max(data, array => {
      return d3.max(array, d => {
        return d;
      });
    });
    var minValue = d3.min(data, function(array) {
      return d3.min(array, function(d) {
        return d;
      });
    });

    // 根據資料結構算row and col
    // [ [169,10],
    // [7 ,46] ];
    var numrows = data.length; // => 2
    var numcols = data[0].length; // => 2

    // svg 定義寬和高, need group before translate, http://tutorials.jenkov.com/svg/g-element.html
    var svg = d3
      .select(this.$el)
      .select(".d3")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // append rect for confution matrix
    var background = svg
      .append("rect")
      .style("stroke", "black")
      .style("stroke-width", "2px")
      .attr("width", width)
      .attr("height", height);

    // scale
    // rangeBands 可以看做是總長度的分段，有幾個數值，就會分成「數值-1」段
    var x = d3
      .scaleBand() // scaleBand
      .domain(d3.range(numcols)) // d3.range(numcols) => (0,1)
      .range([0, width]); // width = 250

    var y = d3
      .scaleBand()
      .domain(d3.range(numrows)) // d3.range(numrows) => (0,1)
      .range([0, height]); // height = 250

    // colorMap by max, min val and self-defined color
    var colorMap = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([startColor, endColor]);

    //選擇所有的roll->綁定data->獲取enter部分(資料比元素多的部份)->平移
    var row = svg
      .selectAll(".row")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "row")
      .attr("transform", function(d, i) {
        return "translate(0," + y(i) + ")";
      });

    // 在row裡面選擇所有的cell->顯示數據->enter->translate
    var cell = row
      .selectAll(".cell")
      .data(function(d) {
        return d;
      })
      .enter()
      .append("g")
      .attr("class", "cell")
      .attr("transform", function(d, i) {
        return "translate(" + x(i) + ", 0)";
      });

    // console.log(cell)

    // 設定cell為rect
    cell
      .append("rect")
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth());
    // .style("stroke-width", 1)
    // .style("stroke", 'blue')

    // cell 加上text
    cell
      .append("text")
      .style("font-size", "16px")
      .attr("dy", ".32em") // dy: 距離y點的距離
      .attr("x", x.bandwidth() / 2)
      .attr("y", y.bandwidth() / 2)
      .attr("text-anchor", "middle")
      .style("fill", function(d, i) {
        // 如果比最大值/2還大，就白色不然就黑色
        return d >= maxValue / 2 ? "white" : "black";
      })
      .text(function(d) {
        return d;
      });

    // Define the div for the tooltip
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      // .attr('position','absolute')
      // .attr('width','60px')
      .style("opacity", 0);

    // console.log(data,data2)

    // Add color & tooltip
    row
      .selectAll(".cell")
      .data(function(d, i) {
        return data[i];
      })
      .style("fill", colorMap)
      .data(function(d, i) {
        return data2[i];
      })
      .on("mouseover", function(d, i) {
        div
          .transition()
          .duration(200)
          .style("opacity", 1);
        div
          .html("<br /> File include: " + d)
          .style("background", "lightsteelblue")
          .style("line-height", "20px")
          .style("display", "inline-block")
          .style("height", "60px")
          // .style('margin','10px')
          .style("padding-bottom", "10px")
          .style("padding-left", "15px")
          .style("padding-right", "15px")
          .style("border-radius", "20px")
          // .style('text-align','center')
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function(d) {
        div
          .transition()
          .duration(200)
          .style("opacity", 0);
      });

    // lable Part

    var labels = svg.append("g").attr("class", "labels");

    // col 的label
    var columnLabels = labels
      .selectAll(".column-label")
      .data(labelsData)
      .enter()
      .append("g")
      .attr("class", "column-label")
      .attr("transform", function(d, i) {
        return "translate(" + x(i) + "," + height + ")";
      });

    // 標籤上面那兩個小小的線, 線的顏色和寬，和線的(x1,y1) (x2,y2)
    columnLabels
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .attr("x1", x.bandwidth() / 2)
      .attr("x2", x.bandwidth() / 2)
      .attr("y1", 0)
      .attr("y2", 5);

    // text的位置 x,y圓點, 用dy定義y的位置
    columnLabels
      .append("text")
      .style("font-size", "16px")
      .attr("x", x.bandwidth() * (1 / 5))
      .attr("y", y.bandwidth() * (1 / 2))
      .attr("dy", ".22em")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-60)")
      .text(function(d, i) {
        return d;
      });

    // row label
    var rowLabels = labels
      .selectAll(".row-label")
      .data(labelsData)
      .enter()
      .append("g")
      .attr("class", "row-label")
      .attr("transform", function(d, i) {
        return "translate(" + 0 + "," + y(i) + ")";
      });

    rowLabels
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .attr("x1", 0)
      .attr("x2", -5)
      .attr("y1", y.bandwidth() / 2)
      .attr("y2", y.bandwidth() / 2);

    rowLabels
      .append("text")
      .style("font-size", "16px")
      .attr("x", -8)
      .attr("y", y.bandwidth() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function(d, i) {
        return d;
      });
  }
};
</script>


<style>
</style>

