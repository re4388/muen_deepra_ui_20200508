<template>
  <div id="viewer-overview-panel" class="container-main">
    <ToolBar class="toolbar"/>    
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
// import ViewerContainer from './ViewerContainer.vue';
import datasetService from '@/api/dataset_service.js'
import { EventBus } from '@/event_bus.js'
import fileFetecher from '@/utils/file_fetcher.js'

export default {
  name:"ViewerOverviewPanel",
  components: {
    // ViewerContainer,
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
      let dataset = this.$store.getters['DataImport/datasetInfo']

      if (currentProject.uuid !== undefined) {
        datasetService.getDatasetInfo(currentProject.uuid).then((result) => {
          this.$store.dispatch('Viewer/setCurrentDataset', result.content)
          this.dataset = this.$store.getters['Viewer/currentDataset']
          EventBus.$emit('viewerDatasetChanged')
          // Notify that loading is complete
          this.loading = false
        })
      } else if (dataset.uuid !== undefined) {
        // XXX: We have to fire event `viewerDatasetChanged` in async operation. Otherwise,
        //   the order of instantiating component will make `SideBarMenuRight` unable to catch
        //   this event. (Because `SideBarMenuRight` is created after this component is created.
        //   If we make the event `viewerDatasetChanged` be a sync operation, this event will
        //   be fired before `SideBarMenuRight` is created. So that the event listener in
        //   `SideBarMenuRight` won't be triggered.)
        //   That's why we have to use this promiseProxy to make the content be async.
        this.promiseProxy().then((result) => {
          this.$store.dispatch('Viewer/setCurrentDataset', dataset)
          this.dataset = this.$store.getters['Viewer/currentDataset']
          EventBus.$emit('viewerDatasetChanged')
          this.loading = false
        })
      } else {
        alert('You should import a dataset first, then you can explore them in viewer.')
        this.$router.push('/testing')
      }
    },
    promiseProxy () {
      return new Promise((resolve, reject) => {
        resolve(true)
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