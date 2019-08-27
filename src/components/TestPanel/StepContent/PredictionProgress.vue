<template>
  <div class="prediction-progress d-flex flex-column">
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
import predictionService from '@/api/prediction_service.js'
import logDisplay from '@/components/LogDisplay/LogDisplay.vue'
import { converterDict } from '@/utils/label_converter.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PredictionProgress',
  components: {
    logDisplay
  },
  props: {
    content: Object
  },
  created: function () {
    this.startPrediction()
  },
  methods: {
    ...mapActions('Testing', {
      unlockStage: 'unlockStage',
      setCompletedStageIndex: 'setCompletedStageIndex',
      toggleIsTesting: 'toggleIsTesting',
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
    startPrediction () {
      if (this.isTesting) return

      let model = this.$store.getters['Model/currentModel']
      let datasetInfo = this.$store.getters['DataImport/datasetInfo']

      let handlerProgress = (resp) =>{
        this.updateProgressBar(resp)
      }
      let handlerEnd = (resp) =>{
        this.finishPrediction()
      }

      this.toggleIsTesting()
      let call = predictionService.startPrediction(
        model.uuid,
        datasetInfo.uuid,
        handlerProgress,
        handlerEnd
      )
    },
    finishPrediction () {
      predictionService.getPredictionOutput().then((result) => {
        this.$store.dispatch('Testing/setPredictionOutput', result)

        // Update the label list of cached `datasetInfo`, so that the correct label
        // set can be displayed in label panel.
        this.$store.dispatch('DataImport/updateDatasetInfo', {
          'details.labelReport.labels': result.labels
        })
        let taskType = this.$store.getters['DataImport/datasetInfo'].taskType
        let labelConverter = new converterDict[taskType](result.prediction, result.labels.map(String))
        let predictedLabels = labelConverter.convertAll()
        this.$store.dispatch('Testing/setPredictedLabels', predictedLabels)
      })
      this.toggleIsTesting()
      this.$emit('onProgressFinished', true)
    },
    checkContent () {
      if (this.isTesting) return

      return new Promise((resolve, reject) => {
        this.unlockStage()
        this.setCompletedStageIndex(this.content.id)
        resolve(true)
      })
    }
  },
  computed: {
    ...mapGetters('Testing', {
      isTesting: 'isTesting'
    })
  },
  data () {
    return {
      progressValue: 0,
      progressValueMin: 0,
      progressValueMax: 100,
      isTrainingStarted: false,
      log: '',
      temp: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  margin: 0px 0px 20px 0px;
  min-height: 15px;
}
.prediction-progress {
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
