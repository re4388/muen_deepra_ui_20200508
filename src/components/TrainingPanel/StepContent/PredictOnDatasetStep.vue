<template>
  <div class="predict-on-dataset-step d-flex flex-column">
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
    <log-display class="flex-fill" id="log-display" :content="log"/>
  </div>
</template>

<script>
import validationService from '@/api/validation_service.js'
import logDisplay from '@/components/LogDisplay/LogDisplay.vue'
import { converterDict } from '@/utils/label_converter.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PredictOnDatasetStep',
  components: {
    logDisplay
  },
  props: {
    content: Object
  },
  mounted () {
    this.startValidation()
  },
  methods: {
    ...mapActions ('Training', {
      unlockStage: 'unlockStage',
      setCompletedStageIndex: 'setCompletedStageIndex'
    }),
    ...mapActions ('Validation', {
      toggleIsValidating: 'toggleIsValidating'
    }),
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
      if (this.isValidating) return

      let handlerProgress = (resp) => {
        this.updateProgressBar(resp)
      }
      let handlerEnd = (resp) => {
        this.finishValidation()
      }
      let projectInfo = this.$store.getters['Project/currentProject']
      let trainingOutput = this.$store.getters['Training/trainingOutput']

      this.toggleIsValidating()
      let call = validationService.startValidation(
        projectInfo,
        trainingOutput,
        handlerProgress,
        handlerEnd,
        {datasetType: 'all'}
      )
    },
    finishValidation () {
      this.toggleIsValidating()

      let projectInfo = this.$store.getters['Project/currentProject']
      validationService.getValidationOutput(projectInfo).then((result) => {
        let taskType = this.$store.getters['Project/taskType']
        let labelConverter = new converterDict[taskType](result.prediction, result.labels.map(String))
        let predictedLabels = labelConverter.convertAll()
        this.$store.dispatch('Testing/setPredictedLabels', predictedLabels)
      }).then(() => {
        validationService.getOrderedFileList(projectInfo, 'all', 'prob.').then((result) => {
          this.$store.dispatch('Validation/setOrderedFileList', result)
          this.$emit('onProgressFinished', true)
        })
      })
    },
    checkContent () {
      if (this.isValidating) return

      return new Promise((resolve, reject) => {
        this.unlockStage()
        this.setCompletedStageIndex(this.content.id)
        resolve(true)
      })
    }
  },
  computed: {
    ...mapGetters('Validation', {
      isValidating: 'isValidating'
    })
  },
  data () {
    return {
      progressValue: 0,
      progressValueMin: 0,
      progressValueMax: 100,
      log: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  margin: 0px 0px 20px 0px;
  min-height: 15px;
}
.predict-on-dataset-step {
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
#log-display {
  margin: 20px 0px;
  overflow-y: scroll;
}
</style>
