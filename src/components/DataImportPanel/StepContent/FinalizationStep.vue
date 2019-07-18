<template>
  <div class="finalization-step step-content d-flex flex-column">
    <div class="title-section">
      <h4 class="title text-content">{{ content.title }}</h4>
      <p class="description text-content">
        Overview of dataset<br>
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
      this.$store.dispatch('setCurrentStage', 'finalization')
    },
    sendRequestForProjectCreation () {
      let datasetInfo = this.$store.getters.datasetInfo
      return new Promise((resolve, reject) => {
        projectManager.createProject(
          this.newProjectName,
          this.newProjectDescription,
          datasetInfo
        ).then((result) => {
          this.newProjectInfo = result
          resolve(true)
        })
      })
    },
    checkContent () {
      if (this.newProjectName === '' || this.isCheckingContent) return
      this.isCheckingContent = true   // Prevent multiple triggers

      return new Promise((resolve, reject) => {
        this.sendRequestForProjectCreation().then((result) => {
          this.$store.commit('SET_NEW_PROJECT_INFO', this.newProjectInfo)
          this.$store.dispatch('setIsCreatingProject', true)
          this.$store.dispatch('unlockStage')
          this.$store.dispatch('setCompletedStageIndex', this.content.id)

          resolve(true)
        })
      })
    }
  },
  data () {
    return {
      newProjectName: '',
      newProjectDescription: '',
      newProjectInfo: null,
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
