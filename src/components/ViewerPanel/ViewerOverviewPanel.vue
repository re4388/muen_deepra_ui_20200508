<template>
  <div id="viewer-overview-panel" class="container-main">
    <ToolBar class="toolbar"/>    
    <SidebarRight/>
    <firstImage :images="images"/>
    <!-- <ViewerContainer/> -->
    <!-- <imag-vue-panel></imag-vue-panel> -->
  </div>
</template>

<script>
import Vue from "vue";
import SidebarRight from '@/components/SideBarMenuRight/SideBarMenuRight.vue';
import ToolBar from '@/components/ViewerPanel/ToolBar.vue';
import imagvue from 'imagvue';
// import ViewerContainer from './ViewerContainer.vue';
import datasetService from '@/api/dataset_service.js'
import { EventBus } from '@/event_bus.js'
import fileFetecher from '@/utils/file_fetcher.js'
import FirstImage from '@/components/ViewerPanel/FirstImge.vue'

export default {
  name:"ViewerOverviewPanel",
  components: {
    // ViewerContainer,
    SidebarRight,
    ToolBar,
    imagvue,
    FirstImage
  },
  computed: {
  },
  data() {
    return {
      image: null,
      loading: true,
      dataset: null,
      images: []
    }
  },
  computed:{
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
    // EventBus.$once('viewerDatasetChanged',()=>{
    // // Parse path of images from dataset and assign to `this.images`
    // let dataset = this.$store.getters['Viewer/currentDataset']
    // console.log(dataset)

    // this.pathCollector = new fileFetecher.DatasetPathCollector(dataset)
    // this.pathCollector.parseFileList().then((result) => {
    //   this.images = this.pathCollector.fileList
    //   })
    // })
  },
  methods: {
    fetchData () {
      let currentProject = this.$store.getters['Project/currentProject']
      if (currentProject === null) {
        return
      }
      datasetService.getDatasetInfo(currentProject.uuid).then((result) => {
        this.$store.dispatch('Viewer/setCurrentDataset', result.content)
        this.dataset = this.$store.getters['Viewer/currentDataset']
        EventBus.$emit('viewerDatasetChanged')
        console.log('----- current dataset in viewer -----')
        console.log(this.dataset)

        // Notify that loading is complete
        this.loading = true
      })
    },
  }  
};


</script>

<style lang="scss" scoped>
#viewer-overview-panel {
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
  padding-right: 150px;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  // border: 1px solid red;
  // max-height: 100%;
  // max-width: 100%;
}
.toolbar {
  height: 85%;
}
</style>