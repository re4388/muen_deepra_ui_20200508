<template>
  <div id="sidebar-right" class="sidebarRight d-flex flex-column">
    <div class="rightsideBlock addLabel p-2 flex-fill bd-highlight">
      <div class="rightsideBlockTitle"><h3>Labels</h3></div>
      <components
        id="label-panel"
        :labels="labels"
        :isSingleSelection="isSingleSelection"
        :is="'LabelPanel'">
      </components>
    </div>
    <div class="rightsideBlock imageListBlock data__set p-2 flex-fill bd-highlight">
      <div class="rightsideBlockTitle"><h3>DataSet</h3></div>
      <div><img class="datasetImg" src="../../assets/people.png"></div>
      <div id="show__list">
        <img class="datasetImg" src="../../assets/collections.png" @click="showImgList">
        <ImageBox :images="images"/>
      </div>
    </div>
    <div class="rightsideBlock edit__logp-2 flex-fill bd-highlight">
      <div class="noteTitle rightsideBlockTitle"><h5>Edit Log<br> &amp; <br>Note</h5><br></div>
      <div class="note"><p>20190523</p></div>
      <div class="note"><p>Model 1 Predict as Label1</p></div>
    </div>    
  </div>
</template>        
<script>
import ImageBox from '@/components/SideBarMenuRight/ImageBox.vue';
import LabelPanel from './LabelPanel.vue'
import imageData from './image_data.json'
import { EventBus } from '@/event_bus.js'
import fileFetecher from '@/utils/file_fetcher.js'

const separator = {
  template: `<hr style="border-color: rgba(255, 255, 255); margin: 10px;"/>`
}

export default {
  name: 'SidebarRight',
  components: {
    ImageBox,
    LabelPanel
  },
  watch: {
    isShowingImgList() {} 
  },
  created () {
    EventBus.$once('viewerDatasetChanged',()=>{
      // Parse path of images from dataset and assign to `this.images`
      let fileList = this.$store.getters['Viewer/parsedFileList']
      this.images = fileList
      EventBus.$emit('notifyImageTotalNumber', this.images.length)

      let dataset = this.$store.getters['Viewer/currentDataset']
      this.labels = dataset.details.labelReport.labels
      this.taskType = dataset.taskType
    })
  },
  data () {
    return {
      isShowingImgList: false,
      pathCollector: null,
      images: [],
      labels: [],
      taskType: ''
    }
  },
  computed: {
    isSingleSelection () {
      return this.taskType != 'multilabel' ? true : false
    }
  },
  methods: {
    showImgList() {
      this.isShowingImgList = !this.isShowingImgList
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
.rightsideBlockTitle {
  margin: 10px 0 30px 0;
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
.catalog {
  width: 300px;
  height: 40px;
  background: #777777;
  position: relative;
  top: 240px;
  left: 0;
  z-index: 20;
  line-height: 40px;
  color: white;
}
#label-panel {
  max-height: 150px;
}
</style>
