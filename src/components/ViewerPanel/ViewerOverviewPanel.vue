<template>
  <div id="viewer-overview-panel" class="container-main">
    <ToolBar id="toolbar"/>    
    <SidebarRight/>
    <!-- <ViewerContainer/> -->
    <!-- <imag-vue-panel></imag-vue-panel> -->
  </div>
</template>

<script>
import Vue from "vue";
import SidebarRight from '@/components/SideBarMenuRight/SideBarMenuRight.vue';
import ToolBar from '@/components/ViewerPanel/ToolBar.vue';
import imagvue from 'imagvue';
import VueDragResize from 'vue-drag-resize';
import ViewerContainer from './ViewerContainer.vue';
import datasetService from '@/api/dataset_service.js'
import { EventBus } from '@/event_bus.js'

export default {
  name:"ViewerOverviewPanel",
  components: {
    ViewerContainer,
    SidebarRight,
    ToolBar,
    imagvue,
    VueDragResize
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
#toolbar {
  height: 100%;
}
</style>