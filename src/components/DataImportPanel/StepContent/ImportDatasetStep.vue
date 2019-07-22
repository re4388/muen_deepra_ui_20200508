<template>
  <div class="import-dataset-step step-content d-flex flex-column">
    <div class="title-section">
      <h4 class="title text-content">{{ content.title }}</h4>
      <p class="description text-content">
        Please select a folder to be imported.<br>
        Currently supported:<br>
        1. All data is placed in selected folder, and all files are
        listed in a `label_mapping.csv` file.<br>
        2. Data were classified by subfolders.<br>
      </p>
    </div>
    <div class="content-section flex-fill">
      <p class="description text-content">
        Selected folder: 
        <b-form-file
          id="input-folder-browser"
          ref="inputFolderBrowser"
          v-model="selectedFolder"
          :state="Boolean(selectedFolder)"
          :directory="true"
          :file-name-formatter="formatPath"
          @input="checkFolderContent"
          placeholder="Choose a folder..."
        >
        </b-form-file>
      </p>
      <p class="description text-content">
        Task type:
        <b-form-select
          id="input-task-type"
          v-model="selectedTaskType"
          :options="taskTypes"
          @input="checkTaskType"
        >
        </b-form-select>
      </p>
      <p class="description text-content">
        Label file (optional for multiclass / binary classification task):
        <b-form-file
          id="input-label-file"
          v-model="selectedLabelFile"
          :state="Boolean(selectedLabelFile)"
          :file-name-formatter="formatPath"
          @input="checkLabelFile"
        >
        </b-form-file>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImportDatasetStep',
  props: {
    content: Object
  },
  mounted: function () {
    this.initializeContent()
  },
  methods: {
    initializeContent () {
      this.$store.dispatch('DataImport/setCurrentStage', 'importDataset')
      this.selectedFolder = this.$store.getters['DataImport/selectedFolder']
      this.$refs.inputFolderBrowser.setFiles([this.selectedFolder])
      this.selectedTaskType = this.$store.getters['DataImport/selectedTaskType']
    },
    formatPath (pathInfo) {
      if (pathInfo === null) return
      if (pathInfo.length > 1) throw new Error('There should be only one path selected.')
      return pathInfo[0].path
    },
    checkFolderContent (pathInfo) {
      // TODO: send `pathInfo` to backend, and set the status of
      // `b-form-file` as valid or invalid by the returned response.
      if (pathInfo === null) return
      this.$store.dispatch('DataImport/setSelectedFolder', pathInfo)
      this.selectedFolder = pathInfo
    },
    checkTaskType (value) {
      if (value === null) return
      this.$store.dispatch('DataImport/setSelectedTaskType', value)
      this.selectedTaskType = value
    },
    checkLabelFile (pathInfo) {
      this.$store.dispatch('DataImport/setSelectedLabelFile', pathInfo)
      this.selectedLabelFile = pathInfo
    },
    checkContent () {
      if (this.selectedFolder === '' || this.selectedFolder === null) return
      if (this.selectedTaskType === '' || this.selectedTaskType === null) return
      if (['binary', 'multiclass'].indexOf(this.selectedTaskType) === -1) {
        if (this.selectedLabelFile === '' || this.selectedLabelFile === null) {
          alert('Please select a label file.')
          return
        }
      }
      return new Promise((resolve, reject) => {
        this.$store.dispatch('DataImport/unlockStage')
        this.$store.dispatch('DataImport/setCompletedStageIndex', this.content.id)
        resolve(true)
      })
    }
  },
  data () {
    return {
      selectedFolder: '',
      selectedTaskType: '',
      selectedLabelFile: '',
      taskTypes: [
        { value: '', text: 'Please select an type of task' },
        { value: 'binary', text: 'binary' },
        { value: 'multiclass', text: 'multiclass' },
        { value: 'multilabel', text: 'multilabel' },
        { value: 'regression', text: 'regression' }
      ]
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
  user-select: none;
}
.description {
  text-align: left;
}
</style>
