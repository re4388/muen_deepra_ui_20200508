<template>
  <div class="import-test-dataset-step step-content d-flex flex-column">
    <div class="title-section">
      <h4 class="title text-content">{{ content.title }}</h4>
      <p class="description text-content">
        Please select a folder or drag files into this region.<br>
      </p>
    </div>
    <div class="content-section flex-fill">
      <p class="description text-content">
        Selected data: 
        <b-form-file
          id="input-folder-browser"
          ref="inputFolderBrowser"
          v-model="selectedFolder"
          :state="Boolean(selectedFolder)"
          :file-name-formatter="formatPath"
          :directory="true"
          @input="checkFolderContent"
          placeholder="Choose a folder..."
        >
        </b-form-file>
      </p>
      <p class="description text-content">
        Label file (if this file is not given, evaluation step will be skipped):
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
                v-on:change="selectedFilenameChanged"
                :options="labelHeader">
              </b-form-select>
            </div>
            <div class="dropdown-item">
              <p class="description text-content">Column of annotation</p>
              <b-form-select
                class="col-sm"
                id="col-label"
                text="column name of label"
                v-model="colLabel"
                v-on:change="selectedLabelChanged"
                :options="labelHeader">
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
import { mapState } from 'vuex'

export default {
  name: 'ImportTestDatasetStep',
  props: {
    content: Object
  },
  mounted: function () {
    this.initializeContent()
  },
  methods: {
    initializeContent () {
      this.$store.dispatch('Testing/setCurrentStage', 'importDataset')
      this.$store.dispatch('DataImport/resetAllState')
      this.selectedFolder = this.$store.getters['DataImport/selectedFolder']
      this.$refs.inputFolderBrowser.setFiles([this.selectedFolder])
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
      this.$store.dispatch('DataImport/setSelectedFolder', pathInfo.path)
      this.selectedFolder = pathInfo.path
    },
    checkLabelFile (pathInfo) {
      if (pathInfo === null) {
        // reset
        this.colFilename = ''
        this.colLabel = ''
        return
      }
      this.selectedLabelFile = pathInfo === null ? '' : pathInfo.path
      this.$store.dispatch('DataImport/setSelectedLabelFile', this.selectedLabelFile)

      datasetService.parseLabelFile(pathInfo.path).then((result) => {
        this.labelHeader = result.header
      })
    },
    checkContent () {
      console.log(this.selectedFolder)
      if (this.selectedFolder === '' || this.selectedFolder === null) return

      return new Promise((resolve, reject) => {
        let model = this.$store.getters['Model/currentModel']
        let taskType = JSON.parse(model.details_json)['task_type']
        datasetService.importDataset(
          this.selectedFolder,
          taskType,
          {
            labelFile: this.selectedLabelFile === '' ? null : this.selectedLabelFile,
            forTest: this.selectedLabelFile === '' ? true : false,
            colFilename: this.colFilename,
            colLabel: this.colLabel
          }
        ).then((result) => {
          this.$store.dispatch('DataImport/setDatasetInfo', result.content)
          this.$store.dispatch('Testing/unlockStage')
          this.$store.dispatch('Testing/setCompletedStageIndex', this.content.id)
          resolve(true)
        })
      })
    },
    selectedFilenameChanged () {
      let idxFilename = this.labelHeader.indexOf(this.colFilename)
      let idxLabel = this.labelHeader.indexOf(this.colLabel)
      if (idxFilename === idxLabel) {
        alert('You cannot pick the same value as annotation.')
        this.colFilename = ''
      }
    },
    selectedLabelChanged () {
      var idxFilename = this.labelHeader.indexOf(this.colFilename)
      var idxLabel = this.labelHeader.indexOf(this.colLabel)
      if (idxFilename === idxLabel) {
        alert('You cannot pick the same value as filename.')
        this.colLabel = ''
      }
    }
  },
  data () {
    return {
      selectedFolder: '',
      selectedLabelFile: '',
      colFilename: '',
      colLabel: '',
      labelHeader: []
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
