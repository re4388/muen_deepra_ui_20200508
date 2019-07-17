<template>
  <div id="sidebar-right" class="sidebarRight d-flex flex-column">
    <div class="rightsideBlock addLabel p-2 flex-fill bd-highlight">
      <h2>Labels</h2>
      <button class="addLabelBtn">+NewLabel</button>
      <label><input type="checkbox" id="Nofinding"> Nofinding</label>
      <label><input type="checkbox" id="Label1"> Label 1</label>
      <label><input type="checkbox" id="Label2"> Label 2</label>
      <label><input type="checkbox" id="Label3"> Label 3</label>
    </div>
    <div class="rightsideBlock imageListBlock data__set p-2 flex-fill bd-highlight">
      <h3>DataSet</h3>
      <div><img class="datasetImg" src="../../assets/people.png"></div>
      <div id="show__list">
        <img class="datasetImg" src="../../assets/collections.png"  @click="showImgList">
          <div class="box">
            <div class="title">
              <div class="imgList" id="imgList">
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/viewer-img.png" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/viewer-img.png" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/viewer-img.png" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/viewer-img.png" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/viewer-img.png" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/viewer-img.png" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
                <div class="x-rayFilms"><div class="overlayer"></div><img src="../../assets/x-ray1_backup.jpg" height="40px"></div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="rightsideBlock edit__logp-2 flex-fill bd-highlight">
      <div class="noteTitle"><h5>Edit Log</br> & </br>Note</h5></br></div>
      <div class="note"><p>20190523</p></div>
      <div class="note"><p>Model 1 Predict as Label1</p></div>
    </div>
    
  </div>
</template>   
<!-- <template v-for="(item, index) in imageList">
  <div class="x-rayFilms" :key="index">
    <img class="overlay" src="item.src" height="40px">
  </div>
</template> -->
<!-- <template v-for="(item, index) in imageList">
  <div :key="index">
    <p>{{ item.src }}</p>
    <img :src="item.src"/>
  </div>
</template> -->        
<script>
const separator = {
  template: `<hr style="border-color: rgba(255, 255, 255); margin: 10px;"/>`
}

export default {
  name: 'SidebarRight',

  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    showImgList() {
      let el = document.querySelector('.title')
      el.classList.toggle('show')
    }
  }
}
</script>

<style lang="scss">
.sidebarRight {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  padding: 10px;
  background: #2d2d31;
  text-align: center;
  color: white;
  height: 100%;
  overflow: scroll;
  overflow-x:hidden;
}
.rightsideBlock {
  border-bottom: 1px solid white;
  padding: 20px 0;
}
.addLabelBtn {
  background-color: rgb(194, 194, 194);
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  margin: 10px 0 20px 0;
}
.addLabelBtn:hover{
  background: rgb(255, 255, 255);
}
.datasetImg {
  padding: 30px;
}
.datasetImg:hover{
  background: rgb(199, 199, 199);
}
.noteTitle {
  padding-bottom: 20px;
}

// ImageList
.imgList {
  width: 300px;
  height: 300px;
  overflow: scroll;
  margin: 0 auto;
  list-style-type: none;
  text-align: left;
  position: relative;
}

.imgList::-webkit-scrollbar { 
    display: none; 
}

.box {
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: fixed;
  top: 350px;
  right: 150px;
  padding: 0px;
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

.x-rayFilms {
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 3px;
  z-index: 9;
  position: relative;
}

.x-rayFilms:hover::after {
  content: "";
  display: inline-flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #42ab427d;
}
</style>
