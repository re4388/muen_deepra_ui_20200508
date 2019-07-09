<template>
  <div id="imag-vue-panel" class="container">
      <div style="display:flex; flex-direction:column; align-items: center; flex-direction: column;" class="imageProcessing">
        <div style="display:flex; margin-bottom:15px; justify-content: flex-start;" class="toolList">
          <!-- <h1><input type="checkbox" v-model="isOpenFilters" />Open Filters</h1> -->
          <button class="filterBtn">width: {{filters.width}}%<input type="range" name="width" min="200" max="760" v-model="filters.width"/></button>
          <button class="filterBtn">height: {{filters.height}}% <input type="range" name="height" min="200" max="760" v-model="filters.height"/></button>
          <button class="filterBtn">Contrast: {{filters.contrast}}% <input type="range" name="contrast" min="0" max="100" v-model="filters.contrast"/></button>
          <button class="filterBtn">Brightness: {{filters.brightness}}% <input type="range" name="brightness" min="0" max="1000" v-model="filters.brightness"/></button>
          <button class="filterBtn">Grayscale: {{filters.grayscale}}% <input type="range" name="grayscale" min="0" max="100" v-model="filters.grayscale"/></button>
          <!-- <button class="filterBtn">Hue-rotate: {{filters.rotate}}deg <input type="range" name="rotate" min="0" max="360" v-model="filters.rotate"/></button> -->
          <button class="filterBtn">Opacity: {{filters.opacity}}% <input type="range" name="opacity" min="0" max="100" v-model="filters.opacity"/></button>
          <!-- <button class="filterBtn">Invert: {{filters.invert}}% <input type="range" name="invert" min="0" max="100" v-model="filters.invert"/></button> -->
          <!-- <button class="filterBtn">Saturate: {{filters.saturate}}% <input type="range" name="saturate" min="0" max="100" v-model="filters.saturate"/></button> -->
          <!-- <button class="filterBtn">Sepia: {{filters.sepia}}% <input type="range" name="sepia" min="0" max="100" v-model="filters.sepia"/></button> -->
          <!-- drop-shadow<textarea name="" id="" cols="30" rows="10" v-model="dropShadowJson"></textarea> -->
          <!-- <button>Click me</button> -->
          <button class="filterBtn">Brightness: {{filters.brightness}}% <input type="range" name="brightness" min="0" max="100" v-model="filters.brightness"/></button>
          <button class="filterBtn">Grayscale: {{filters.grayscale}}% <input type="range" name="grayscale" min="0" max="100"/></button>
          <button class="filterBtn">Grayscale: {{filters.grayscale}}% <input type="range" name="grayscale" min="0" max="100"/></button>
          <button class="filterBtn">Grayscale: {{filters.grayscale}}% <input type="range" name="grayscale" min="0" max="100"/></button>
          <button class="filterBtn">Grayscale: {{filters.grayscale}}% <input type="range" name="grayscale" min="0" max="100"/></button>
          <button class="filterBtn">Grayscale: {{filters.grayscale}}% <input type="range" name="grayscale" min="0" max="100"/></button>
          <button class="filterBtn">Grayscale: {{filters.grayscale}}% <input type="range" name="grayscale" min="0" max="100"/></button>
        </div>
        <imagvue
          v-model="url"
          :filters="isOpenFilters"
          :onerror="()=>url='https://i.stack.imgur.com/cl91I.png'"
          :width="filters.width" 
          :height="filters.height"
          :brightness="filters.brightness"
          :contrast="filters.contrast"
          :grayscale="filters.grayscale"
          :hue-rotate="filters.rotate"
          :opacity="filters.opacity"
          :invert="filters.invert"
          :saturate="filters.saturate"
          :sepia="filters.sepia"
          :customData="customData()"
        >
          <transition-group src="https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif" :lazy="1000"></transition-group>
        </imagvue>
      </div>
      
  </div>
</template>
<script>
// import ScrollUp from 'vue-scroll-up';
import imagvue from "imagvue";
// import * as sharp from "sharp"

// console.log(sharp)

export default {
  name: "ImagVuePanel",
  components:{
    imagvue,
  },
  data(){
    return{
      isOpenFilters: true ,
      dropShadowJson:
      {
        // "offset": 16,
        // "blurRadius": 16,
        // "spreadRadius": 10,
        // "color": "#54bf8e"
        offset: 16,
        blurRadius: 16,
        spreadRadius: 10,
        color: "#000000"
      },
      filters: {
        width: 700,
        height: 700,
        contrast: 100,
        brightness: 100,
        grayscale: 0,
        rotate: 0,
        opacity: 100,
        invert: 0,
        saturate: 100,
        sepia: 0,
      },
      tooltip: false,
      url: 'https://www.displaydaily.com/images/2017/October/SID_Vehicle_Displays/XRay.jpg',
      errorURL:'https://cdn.browshot.com/static/images/not-found.png',
      loadUrls:[
        {url:'https://goo.gl/PxTSno' , lazy:'https://goo.gl/aiwqia'},
        {url:'https://goo.gl/K1kZWk' , lazy:'https://goo.gl/vnHTAh'},
        {url:'https://goo.gl/gTZMkF' , lazy:'https://goo.gl/K1Mheq'},
        {url:'https://goo.gl/PxTSno1' , lazy:'https://goo.gl/aiwqia'},
      ]
    }
  },
  computed:{
    dropShadow(){
      return this.dropShadowJson
    }
  },
  methods:{
    onLoadEvent(){
      console.log("Image on load!");
    },
    customData(){
      return {
        on: {
          load: this.onLoadEvent,
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
h1{
  color: royalblue;
}

#imag-vue-panel {
  // border: 1px solid red;  
  margin: 0px;
  padding: 0px;
}

.filterBtn {
  box-sizing: border-box;
  background: rgb(231, 231, 231);
  padding: 15px;
  text-align: center;
  border-style: none;
  align-items: center;
  flex-direction: column;
  border-radius: 2px;
  display: hidden;
  width: 137px;
  z-index: 15;
}

.filterBtn:hover{
  background: rgb(194, 194, 194);
}

.flex-direction {
  align-items: center; 
  flex-direction: column;
}

.toolList{
  background: white;
}

.imageProcessing {
  margin-left: 630px;
}
</style>