<template>
  <div class="validation-step">
    <div class="title text-content">{{ content.title }}</div>
    <div class="progress">
      <div class="progress-bar" role="progressbar"
        :style="{width: progressValue + '%'}"
        v-bind:aria-valuenow=progressValue
        v-bind:aria-valuemin=progressValueMin
        v-bind:aria-valuemax=progressValueMax>
        <div class="progress-text">{{ progressValue }}%</div>
      </div>
    </div>
    <div class="estimated-time text-content">Estimated time of completion:</div>
  </div>
</template>

<script>
import validationService from '@/api/validation_service.js'

export default {
  name: 'ValidationStep',
  props: {
    content: Object
  },
  created: function () {
    this.startValidation()
  },
  methods: {
    setProgressRange (rngMin, rngMax) {
      this.progressValueMin = rngMin
      this.progressValueMax = rngMax
    },
    updateProgressBar (val) {
      if (val > this.progressValueMax) {
        return
      }
      this.progressValue = (val * this.progressValueMax).toFixed(2)
    },
    startValidation () {
      if (this.isTrainingStarted) {
        return
      }
      this.isTrainingStarted = true

      let handlerProgress = (resp) => {
        this.updateProgressBar(resp)
      }
      let handlerEnd = (resp) => {
        this.finishTraining()
      }
      let projectInfo = this.$store.getters['Project/currentProject']
      let trainingOutput = this.$store.getters['Training/trainingOutput']
      console.log(projectInfo)
      console.log(trainingOutput)
      let call = validationService.startValidation(
        projectInfo,
        trainingOutput,
        handlerProgress,
        handlerEnd
      )
    },
    finishTraining () {
      console.log('Validation is finished')

      // Get training output (e.g. output directory)
      let projectInfo = this.$store.getters['Project/currentProject']
      validationService.getValidationOutput(projectInfo).then((result) => {
        this.$store.dispatch('Training/setValidationOutput', result)
        console.log(result)
      })
      this.$emit('onProgressFinished', true)
    }
  },
  data () {
    return {
      progressValue: 0,
      progressValueMin: 0,
      progressValueMax: 100,
      isTrainingStarted: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  margin: 0px 0px 20px 0px;
}
.training-progress {
  color: black;
  padding: 20px;
}
.progress-bar {
  background-color: rgb(0, 123, 255);
  & .progress-text {
    user-select: none;
  }
}
.text-content {
  text-align: left;
}
</style>
