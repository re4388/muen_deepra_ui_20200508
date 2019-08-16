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
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
    // be able to compare with the parsedFileLIstLabels and the predictedLables
    EventBus.$on('viewerDatasetChanged', () => {
      let temp = this.$store.getters['Viewer/parsedFileList']
      let predictedLabels = this.$store.getters['Testing/predictedLabels']
      let parsedFileListLabels = temp.map(function (obj) {
        return parseInt(obj.label, 10)
      })
      // compare two arrays and then return the index of the difference
      // if (predictedLabels !== parsedFileListLabels) {
      //   console.log('---it is different----')
      // }
      let findDivergence = function (predictedLabels, parsedFileListLabels) {
        let result = []
        let i
        for (i = 0; i < predictedLabels.length; i++){
          if (predictedLabels[i] !== parsedFileListLabels[i]) {
            result.push(i);
          }
        }
        return result
      };
      let differentLabels = findDivergence(predictedLabels, parsedFileListLabels)
      EventBus.$emit('showDifference', differentLabels)
    })
  },
  mounted () {
    EventBus.$emit('pageChanged', {
      pages: ['Viewer'],
      keepRoot: true,
    })
  },
  beforeDestroy() {
    EventBus.$off('viewerDatasetChanged')
  },
  methods: {
    // when the viewerDatasetChanged, get the current dataset from store and emit the message
    fetchData () {
      let currentProject = this.$store.getters['Project/currentProject']
      let dataset = this.$store.getters['DataImport/datasetInfo']
      let parseDataProcess = (result) => {
        let pathCollector = new fileFetecher.DatasetPathCollector(this.dataset)
        pathCollector.parseFileList().then((result) => {
          this.$store.dispatch('Viewer/setParsedFileList', pathCollector.fileList)
          // console.log('ready to emit event `viewerDatasetChanged`')
          EventBus.$emit('viewerDatasetChanged')
          // Notify that loading is complete
          this.loading = false
        })
      }

      if (currentProject.uuid !== undefined) {
        datasetService.getDatasetInfo(currentProject.uuid).then((result) => {
          this.$store.dispatch('Viewer/setCurrentDataset', result.content)
          this.dataset = this.$store.getters['Viewer/currentDataset']
          parseDataProcess(result)
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
          parseDataProcess(result)
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
    },
    processLabel () {

    }
  }
}

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