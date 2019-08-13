<template>
  <div class="dataset-report-step step-content">
    <h4 class="title text-content">{{ content.title }}</h4>
    <div class="content-section flex-fill">
      <p class="text-content">
        Folder path: {{ folderPath }} <br>
        Label file: {{ labelFile }} <br>
        Task type: {{ taskType }} <br>
        File counts (in folder): {{ fileCounts }} <br>
      </p>
      <p class="text-content">
        Labels: <br>
        Total labels: {{ totalLabels }} <br>
        Labeled file counts: {{ normalFiles }} <br>
        Unlabeled file counts: {{ unlabeledFiles }} <br>
        Missed file counts: {{ missedFiles }} <br>
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
      this.$store.dispatch('DataImport/setCurrentStage', 'datasetReport')
      this.$store.dispatch('DataImport/resetStageLock')
    },
    getDatasetInfo () {
      if (this.datasetInfo.folderPath !== undefined) return
      dataImportService.importDataset(
        this.$store.getters['DataImport/selectedFolder'].path,
        this.$store.getters['DataImport/selectedTaskType'],
        {
          labelFile: this.labelFile === '' ? null : this.labelFile,
          forTest: false,
          colFilename: this.$store.getters['DataImport/selectedColFilename'],
          colLabel: this.$store.getters['DataImport/selectedColLabel']
        },
      ).then((result) => {
        this.dataRecieved = true
        this.datasetInfo = result.content
        this.$store.dispatch('DataImport/setDatasetInfo', this.datasetInfo)
        this.updateContent(this.datasetInfo)
      }).catch((err) =>{
        alert(err)
        this.$router.push('/project-overview')
      })
    },
    updateContent (newContent) {
      this.folderPath = newContent.folderPath
      this.taskType = newContent.taskType
      this.fileCounts = newContent.fileCounts
      this.labelFile = newContent.labelFile
      this.totalLabels = newContent.totalLabels

      let labelReport = newContent.details.labelReport
      this.normalFiles = labelReport.normal
      this.unlabeledFiles = labelReport.unlabeled
      this.missedFiles = labelReport.missed
    },
    checkContent () {
      if (this.dataRecieved) {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('DataImport/unlockStage')
          this.$store.dispatch('DataImport/setCompletedStageIndex', this.content.id)
          resolve(true)
        })
      }
    }
  },
  data () {
    return {
      datasetInfo: { details: {} },
      folderPath: '',
      taskType: '',
      fileCounts: 0,
      labelFile: '',
      totalLabels: '',
      normalFiles: 0,
      unlabeledFiles: 0,
      missedFiles: 0
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
