<template>
  <div class="dataset-report-step step-content">
    <h4 class="title text-content">{{ content.title }}</h4>
    <div class="content-section flex-fill">
      <p class="text-content">
        Folder path: {{ datasetInfo.folderPath }} <br>
        Task type: {{ datasetInfo.taskType }} <br>
        File counts (in folder): {{ datasetInfo.fileCounts }} <br>
      </p>
      <p class="text-content">
        Total labels: {{ datasetInfo.totalLabels }} <br>
        Labeled file counts: {{ datasetInfo.details.labeledFileCounts }} <br>
        Unlabeled file counts: {{ datasetInfo.details.unlabeledFileCounts }} <br>
        Missed file counts: {{ datasetInfo.details.missedFileCounts }} <br>
      </p>
    </div>
  </div>
</template>

<script>
import dataImportService from '@/api/dataset_service.js'

export default {
  name: 'DatasetReportStep',
  props: {
    content: Object,
  },
  mounted: function () {
    this.initializeContent()
    this.getDatasetInfo()
  },
  methods: {
    initializeContent () {
      this.$store.dispatch('setCurrentStage', 'datasetReport')
      this.$store.dispatch('resetStageLock')
    },
    getDatasetInfo () {
      if (this.datasetInfo.folderPath !== undefined) return
      dataImportService.importDataset(
        this.$store.getters.selectedFolder.path,
        this.$store.getters.selectedTaskType,
      ).then((result) => {
        this.dataRecieved = true
        this.datasetInfo = result.content
        this.$store.dispatch('setDatasetInfo', this.datasetInfo)
        this.updateContent(this.datasetInfo)
      })
    },
    updateContent (newContent) {
      this.folderPath = newContent.folderPath
      this.taskType = newContent.taskType
      this.fileCounts = newContent.fileCounts
      this.labeledFileCounts = newContent.details.labeledFileCounts
      this.missedFileCounts = newContent.details.missedFileCounts
      this.unlabeledFileCounts = newContent.details.unlabeledFileCounts
      this.totalLabels = newContent.totalLabels
    },
    checkContent () {
      if (this.dataRecieved) {
        this.$store.dispatch('unlockStage')
        this.$store.dispatch('setCompletedStageIndex', this.content.id)
      }
    }
  },
  data () {
    return {
      datasetInfo: { details: {} },
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content {
  color: black;
  padding: 20px;
}
.text-content {
  text-align: left;
}
</style>
