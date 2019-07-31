<template>
  <div class="prediction-progress">
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
import predictionService from '@/api/prediction_service.js'

export default {
  name: 'PredictionProgress',
  props: {
    content: Object
  },
  created: function () {
    this.startPrediction()
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
    startPrediction () {
      let model = this.$store.getters['Model/currentModel']
      let dataset = this.$store.getters['DataImport/datasetInfo']

      console.log('--- start prediction ---')

      let handlerProgress = (resp) =>{
        this.updateProgressBar(resp)
      }
      let handlerEnd = (resp) =>{
        this.finishTraining()
      }

      let call = predictionService.startPrediction(
        model.uuid,
        dataset.folderPath,
        dataset.labelFile,
        handlerProgress,
        handlerEnd
      )
    },
    finishTraining () {
      console.log('Prediction is finished')

      // Get training output (e.g. output directory)
      predictionService.getPredictionOutput().then((result) => {
        this.$store.dispatch('Testing/setPredictionOutput', result)
        console.log(result)
      })
      this.$emit('onProgressFinished', true)
    },
    checkContent () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('Testing/unlockStage')
        this.$store.dispatch('Testing/setCompletedStageIndex', this.content.id)
        resolve(true)
      })
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
</style>
