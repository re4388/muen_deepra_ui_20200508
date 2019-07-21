<template>
  <div id="tool-bar">
    <ul class="drop-down-menu d-flex justify-content-center">
      <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/zoom_in.png"></div></a>
        <ul>
          <li><div class="filter">{{filters.width}}% </br>
            <input 
              type="range" 
              name="width" 
              min="100" 
              max="800" 
              v-model="filters.width" 
              onchange="console.log(this.value)"
            /></div>
          </li>
        </ul>
      </li>
      <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/settings_brightness.png"></div></a>
        <ul>
          <li><div class="filter">{{filters.contrast}}% </br>
            <input 
              class="inputControl" 
              type="range" 
              name="contrast" 
              min="0" 
              max="150" 
              v-model="filters.contrast"
            /></div>
          </li>
        </ul>
      </li>
      <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/brightness.png"></div></a>
        <ul>
          <li><div class="filter">{{filters.brightness}}% </br>
            <input 
              type="range" 
              name="brightness" 
              min="0" 
              max="150" 
              v-model="filters.brightness"
            /></div>
          </li>
        </ul>
      </li>
      <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/invert_colors.png"></div></a>
        <ul>
          <li><div class="filter">{{filters.invert}}% </br>
            <input 
              type="range" 
              name="invert" 
              min="0" 
              max="100" 
              v-model="filters.invert"
            /></div>
          </li>
        </ul>
      </li>
      <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/opacity.png"></div></a>
        <ul>
          <li><div class="filter">{{filters.opacity}}% </br>
            <input 
              type="range" 
              name="opacity" 
              min="0" 
              max="200" 
              v-model="filters.opacity"
            /></div>
          </li>
        </ul>
      </li>
      <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/undo.png"></div></a>
        
      </li>
    </ul>

    <div class="imageProcessing d-flex">
      <!-- <v-zoomer style="width: 500px; height: 500px; border: solid 1px silver;">
        <img
          src="https://media.mnn.com/assets/images/2012/05/XrayExposure.jpg.653x0_q80_crop-smart.jpg"
          style="object-fit: contain; width: 100%; height: 100%;"
        > -->
      <!-- <VueDragResize 
        :isActive="true"
        :isResizable="true"
        :isDraggable="true"
        :aspectRatio="true"
        :w="filters.width"
        :h="filters.height"
        :x="150"
        :y="250"
        v-on:resizing="resize" 
        v-on:dragging="resize"> -->
        <!-- <p>{{ top }} х {{ left }} </p> -->
        <!-- <p>{{ width }} х {{ height }}</p> -->
      <v-zoomer class="zoomer" style="width: 1000px; height: 500px; border: solid 1px silver;">
      <imagvue 
        id="imgExample"
        class="imgExample" 
        
        v-model="url"
        :filters="isOpenFilters"
        :onerror="()=>alert('Please try again')"
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
        <transition-group 
        src="https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif" 
        :lazy="1000"
        >
        </transition-group>        
      </imagvue>
      </v-zoomer>

      <!-- </VueDragResize> -->
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize';
import imagvue from 'imagvue'
import VueZoomer from 'vue-zoomer'
import 'vue-zoomer/dist/vue-zoomer.css' 

Vue.use(VueZoomer)

export default {
  name: 'ToolBar',
  components: {
    imagvue,
    VueDragResize,
    VueZoomer
  },
  methods: {
    showImgList: function() {
      let el = document.querySelector('.title')
      el.classList.toggle('show')
    },
    onLoadEvent() {
      console.log("Image on load!");
    },
    customData() {
      return {
        on: {
          load: this.onLoadEvent,
        }
      }
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    }
  },
  computed: {
    fixedRatioHeight () {
      return this.filters['width']
    },
    dropShadow() {
      return this.dropShadowJson
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      // projects: viewerData.content,
      isOpenFilters: true ,
      dropShadowJson:
      {
        offset: 16,
        blurRadius: 16,
        spreadRadius: 10,
        color: "#000000"
      },
      filters: {
        // maintain the aspect ratio
        // width: 500,
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
      url: 'https://media.mnn.com/assets/images/2012/05/XrayExposure.jpg.653x0_q80_crop-smart.jpg',
      errorURL:'https://i.stack.imgur.com/cl91I.png',
      loadUrls:[
        {url:'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif' , lazy:'https://goo.gl/aiwqia'}
      ],
      // imageList: imageData.content
    }
  }    
}
</script>

<style lang="scss">
#tool-bar {
  // position: relative;
  // margin-right: 150px;
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
  max-width: 100%;
  border: 1px solid red;
  height: 114px;
}
// 下拉式選取區塊
.drop-down-menu {
  height: 50px;
}
ul { 
/* 取消ul預設的內縮及樣式 */
  margin: 0;
  padding: 0;
  list-style: none;
}
ul.drop-down-menu {
  background: rgb(231, 231, 231);
}
ul.drop-down-menu li {
  position: relative;
}
ul.drop-down-menu > li:last-child {
  border-right: none;
}
ul.drop-down-menu a {
  background: rgb(231, 231, 231);
  display: block;
  padding: 0 40px;
  line-height: 50px;
}
ul.drop-down-menu a:hover { /* 滑鼠滑入按鈕變色*/
  background: rgb(231, 231, 231);
  border-radius: 3px;
} 
ul.drop-down-menu li:hover > a { /* 滑鼠移入次選單上層按鈕保持變色*/
  background: rgb(255, 255, 255);
}
ul.drop-down-menu li:hover > ul { /* 滑鼠滑入展開次選單*/
  display: block;
  background: rgb(255, 255, 255);
  padding: 5px 10px;
}
ul.drop-down-menu ul { /*隱藏次選單*/
  display: none;
}
ul.drop-down-menu ul li:last-child {
  border-bottom: none;
}
ul.drop-down-menu ul ul { /*第三層以後的選單出現位置與第二層不同*/
  z-index: 25;
  top: 10px;
  left: 90%;
}
.vdr.active:before {
  // outline: none;
}
.vdr-stick {
  border: 6px solid #6c6c6c;
  // display: none;
}
#imgExample {
  position: absolute;
  top: 25%;
  left: 30%;
  // box-sizing: border-box;
  // object-fit: contain; 
  // width: 100%; 
  // height: 100%;
}
.vue-zoomer {
  // 扣除 toolbar and sideBarMenu 寬度
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 116px;
  left: 150px;
}
</style>
