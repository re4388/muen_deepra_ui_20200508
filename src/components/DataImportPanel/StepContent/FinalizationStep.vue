<template>
  <div class="finalization-step step-content d-flex flex-column">
    <div class="title-section">
      <h4 class="title text-content">{{ content.title }}</h4>
      <p class="description text-content">
        Any generated output will be stored in this project<br>
      </p>
      <p class="text-content">
        Project location:
        <b-form-file
          id="input-project-location"
          ref="projectLocationBrowser"
          v-model="newProjectLocation"
          :state="Boolean(newProjectLocation)"
          :directory="true"
          :file-name-formatter="formatPath"
          @input="checkFolderContent"
          placeholder="Choose a folder..."
        >
        </b-form-file>
      </p>
      <p class="text-content">
        Project name:
        <b-form-input
          id="input-project-name"
          v-model="newProjectName"
          placeholder="Enter name of the project...">
        </b-form-input>
      </p>
      <p class="text-content">
        Description:
        <b-form-textarea
          id="textarea-project-description"
          v-model="newProjectDescription"
          placeholder="Description of this project (optional)"
          rows="3"
          max-rows="5">
        </b-form-textarea>
      </p>
    </div>
  </div>
</template>

<script>
import projectManager from '@/api/projects_service.js'

export default {
  name: 'FinalizationStep',
  props: {
    content: Object
  },
  mounted: function () {
    this.initializeContent()
  },
  methods: {
    initializeContent () {
      this.$store.dispatch('DataImport/setCurrentStage', 'finalization')
    },
    formatPath (pathInfo) {
      if (pathInfo === null) return
      if (pathInfo.length > 1) throw new Error('There should be only one path selected.')
      return pathInfo[0].path
    },
    checkFolderContent (pathInfo) {
      // TODO: send `pathInfo` to backend, and set the status of
      // `b-form-file` as valid or invalid by the returned response.
      // TODO: check whether selected folder is under the folder of dataset,
      // warn user if it is.

      if (pathInfo === null) return
      this.$store.dispatch('DataImport/setNewProjectLocation', pathInfo)
      this.newProjectLocation = pathInfo
    },
    sendRequestForProjectCreation () {
      let datasetInfo = this.$store.getters['DataImport/datasetInfo']
      console.log(datasetInfo)
      return new Promise((resolve, reject) => {
        projectManager.createProject(
          this.newProjectName,
          this.newProjectDescription,
          this.newProjectLocation.path,
          datasetInfo.uuid
        ).then((result) => {
          this.newProjectInfo = result
          resolve(true)
        }).catch((err) => {reject(err)})
      })
    },
    checkContent () {
      if (this.newProjectName === '' || this.isCheckingContent) return
      this.isCheckingContent = true   // Prevent multiple triggers

      return new Promise((resolve, reject) => {
        this.sendRequestForProjectCreation().then((result) => {
          this.$store.commit('DataImport/SET_NEW_PROJECT_INFO', this.newProjectInfo)
          this.$store.dispatch('DataImport/setIsCreatingProject', true)
          this.$store.dispatch('DataImport/unlockStage')
          this.$store.dispatch('DataImport/setCompletedStageIndex', this.content.id)

          resolve(true)
        }).catch((err) => {reject(err)})
      })
    }
  },
  data () {
    return {
      newProjectName: '',
      newProjectDescription: '',
      newProjectInfo: null,
      newProjectLocation: '',
      isCheckingContent: false
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
.description {
  text-align: left;
}
</style>
