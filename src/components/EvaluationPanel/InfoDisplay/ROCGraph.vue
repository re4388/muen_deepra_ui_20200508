<template>
  <div>
    <div id="roc">
  
    <div>

    </div>
    
    <!-- SVG -->
    <svg 
    :width="`${width + margin.left + margin.right}`" 
    :height="`${height + margin.top + margin.bottom}`">
      
    <g :transform ="`translate(${margin.left},${margin.top})`">

        
    <!-- Line -->
      <path
        class="line"
        v-for="(line, index) in lines"
        :key="index"
        fill="none"
        stroke-width="1"
        :d="line"
        :stroke="colorScale(index)"
        />


    <!-- :transform="`translate(0,${ height })`" -->
    <!-- transform="translate(0,310)" -->
      <!-- X軸座標 -->
      <g
        class="axisX"
        :transform="`translate(0,${ height })`"
        fill="none"
        font-size="10"
        font-family="sans-serif"
        text-anchor="middle"
      />

      <!-- Y軸座標  -->
      <g
        class="axisY"
        fill="none"
        font-size="10"
        font-family="sans-serif"
        text-anchor="end"
      />


      <!-- X axis label-->
      <text
      :transform="`translate(${ width / 2},
      ${height + margin.top + 20 })`"
      text-anchor="middle"
      font-size="16px"
      >
      False Negative Rate
      </text>


      <!-- Y axis label -->
      <text
      transform="rotate(-90)"
      :y="`${ -margin.left }`"
      :x="`${ - (height / 2)}`"
      dy="1em"
      font-size="16px"
      text-anchor="middle"
      >
      True Positive Rate
      </text>


      <!-- title -->
      <!-- <text
      :y="`${ - (margin.top / 2) }`"
      :x="`${ width / 2 }`"
      font-size="16px"
      text-anchor="middle"
      >
      ROC Curve for {{ topic }}
      </text>
      -->


      </g>



    </svg>

      <!-- legend 區域 -->

      <!-- 如果需要縮放的 width="300px" height="200px" viewBox="0 0 600 400" -->
      <svg width="200px" :height="height " >

      <g 
      class="legendOrdinal" 
      font-size="16px"
      transform="translate(20,50)">
      </g>

      </svg>


  </div>
  </div>
</template>



<script>
//導入d3
import * as d3 from 'd3'

//導入d3 legend plug-in
import d3legend from 'd3-svg-legend'

//導入資料
import data from './ROC_data.js'
// console.log(data)


export default {
  name:'ROCGraph',
  data(){
    return {
      topic:'TEST DATA',
      dataSet:data,
      margin:{
        top:30,
        right:20,
        bottom:70,
        left:70
      },
    }
  },
  mounted(){
    // console.log(height)
    this.init()
  },
  methods:{
    init(){
      //清除坐標軸
      document.querySelector(".axisX").innerHTML = "";
      document.querySelector(".axisY").innerHTML = "";
      // 插入X軸座標
      d3.select(".axisX").call(this.xAxis);
      // 插入Y軸座標
      d3.select(".axisY").call(this.yAxis);

       //插入legend
      d3.select("svg .legendOrdinal").call(this.legendOrdinal);
    },

    // this function rearrange AOC and lable array
    // return formated legend 
    legendArray() {
        let newArray = []

        for (let i = 0; i < this.labelArray.length - 2; i++) {
          const elt1 = this.labelArray[i+1];
          const elt2 = this.AOCArray[i]
          newArray.push(`${elt1} ( AOC = ${elt2})`)
        }
        
        newArray.push('Baseline')
        newArray.unshift('')

        return newArray
  
    }
  },
    computed:{
    
    labelArray(){
      return ['', 'class 0', 'class 1', 'class 2', 'class 3', 'Baseline']
    },

    AOCArray(){
      return [0.91,0.72,0.61,0.21]
    },
    

    lables(){

      // return catetogey dynamically
      // return Object.keys(this.dataSet[0])

      // for test purpose


      // return [ '','class 0', 'class 1', 'class 2', 'class 3','Baseline' ] 
      let x = this.legendArray()
      return x


      // return []
      // let all_lable = Object.keys(this.dataSet[0])
      // all_lable.pop() // remove the diagonal line one and first one
      // all_lable.shift() 
      // return all_lable
    },


    // 設定legned shape, padding 另外套用顏色
    legendOrdinal(){
      return d3legend.legendColor()
      // other options includs: symbolCircle, d3.symbolCross, d3.symbolDiamond, 
      // d3.symbolSquare, d3.symbolStar, d3.symbolTriangle, d3.symbolWye, 
      .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
      .shapePadding(25)
      //use cellFilter to hide the "e" cell
      .cellFilter(function(d){ return d.label !== "e" })
      // 依照上面設定的顏色尺度去進行scale
      .scale(this.colorScaleLegend); 
    },
    
    // 設定legned色階或是顏色
    colorScaleLegend(){
      return d3.scaleOrdinal()
    .domain(this.lables)
    .range([ "white", "rgb(56, 106, 197)", "rgb(93, 199, 76)", 
    "rgb(223, 199, 31)", "rgb(234, 118, 47)","steelblue"]);
    },


    // .range([ "white", "rgb(56, 106, 197)", "rgb(93, 199, 76)", 
    // "rgb(223, 199, 31)", "rgb(234, 118, 47)","rgb(69, 196, 177)", 
    // "rgb(189, 107, 107)","rgb(144, 189, 107)","rgb(196, 133, 69)",
    // "rgb(69, 177, 196)","rgb(128, 69, 196)","rgb(196, 69, 164)"]);
    // },

    //設定線條色階或是顏色
    colorScale(){
    return d3.scaleOrdinal()
    .domain(this.lables)
    .range([ "white", "rgb(56, 106, 197)", "rgb(93, 199, 76)", 
    "rgb(223, 199, 31)", "rgb(234, 118, 47)","steelblue"]);
    },

    // 寬和高設定
    width(){
      return 450 - this.margin.left - this.margin.right
    },
    height(){
      return 350 - this.margin.top - this.margin.bottom
    },

    // 線性比例縮放
    xScale(){
      return d3.scaleLinear().domain([0, 1]).range([0, this.width]);
    },
    yScale(){
      return d3.scaleLinear().domain([0, 1]).range([this.height, 0]);
    },

    // X, Y軸設定
    xAxis(){
      return d3.axisBottom(this.xScale)
    },
    yAxis(){
      return d3.axisLeft(this.yScale)
    },

    lines(){
      // get lables
      let lables = Object.keys(this.dataSet[0])

      // get first one as ref
      let ref = lables[0]

      let lineArray = []

      // push each line into lineArray
      for (const lable of lables) {
        lineArray.push(
        d3.line()
        .curve(d3.curveBasis)
        .x( d => this.xScale(d[ref]))
        .y( d => this.yScale(d[lable]))(this.dataSet)
        )
      }
      return lineArray
    },
  } 
  
};
</script>


<style scoped>
</style>

