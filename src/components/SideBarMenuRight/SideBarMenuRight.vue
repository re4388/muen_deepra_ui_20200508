<template>
  <div id="sidebar-right" class="sidebarRight d-flex flex-column">
    <div class="rightsideBlock addLabel p-2 flex-fill bd-highlight">
      <div class="rightsideBlockTitle"><h3>Labels</h3></div>
      <components
        id="label-panel"
        :labels="labels"
        :isSingleSelection="isSingleSelection"
        :isDisabled="false"
        :selectedLabel="selectedLabel"
        :srcIndex="selectedImageIndex"
        :predictedLabel="predictedLabel"
        :is="'LabelPanel'">
      </components>
    </div>
    <div class="rightsideBlock imageListBlock data__set p-2 flex-fill bd-highlight">
      <div class="rightsideBlockTitle"><h3>DataSet</h3></div>
      <div><img class="datasetImg" src="../../assets/people.png"></div>
      <div id="show__list" class="show__list">
        <img class="datasetImg" src="../../assets/collections.png" @click="showImgList">
          <div>
            <!-- TODO: complete the feature of `differentLabels` -->
            <!-- :differentLabels="differentLabels" -->
            <ImageBox
            class="imageBox"
            :images="images"
            />
          </div>
      </div>
    </div>
    <div class="rightsideBlock edit__logp-2 flex-fill bd-highlight">
      <div class="noteTitle rightsideBlockTitle"><h5>Edit Log<br> &amp; <br>Note</h5><br></div>
      <div class="note"><p>20190523</p></div>
      <div class="note"><p>Model 1 Predict as Label1</p></div>
    </div>
    <div class="rightsideBlock edit__logp-2 flex-fill bd-highlight">
      <b-button id="btn-save-changes" variant="light" @click="onSaveChanges">Save</b-button>
    </div>
  </div>
</template>

<script>
import ImageBox from '@/components/SideBarMenuRight/ImageBox.vue';
import LabelPanel from './LabelPanel.vue'
import imageData from './image_data.json'
import { EventBus } from '@/event_bus.js'
import fileFetecher from '@/utils/file_fetcher.js'
import { mapState } from 'vuex';

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
    isShowingImgList() {},
    selectedImage (newVal, oldVal) {
      // console.log('Information of selected image: ')
      // console.log(newVal)
    }
  },
  created () {
    EventBus.$once('viewerDatasetChanged',()=>{
      console.log('--- processing with event viewerDatasetChanged')
      EventBus.$emit('notifyImageTotalNumber', this.images.length)
      
      let dataset = this.$store.getters['Viewer/currentDataset']
      this.labels = dataset.details.labelReport.labels
      // console.log(this.labels)
      this.taskType = dataset.taskType
      this.selectedImage = this.images[0]
      let temp = this.images.label
    })
    EventBus.$on('onNavigationImageClicked', (obj) => {
      // console.log('--- current selected image:')
      // console.log(obj.item)
      // console.log(obj.index)
      this.selectedImage = obj.item
      this.selectedImageIndex = obj.index
    })
  },
  beforeDestroy () {
    EventBus.$off('onNavigationImageClicked')
  },
  data () {
    return {
      isShowingImgList: false,
      pathCollector: null,
      labels: [],
      taskType: '',
      selectedImage: null,
      selectedImageIndex: 0
    }
  },
  computed: {
    isSingleSelection () {
      return this.taskType != 'multilabel' ? true : false
    },
    selectedLabel () {
      if (this.selectedImage === null) return ''
      // XXX: We have to check whether the label of selected image has been modified.
      //   If true, we have to return the modified label rather than the original label.
      //   Otherwise, we cannot show the modified result to `LabelPanel`.
      let idx = this.modifiedSamples.map(x => x.filename).indexOf(this.selectedImage.filename)
      let labelToBeDisplay = idx === -1 ? this.selectedImage.label : this.modifiedSamples[idx].label
      return labelToBeDisplay
    },
    predictedLabel () {
      // console.log('---- predictedLabel: ')
      // console.log(this.predictedLabels[this.selectedImageIndex])
      return String(this.predictedLabels[this.selectedImageIndex])
    },
    ...mapState({
      images: state => state.Viewer.parsedFileList,
      predictedLabels: state => state.Testing.predictedLabels,
      modifiedSamples: state => state.Label.modifiedSamples
    })
  },
  methods: {
    showImgList () {
      this.isShowingImgList = !this.isShowingImgList
      let el = document.querySelector('.title')
      el.classList.toggle('show')
    },
    onSaveChanges () {
      let num = this.$store.getters['Label/modifiedSamples'].length
      let selectedModal = num === 0 ? 'modal-no-change-notification' : 'modal-confirm-changes'
      this.$parent.$refs[selectedModal].show()
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
.data__set > div {
  position: relative; 
}
.datasetImg:hover{
  background: rgb(199, 199, 199);
}
.noteTitle {
  padding-bottom: 20px;
}
#label-panel {
  max-height: 150px;
}
</style>
