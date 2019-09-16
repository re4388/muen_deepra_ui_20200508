<template>
  <div class="training-progress d-flex flex-column">
    <div class="title text-content">{{ content.title }}</div>
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{width: progressValue + '%'}"
        v-bind:aria-valuenow="progressValue"
        v-bind:aria-valuemin="progressValueMin"
        v-bind:aria-valuemax="progressValueMax"
      >
        <div class="progress-text">{{ progressValue }}%</div>
      </div>
    </div>
    <div class="estimated-time text-content">Estimated time of completion:</div>
    <log-display class="flex-fill" id="log-display" :content="log" />
  </div>
</template>

<script>
import trainingService from '@/api/training_service.js'
import logDisplay from '@/components/LogDisplay/LogDisplay.vue'
import { LogFormatter } from '@/utils/log_formatter.js'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'TrainingProgress',
  components: {
    logDisplay
  },
  props: {
    content: Object
  },
  mounted () {
    this.startTraining()
  },
  methods: {

      handlerProgress(resp){
        this.log = LogFormatter.fromTraining(resp)
        this.updateProgressBar(resp.currentProgress)
      },

      handlerEnd(resp){
        this.finishTraining()
      },

    ...mapActions('Training', {
      unlockStage: 'unlockStage',
      setCompletedStageIndex: 'setCompletedStageIndex',
      toggleIsTraining: 'toggleIsTraining'
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
    startTraining () {
      // Prevent retriggering
      if (this.isTraining) return

      // this.handlerProgress = (resp) => {
      //   this.log = LogFormatter.fromTraining(resp)
      //   this.updateProgressBar(resp.currentProgress)
      // }
      
      
      // this.handlerEnd = (resp) => {
      //   this.finishTraining()
      // }

      this.toggleIsTraining()
      let projectInfo = this.$store.getters['Project/currentProject']
      console.log(projectInfo)
      let call = trainingService.startTraining(projectInfo, this.handlerProgress, this.handlerEnd)
      this.log = 'Preparing to start training, it might take a few moment...'
    },
    finishTraining () {
      console.log('Training is finished')
      this.toggleIsTraining()

      // Get training output (e.g. output directory)
      let projectInfo = this.$store.getters['Project/currentProject']
      trainingService.getTrainingOutput(projectInfo).then((result) => {
        this.$store.dispatch('Training/setTrainingOutput', result)
      }).catch((result)=> {})
      this.$emit('onProgressFinished', true)
    },
    checkContent () {
      if (this.isTraining) return

      return new Promise((resolve, reject) => {
        this.unlockStage()
        this.setCompletedStageIndex(this.content.id)
        resolve(true)
      })
    }
  },
  computed: {
    ...mapGetters('Training', {
      isTraining: 'isTraining'
    })
  },
  data () {
    return {
      progressValue: 0,
      progressValueMin: 0,
      progressValueMax: 100,
      // handlerProgress: null,
      // handlerEnd: null,
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
#log-display {
  margin: 20px 0px;
  overflow-y: scroll;
}
</style>
