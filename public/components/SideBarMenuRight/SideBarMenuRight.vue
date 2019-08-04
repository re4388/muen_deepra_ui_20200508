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
        <img class="datasetImg" src="../../assets/collections.png" @click="showImgList">
        <ImageBox :images="images"/>
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
import ImageBox from '@/components/SideBarMenuRight/ImageBox.vue';
import imageData from './image_data.json'
import { EventBus } from '@/event_bus.js'
import fileFetecher from '@/utils/file_fetcher.js'

const separator = {
  template: `<hr style="border-color: rgba(255, 255, 255); margin: 10px;"/>`
}

export default {
  name: 'SidebarRight',
  components: {
    ImageBox
  },
  watch: {
    isShowingImgList() {} 
  },
  created () {
    EventBus.$once('viewerDatasetChanged',()=>{
      // Parse path of images from dataset and assign to `this.images`
      let dataset = this.$store.getters['Viewer/currentDataset']
      console.log(dataset)

      this.pathCollector = new fileFetecher.DatasetPathCollector(dataset)
      this.pathCollector.parseFileList().then((result) => {
        this.images = this.pathCollector.fileList
      })
    })
  },
  data () {
    return {
      isShowingImgList: false,
      pathCollector: null,
      images: []
    }
  },
  methods: {
    showImgList() {
      this.isShowingImgList = !this.isShowingImgList
      console.log(this.isShowingImgList)
      let el = document.querySelector('.title')
      el.classList.toggle('show')
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
