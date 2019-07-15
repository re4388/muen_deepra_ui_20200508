<template>
  <div id="viewer-overview-panel" class="container-main">
    <!-- <imag-vue-panel></imag-vue-panel> -->
    <template>
      <div id="imag-vue-panel" class="container">
      <div class="toolBar">
        <ul class="drop-down-menu d-flex">
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/zoom_in.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.width}}% </br><input type="range" name="width" min="100" max="600" v-model="filters.width"/></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/zoom_out.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.height}}% </br><input type="range" name="height" min="100" max="600" v-model="filters.height"/></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/settings_brightness.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.contrast}}% </br><input type="range" name="contrast" min="0" max="150" v-model="filters.contrast"/></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/brightness.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.brightness}}% </br><input type="range" name="brightness" min="0" max="150" v-model="filters.brightness"/></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/invert_colors.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.grayscale}}% </br><input type="range" name="grayscale" min="0" max="100" v-model="filters.grayscale"/></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/opacity.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.opacity}}%<input type="range" name="opacity" min="0" max="100" v-model="filters.opacity"/></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/rotate_left.png"></div></a>
            <ul>
              <li><div class="filter"></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/rotate_right.png"></div></a>
            <ul>
              <li><div class="filter"></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/file_copy.png"></div></a>
            <ul>
              <li><div class="filter"></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/undo.png"></div></a>
            <ul>
              <li><div class="filter"></div></li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/undo.png"></div></a>
            <ul>
              <li><div class="filter"></div></li>
            </ul>
          </li>
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


    </template>

     <template>
      <div class="right__sideMenu">
          <div class="addLabel">
            <h2>Labels</h2>
            <button class="addLabel-btn">+NewLabel</button>
            <label><input type="checkbox" id="Nofinding"> Nofinding</label>
            <label><input type="checkbox" id="Label1"> Label 1</label>
            <label><input type="checkbox" id="Label2"> Label 2</label>
            <label><input type="checkbox" id="Label3"> Label 3</label>
          </div>

          <div class="data__set">
            <h5>DataSet</h5>
            <div class="img__dataSet"><img src="../../assets/people.png"></div>
            <div class="img__dataSet" id="show__list" @click="showImgList"><img src="../../assets/collections.png"></div>
          </div>

          <div class="edit__log">
            <h6>Edit Log & Note</h6></br>
            <p>20190523</p>
            <p>Model 1 Predict as Label1</p>
          </div>
        </div>          
      
        <div class="box">
          <div class="title">
              <div class="imgList" id="imgList">
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/viewer-img.png" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/viewer-img.png" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1_backup.jpg" width="50px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="50px"></div>
              </div>
          </div>
        </div>
    </template>


  </div>
</template>



<script>
import viewerData from "./viewer_data.json";
import Vue from "vue";
import Sidebar from '@/components/SideBarMenu__right/SideBarMenu__right.vue'
// import imagvue from 'imagvue';
import ImagVuePanel from '@/components/ImagVuePanel/ImagVuePanel.vue'
import imagvue from "imagvue";

export default {
  name:"ViewerOverviewPanel",
  components: {
    Sidebar,
    imagvue,
    ImagVuePanel
    // ViewerCard,
  },
  data() {
    return {
      projects: viewerData.content,
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
  methods: {
    showImgList: function(){
      let el = document.querySelector('.title')
      el.classList.toggle('show')
    },
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
};


</script>

<style lang="scss" scoped>
// 主體 viewer 含右側欄
#viewer-overview-panel {
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
}

#imag-vue-panel {
  margin: 0px;
  padding: 0px;
}

// viewer
.container {
  max-width: 100%;
  padding-right: 150px;
  flex-direction: column;
  padding-right: 150px;
  justify-content: center;
  border: 1px solid red;
}

// 匯入圖片處
.imageProcessing {
  flex-direction:column; 
  padding: 0px;
  margin: 60px;
  align-items: center; 
  border: 1px solid red;
}

// 上方 toolbar
.filterbtn {
  background: rgb(231, 231, 231);
  width: 60xp;
  height: 56px;
  display: flex;
  padding: 10px;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.filterbtn:hover{
  background: white;
}

.filter {
  box-sizing: border-box;
  background: rgb(231, 231, 231);
  border-style: none;
  justify-items: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

// 下拉式選取區塊
.drop-down-menu {
  border: 1px solid red;
  height: 50px;
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
  background: rgb(255, 255, 255);
  color: #333;
  display: block;
  padding: 0px;
  text-decoration: none;
  line-height: 50px;
  text-align: center;
}
ul.drop-down-menu a:hover { /* 滑鼠滑入按鈕變色*/
  background: rgb(231, 231, 231);
  border-radius: 3px;
} 
ul.drop-down-menu li:hover > a { /* 滑鼠移入次選單上層按鈕保持變色*/
  background: rgb(231, 231, 231);
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

// 右側欄
.right__sideMenu {
  text-align: left;
  background: #2d2d31;
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  padding: 56px 8px 0 8px;
  color: white;
  height: 100%;
  z-index: 15;
}

.addLabel {
  box-sizing: border-box;
  height: 400px;
  padding: 50px 20px 20px 20px;
  border-bottom: 1px solid white;
}

.addLabel-btn {
  background-color: rgb(194, 194, 194);
  border: none;
  padding: 5px 15xp;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  // border-radius: 2px; 
  margin: 10px 0 20px 0;
}

.addLabel-btn:hover{
  background: rgb(255, 255, 255);
}

.labelNames {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.data__set{
  box-sizing: border-box;
  height: 300px;
  padding: 20px 10px;
  border-bottom: 1px solid white;
}

.data__set > h5 {
  align-items: center;
  text-align: center; 
}

.img__dataSet {
  width: 100%;
  padding: 40px;
}

.img__dataSet:hover{
  background: rgb(199, 199, 199);
}

.edit__log {
  box-sizing: border-box;
  height: 300px;
  padding: 20px 10px;
  border-bottom: 1px solid white;
}

.edit__log > pre {
  color: white;
  text-align: left;
}

// imageList
.imgList {
    width: 300px;
    height: 300px;
    overflow: scroll;
    margin: 0 auto;
    list-style-type: none;
}

.imgList::-webkit-scrollbar { 
    display: none; 
}

.box {
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: fixed;
  top: 400px;
  right: 150px;
  padding: 0px;
  position: absolute;
}

.x-rayFilms {
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 5px;
  padding: 5px;
}

.x-rayFilms:hover{
  background: rgba(144, 192, 144, 0.616);
  z-index: 20;
}

.title {
  background: #000;
  width: 100%;
  position: absolute;
  right: -400px;
  transition: all 1s;
  overflow: hidden;
}

.show {
  right: 0px;
}
</style>