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
      </p>
    </div>
  </div>
</template>

<script>
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
      this.selectedFolder = this.$store.getters['Testing/selectedFolder']
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
      this.$store.dispatch('Testing/setSelectedFolder', pathInfo)
      this.selectedFolder = pathInfo
    },
    checkLabelFile (pathInfo) {
      this.$store.dispatch('Testing/setSelectedLabelFile', pathInfo)
      this.selectedLabelFile = pathInfo
    },
    checkContent () {
      if (this.selectedFolder === '' || this.selectedFolder === null) return
      return new Promise((resolve, reject) => {
        this.$store.dispatch('Testing/unlockStage')
        this.$store.dispatch('Testing/setCompletedStageIndex', this.content.id)
        resolve(true)
      })
    }
  },
  data () {
    return {
      selectedFolder: [],
      selectedLabelFile: '',
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
