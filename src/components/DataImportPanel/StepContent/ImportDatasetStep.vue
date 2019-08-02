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
        <template v-if="Boolean(selectedLabelFile)" class="container">
          <div class="row dropdown-header text-content d-flex flex-row">
            <div class="dropdown-item">
              <p class="description text-content">Column of filename</p>
              <b-form-select
                class="col-sm"
                id="col-file"
                text="column name of file"
                v-model="colFilename"
                v-on:change="colItemChange"
                :options="candidate">
              </b-form-select>
            </div>
            <div class="dropdown-item">
              <p class="description text-content">Column of annotation</p>
              <b-form-select
                class="col-sm"
                id="col-label"
                text="column name of label"
                v-model="colLabel"
                v-on:change="colItemChange"
                :options="candidate">
              </b-form-select>
            </div>
          </div>
        </template>
      </p>
    </div>
  </div>
</template>

<script>
import datasetService from '@/api/dataset_service.js'

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
      this.$store.dispatch('DataImport/resetAllState')
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
      if (pathInfo === null) return
      this.$store.dispatch('DataImport/setSelectedLabelFile', pathInfo)
      this.selectedLabelFile = pathInfo
      datasetService.parseLabelFile(pathInfo.path).then((result) => {
        this.labelHeader = result.header
        this.candidate = result.header
      })
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
      this.$store.dispatch('DataImport/setSelectedColFilename', this.colFilename)
      this.$store.dispatch('DataImport/setSelectedColLabel', this.colLabel)
      return new Promise((resolve, reject) => {
        this.$store.dispatch('DataImport/unlockStage')
        this.$store.dispatch('DataImport/setCompletedStageIndex', this.content.id)
        resolve(true)
      })
    },
    colItemChange: function() {
      this.$store.dispatch('DataImport/setSelectedColFilename', this.colFilename)
      console.log(this.colFilename)
      let indexofColFilename = -1
      for (var i=0; i<this.candidate.length; i++) {
        if(this.candidate[i] === this.colFilename) {
          indexofColFilename = i
        }
      }
      let temp = this.candidate.splice(indexofColFilename,1);
      this.colFilename = temp
      console.log(this.candidate)
      console.log(temp)
      // return this.labelHeader.spice(this.colFilename);
      // // this.$store.dispatch('DataImport/setSelectedColLabel', this.colLabel)
      // console.log(this.colLabel)
      // console.log(this.colFilename)

    }
  },
  data () {
    return {
      selectedFolder: '',
      selectedTaskType: '',
      selectedLabelFile: '',
      labelHeader: [],
      candidate: [],
      colFilename: '',
      colLabel: '',
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
.dropdown-header {
  padding: 0px;
  // width: 20%;
  margin: 16px 0 16px;
}
.dropdown-header p {
  color: black;
  margin :0;
}
.dropdown-item {
  width: 33%;
  padding-left: 0;
}
.dropdown-item:hover{
  background: none;
}
</style>
