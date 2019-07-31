<template>
  <div id="viewer-overview-panel" class="container-main">
    <ToolBar class="toolbar"/>    
    <SidebarRight/>
  </div>
</template>

<script>
import Vue from "vue";
import SidebarRight from '@/components/SideBarMenuRight/SideBarMenuRight.vue';
import ToolBar from '@/components/ViewerPanel/ToolBar.vue';
import imagvue from 'imagvue';
import datasetService from '@/api/dataset_service.js'
import { EventBus } from '@/event_bus.js'
import fileFetecher from '@/utils/file_fetcher.js'

export default {
  name:"ViewerOverviewPanel",
  components: {
    SidebarRight,
    ToolBar,
    imagvue
  },
  computed: {
  },
  data() {
    return {
      image: null,
      loading: true,
      dataset: null
    }
  },
  computed:{
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
  },
  methods: {
    // when the viewerDatasetChanged, get the current dataset from store and emit the message
    fetchData () {
      let currentProject = this.$store.getters['Project/currentProject']
      if (currentProject === null) {
        return
      }
      datasetService.getDatasetInfo(currentProject.uuid).then((result) => {
        this.$store.dispatch('Viewer/setCurrentDataset', result.content)
        this.dataset = this.$store.getters['Viewer/currentDataset']

        let pathCollector = new fileFetecher.DatasetPathCollector(this.dataset)
        pathCollector.parseFileList().then((result) => {
          this.$store.dispatch('Viewer/setParsedFileList', pathCollector.fileList)
          console.log('ready to emit event `viewerDatasetChanged`')
          EventBus.$emit('viewerDatasetChanged')
          // Notify that loading is complete
          this.loading = true
        })
      })
    }
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