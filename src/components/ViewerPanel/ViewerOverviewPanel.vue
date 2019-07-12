<template>
  <div id="viewer-overview-panel" class="container-main">
    <imag-vue-panel></imag-vue-panel>
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
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="30px"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
                <div class="x-rayFilms"><img src="../../assets/x-ray1.jpg" width="20%"></div>
              </div>
          </div>
        </div>
    </template>


  </div>
</template>



<script>
// import ViewerCard from './ViewerCard.vue'
import viewerData from "./viewer_data.json";
import Vue from "vue";
import Sidebar from '@/components/SideBarMenu__right/SideBarMenu__right.vue'
// import imagvue from 'imagvue';
import ImagVuePanel from '@/components/ImagVuePanel/ImagVuePanel.vue'


// new Vue({
//   el: '#app',
// })

export default {
  name: "ViewerOverviewPanel",
  components: {
    Sidebar,
    // imagvue,
    ImagVuePanel
    // ViewerCard,
  },
  data() {
    return {
      projects: viewerData.content,
      filters: {
        blur: 5,
        contrast: 100,
        brightness: 100,
        grayscale: 0,
        rotate: 0,
        opacity: 100,
        invert: 0,
        saturate: 100,
        sepia: 0,
        dropShadow:{ 
          offset: 16,
          blurRadius: 10, 
          spreadRadius: 10, 
          color: 'black'
        }
      },
      errorURL:'https://cdn.browshot.com/static/images/not-found.png',
      loadUrls:[
        {url:'https://goo.gl/PxTSno' , lazy:'https://goo.gl/aiwqia'},
        {url:'https://goo.gl/K1kZWk' , lazy:'https://goo.gl/vnHTAh'},
        {url:'https://goo.gl/gTZMkF' , lazy:'https://goo.gl/K1Mheq'},
        {url:'https://goo.gl/PxTSno1' , lazy:'https://goo.gl/aiwqia'},
      ]
    }
  },
  methods: {
    zoomIn: function() {
      this.isActive = !this.isActive;
      let el = document.getElementById('img__example')
      el.classList.add('zoom__in')
    },
    zoomOut: function() {
      this.isHidden = !this.isHidden;
      let el = document.getElementById('img__example')
      el.classList.add('zoom__out')
    },
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
#sidebar__right {
  position: fixed;
  top :0;
  right: 0;
  height: 100%;
  margin-left: 0px;
  margin-bottom: 0px;
}

#viewer-overview-panel {
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
}

#img__example {
  // display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // min-height: 800px;
}

.main__viewer {
  margin-right: 150px;
  display: flex;
  height: 100%;

}
// .toolBar {
//   display: flex;
//   float: left;
//   height: 40px;
//   background: rgb(255, 255, 255);
//   width: 100%;
//   margin-right: 150px;
// }

// .btn {
//   background: rgb(231, 231, 231);
//   width: 100%;
//   display: flex;
//   padding: 10px;
//   text-align: center;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
// }

// .btn:hover{
//   background: rgb(194, 194, 194);
// }

// .img__icon {
//   width: 60%;
// }

.right__sideMenu {
  text-align: left;
  background: #2d2d31;
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  padding: 0 8px;
  color: white;
  height: 100%;
  z-index: 15;
  margin-top: 56px;
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
    top: 385px;
    right: 150px;
    padding: 0px;
}

.x-rayFilms {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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

.zoom__in {
  max-height: 100%;  
  max-width: 100%;
}

.zoom__out {
  max-height: 50%;  
  max-width: 50%;
}

.show {
  right: 0px;
}

imag-vue-panel {
  width: auto;
  height: auto;
}

</style>