<template>
  <div id="imag-vue-panel" class="container">
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-fill bd-highlight">Flex item with a lot of content</div>
      <div class="p-2 flex-fill bd-highlight">Flex item</div>
      <div class="p-2 flex-fill bd-highlight">Flex item</div>
    </div>




    <div class="main__viewer d-flex-clumn">
      <div><ul class="drop-down-menu d-flex">
            <li><a href="#"><img class="img__icon" src="../../assets/zoom_in.png"></a>
              <ul>
                <li><button class="filterBtn">{{filters.width}}% </br><input type="range" name="width" min="100" max="200" v-model="filters.width"/></button></li>
              </ul>
            </li>
            <li><a href="#"><img class="img__icon" src="../../assets/zoom_out.png"></a>
              <ul>
                <li><button class="filterBtn">{{filters.height}}% </br><input type="range" name="height" min="100" max="200" v-model="filters.height"/></button></li>
              </ul>
            </li>
            <li><a href="#"><img class="img__icon" src="../../assets/settings_brightness.png"></a>
              <ul>
                <li><button class="filterBtn">{{filters.contrast}}% </br><input type="range" name="contrast" min="0" max="150" v-model="filters.contrast"/></button></li>
              </ul>
            </li>
            <li><a href="#"><img class="img__icon" src="../../assets/brightness.png"></a>
              <ul>
                <li><button class="filterBtn">{{filters.brightness}}% </br><input type="range" name="brightness" min="0" max="150" v-model="filters.brightness"/></button></li>
              </ul>
            </li>
            <li><a href="#"><img class="img__icon" src="../../assets/invert_colors.png"></a>
              <ul>
                <li><button class="filterBtn">{{filters.grayscale}}% </br><input type="range" name="grayscale" min="0" max="100" v-model="filters.grayscale"/></button></li>
              </ul>
            </li>
          <li><a href="#"><img class="img__icon" src="../../assets/opacity.png"></a>
              <ul>
                <li><button class="filterBtn">{{filters.opacity}}%<input type="range" name="opacity" min="0" max="100" v-model="filters.opacity"/></button></li>
              </ul>
            </li>
            <li><a href="#"><img class="img__icon" src="../../assets/grid_on.png"></a></li>
            <li><a href="#"><img class="img__icon" src="../../assets/crop_free.png"></a></li>
            <li><a href="#"><img class="img__icon" src="../../assets/crop.png"></a></li>
            <li><a href="#"><img class="img__icon" src="../../assets/rotate_left.png"></a></li>
            <li><a href="#"><img class="img__icon" src="../../assets/rotate_right.png"></a></li>
            <li><a href="#"><img class="img__icon" src="../../assets/file_copy.png"></a></li>
            <li><a href="#"><img class="img__icon" src="../../assets/undo.png"></a></li>
              <!-- <button class="filterBtn">Invert: {{filters.invert}}% <input type="range" name="invert" min="0" max="100" v-model="filters.invert"/></button>
              <button class="filterBtn">Saturate: {{filters.saturate}}% <input type="range" name="saturate" min="0" max="100" v-model="filters.saturate"/></button>
              <button class="filterBtn">Sepia: {{filters.sepia}}% <input type="range" name="sepia" min="0" max="100" v-model="filters.sepia"/></button>
              <drop-shadow<textarea name="" id="" cols="30" rows="10" v-model="dropShadowJson"></textarea>
              <button>Click me</button> -->
        </ul>       
      </div>
   <div class="imageProcessing d-flex">
        <imagvue class="imgExample"
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
        width: 150,
        height: 150,
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
  margin: 0px;
  padding: 0px;
  height: 100%;
}

.container {
  flex-direction: column;
  margin-right: 150px;
  justify-content: center;
  width: 1800px;
}

.main__viewer {
  width: 100%;
}

.imgExample {
  border: 1px solid red;
}

.filterBtn {
  box-sizing: border-box;
  background: rgb(231, 231, 231);
  border-style: none;
  justify-items: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.imageProcessing {
  flex-direction:column; 
  align-items: center; 
}

.drop-down-menu {
  border: 1px solid red;
  height: 50px;
}

.btn__tool {
  display: flex;
  border: 1px solid red;
  justify-content: flex-start; 
  width: auto;
}

ul { 
/* 取消ul預設的內縮及樣式 */
  margin: 0;
  padding: 0;
  list-style: none;
}

ul.drop-down-menu {
  display: flex;
  background: rgb(231, 231, 231);
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 20px;
}

ul.drop-down-menu li {
  position: relative;
  width: 100%;

}

ul.drop-down-menu > li:last-child {
  border-right: none;
}

ul.drop-down-menu > li {
  float: left; /* 只有第一層是靠左對齊*/
}

ul.drop-down-menu a {
  background-color: #fff;
  color: #333;
  display: block;
  padding: 0px 30px;
  text-decoration: none;
  line-height: 50px;
  text-align: center;
}

ul.drop-down-menu a:hover { /* 滑鼠滑入按鈕變色*/
  background-color: rgb(194, 194, 194);
  border-radius: 3px;
}
    
ul.drop-down-menu li:hover > a { /* 滑鼠移入次選單上層按鈕保持變色*/
  background-color: rgb(194, 194, 194);
}

ul.drop-down-menu li:hover > ul { /* 滑鼠滑入展開次選單*/
  display: block;
}

ul.drop-down-menu ul { /*隱藏次選單*/
  display: none;
}

ul.drop-down-menu ul li:last-child {
  border-bottom: none;
}

ul.drop-down-menu ul ul { /*第三層以後的選單出現位置與第二層不同*/
  z-index: 10;
  top: 10px;
  left: 90%;
}
    
// @media (min-width: 1760px) {
//   .container {
//     min-width: 1760px;
//   }
// }

// .toolBar {
//   display: flex;
//   float: left;
//   background: rgb(255, 255, 255);
//   width: 100%;
//   margin: 0;
//   padding: 0;
// }

// .btn {
//   background: rgb(231, 231, 231);
//   display: flex;
//   text-align: center;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 5px 50px;
//   z-index: 12;
//   box-sizing: border-box;  
//   justify-content: space-between;
// }

// .btn:hover{
//   background: rgb(194, 194, 194);
// }

// .img__icon {
//   display: flex;
//   padding: 6px 10px;
//   text-align: center;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// }


</style>