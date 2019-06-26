<template>
  <div class="training-progress">
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
import trainingService from '@/api/training_service.js'

export default {
  name: 'TrainingProgress',
  props: {
    content: Object
  },
  created: function () {
    this.startTraining()
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
    startTraining () {
      if (this.isTrainingStarted) {
        return
      }
      this.isTrainingStarted = true

      let handler_progress = (resp) => {
        console.log(resp)
        let epoch_info = resp['epoch_info']
        let curr_epoch = epoch_info['curr_epoch']
        let total_epoch = epoch_info['total_epoch']
        this.updateProgressBar(curr_epoch / total_epoch)
      }
      let handler_end = (resp) => {
        this.finishTraining()
      }
      // For demonstration
      let call = trainingService.runMNIST('foo', handler_progress, handler_end)
    },
    finishTraining () {
      console.log('Training is finished')
      this.$emit('on-progress-finished', true)
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
