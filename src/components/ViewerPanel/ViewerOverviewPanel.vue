<template>
  <div id="viewer-overview-panel" class="container-main">
    <ToolBar class="toolbar"/>    
    <SidebarRight/>
    <b-modal ref="modal-confirm-changes" title="Save changes?"
      @ok="saveModifiedSamples"
      @cancel="discardModifiedSamples"
    >
      <p>Some annotations of samples are changed, do you want to save them?</p>
      <p>(Click "cancel" button to discard changes)</p>
      <p>(Click the "x" sign to close this dialog and continue editing)</p>
    </b-modal>
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
  },
  mounted () {
    EventBus.$emit('pageChanged', {
      pages: ['Viewer'],
      keepRoot: true,
    })
  },
  beforeRouteLeave (to, from, next) {
    // Check whether there are samples modified.
    // If true, send a request to backend to handle them.
    let modifiedSamples = this.$store.getters['Label/modifiedSamples']
    if (modifiedSamples.length !== 0) {
      this.$refs['modal-confirm-changes'].show()
    } else {
      next(true)
    }
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
    saveModifiedSamples () {
      datasetService.updateLabel(
        this.$store.getters['Project/currentProject'].uuid,
        this.$store.getters['Label/modifiedSamples']
      ).then((result) => {
        console.log(result)
        this.$store.dispatch('Label/resetAllState')  // TODO: remove this line
      })
    },
    discardModifiedSamples () {
      this.$store.dispatch('Label/resetAllState')
      console.log(this.$store.getters['Label/modifiedSamples'])
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