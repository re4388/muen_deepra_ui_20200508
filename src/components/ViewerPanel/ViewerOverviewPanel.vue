<template>
  <div id="viewer-overview-panel" class="container-main">
    <template>
      <div class="toolBar">
        <button class="btn"><img class="img__icon" src="../../assets/zoom_in.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/zoom_out.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/settings_brightness.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/grid_on.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/crop_free.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/crop.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/rotate_left.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/rotate_right.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/file_copy.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/undo.png"></button>
      </div>
    </template>

    <template>
        <div class="content">
          <img id="img__example" src="../../assets/x-ray1.jpg" />
        </div>
    </template>

    <template>
      <div class="right__sideMenu">
        <div class="addLabel">
          <h2>Labels</h2>
          <button class="addLabel-btn"> + NewLabel</button>
          <label><input type="checkbox" id="Nofinding"> Nofinding</label>
          <label><input type="checkbox" id="Label1"> Label 1</label>
          <label><input type="checkbox" id="Label2"> Label 2</label>
          <label><input type="checkbox" id="Label3"> Label 3</label>
        </div>

        <div class="data__set">
          <h5>DataSet</h5>
          <div class="img__dataSet"><img src="../../assets/dataset-1-img.png"></div>
          <div class="img__dataSet"><img src="../../assets/dataset-2-img.png"></div>
        </div>

        <div class="edit__log">
          <h6>Edit Log & note</h6></br>
          <p>20190523</p>
          <p>Model 1 Predict as Label1</p>
        </div>
      </div>          
    </template>

    <div class="box">
        <div class="title">
            <div class="imgList">
                <ul>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp2"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp2"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp2"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp2"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp2"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp2"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                        <div class="sp1"></div>
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                    <li>
                        <div class="x-rayFilms"></div>
                        <img src="../../assets/viewer-img.png" height="60" width="40">
                    </li>
                </ul>
            </div>
        </div>
    </div>


  </div> 
</template>

<script>
// import ViewerCard from './ViewerCard.vue'
import viewerData from "./viewer_data.json";
import Vue from "vue";
import Sidebar from '@/components/SideBarMenu__right/SideBarMenu__right.vue'

new Vue({
  el: '#app',
  
})

export default {
  name: "ViewerOverviewPanel",
  name: "app",
  components: {
    Sidebar,
    // ViewerCard,
  },
  data() {
    return {
      projects: viewerData.content
    };
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
  min-height: 100%;
  background-color: rgb(0, 0, 0);
  // overflow-y: scroll;
}

.content {
  // display: flex;
  box-sizing: border-box;
  max-height: 100%;
  background-color: rgb(0, 0, 0);
  margin-right: 150px;
  margin-top: 96px;
}


#img__example {
  // display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 800px;

}

.toolBar {
  display: flex;
  float: left;
  height: 40px;
  background: rgb(255, 255, 255);
  width: 100%;
  margin-right: 150px;
}

.btn {
  background: rgb(231, 231, 231);
  width: 100%;
  display: flex;
  padding: 10px;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.btn:hover{
  background: rgb(194, 194, 194);
}

.img__icon {
  width: 60%;
}

// .rightSideMenu {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   background: #2d2d31;
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 150px;
//   min-height: 100%;
//   margin-top: 96px;
//   padding: 0 5px;
// }

// .section {
//   display: flex;
//   justify-content: space-between;
//   background: #2d2d31;
//   width: 100%;
//   height: 300px;
//   border-bottom: 2px solid rgb(197, 197, 197);
// }

// #section__labels > h2 {
//   color: white;
//   display: flex;
//   text-align: center;
//   justify-content: center;
//   flex-direction: column;
// }

.right__sideMenu {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  flex-direction: column;
  background: #2d2d31;
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  min-height: 100%;
  margin-top: 96px;
  padding: 0 15px;
  color: white;
}

.addLabel {
  box-sizing: border-box;
  height: 300px;
  padding: 20px 10px;
  border-bottom: 1px solid white;
}

.addLabel-btn {
  background-color: rgb(194, 194, 194);
  border: none;
  padding: 2px 15xp;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 2px; 
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
  padding: 40px 40px;
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
    height: 272px;
    overflow: scroll;
    margin: 0 auto;
}

.imgList li {
    position: relative;
    display: inline-block;
    float: left;
    width: 40px;
    height: 60px;
    box-sizing: border-box;
    margin: 2px;
}

.imgList li:hover{
   border: 2px solid red;
   z-index: 11;
}


.box {
    width: 300px;
    height: 272px;
    overflow: hidden;
    position: fixed;
    top: 460px;
    right: 150px;
    padding: 0px;
}

.box:hover .title{
  right: 0px;
}

.sp1 {
    display: inline-block;
    width:10px;
    height:10px;
    background: green;
    position: absolute;
    top: 0;
    right: 0;
}

.sp2 {
    display: inline-block;
    width: 40px;
    height: 60px;
    background: rgba(131, 197, 131, 0.527);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}

.title {
  background: #000;
  width: 100%;
  position: absolute;
  right: -300px;
  transition: all 1s;
  overflow: hidden;
  }

</style>