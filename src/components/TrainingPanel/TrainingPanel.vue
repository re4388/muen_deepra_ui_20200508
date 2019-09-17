<template>
  <div id="training-panel" class="container-main">
    <div class="panel-content d-flex flex-column">
      <div class="step-navigator d-flex flex-row">
        <step-pipeline
          :contentList="stepContent"
          :indexActivated="currentStep"
          :enableSelectionOnClicked="false"
          @onStepChanged="updateStep"
        />
        <component
          class="flex-fill"
          ref="stepContent"
          :is="stepContent[currentStep]['contentType']"
          :content="stepContent[currentStep]"
          @onProgressFinished="changeBtnFlowControlState"
        />
      </div>
      <div class="control-section">
        <a class="btn-flow-control" id="btn-flow-control" @click="progressToNextStep">
          <div class="content">
            <p v-if="iSButtonDone()">Done</p>
            <p v-else>Next</p>
          </div>
        </a>
        <p v-if="onTraining()">
          <a class="btn-flow-control" id="btn-stop-training">
            <div class="content">
              <p>Stop</p>
            </div>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import StepPipeline from '@/components/Pipeline/StepPipeline.vue'
import StepContent from '@/components/Pipeline/StepContent.vue'
import ResourcesCheckStep from './StepContent/ResourcesCheckStep.vue'
import TrainingProgress from './StepContent/TrainingProgress.vue'
import ValidationStep from './StepContent/ValidationStep.vue'
import PredictOnDatasetStep from './StepContent/PredictOnDatasetStep.vue'
import { EventBus } from '@/event_bus.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TrainingPanel',
  components: {
    StepPipeline,
    StepContent,
    ResourcesCheckStep,
    TrainingProgress,
    ValidationStep,
    PredictOnDatasetStep
  },
  mounted () {
    EventBus.$emit('pageChanged', this.$route.meta.title)
    console.log('Current project')
    console.log(this.$store.getters['Project/currentProject'])
  },
  methods: {
    // you need to dispatch the store action and then you can use it
    ...mapActions({
      resetStageLock: 'Training/resetStageLock'
    }),
    iSButtonDone(){
      // when all step over, the currentStep will be the final step, and 
      // we don't show the NEXT button
      return this.currentStep === this.stepContent.length - 1
    },
    onTraining(){
      // show STOP when "onTraining", and when this.currentStep equate to StepOfTraining, which is 1
      // we show STOP
      return this.currentStep === this.stepOfTraining
    },
    initializeComponent () {
      // this will reset all state
      this.$store.dispatch('Training/resetAllState')
    },
    updateStep (stepId) {
      // NOTE: remove current implementation to avoid user switching stage
      // this.currentStep = stepId
    },
    progressToNextStep () {
      // console.log(this.$refs.stepContent.checkContent()) // => Promise {<resolved>: true}
      // we will use $ref to invoke stepContent component's checkContent moethod and got the returned val
      let call = this.$refs.stepContent.checkContent()

      //  I think this is just a error handling, you shall got the Promise back,
      // and if not, we do nothing
      if (call === undefined) return


      call.then((result) => {
        if (this.isCurrentStageLocked) return
        this.changeBtnFlowControlState(false)

        console.log('--- step info')
        console.log(this.currentStep, this.stepContent.length)
        // we will go to evaluation panel if the we go thru all steps
        if (this.currentStep == this.stepContent.length - 1) {
          this.$router.push('/evaluation')
        }
        // increase one step
        this.currentStep += 1

        // lock the step
        this.resetStageLock()
      })
    },
    changeBtnFlowControlState (state) {
      let el = document.getElementById('btn-flow-control').getElementsByClassName('content')[0]
      el.style.backgroundColor = state ? 'rgba(0, 150, 150, 0.75)' : 'rgb(175, 175, 175)'
    }
  },
  computed: {
    // need to use store getter in computed first and then can use call it
    ...mapGetters('Training', {
      isCurrentStageLocked: 'isCurrentStageLocked',
      isTraining: 'isTraining'
    })
  },
  watch: {
    isTraining () {
      this.changeBtnFlowControlState(false)
    }
  },
  data () {
    return {
      stepContent: [
        {
          id: 0,
          title: 'Computing resources check',
          contentType: 'ResourcesCheckStep'
        },
        {
          id: 1,
          title: 'Training',
          contentType: 'TrainingProgress'
        },
        {
          id: 2,
          title: 'Validation',
          contentType: 'ValidationStep'
        },
        {
          id: 3,
          title: 'Predict on dataset',
          contentType: 'PredictOnDatasetStep',
        }
      ],
      stepOfTraining: 1,
      currentStep: 0,
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-content {
  height: 100%;
  overflow: hidden;
  background-color: gray;
}
.step-navigator {
  height: 80%;
  margin: 30px;
}
.control-section {
  height: 20%;
}

$btn-height: 50px;
.btn-flow-control {
  text-decoration: none;
  margin-right: 50px;
  float: right;
  & .content {
    color: white;
    width: 75px;
    border-radius: 5px;
    height: $btn-height;
    background-color: rgba(0, 150, 150, 0.75);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
    line-height: $btn-height;
    user-select: none;
    &:active {
      background-color: rgba(0, 150, 150, 1);
      transform: translate3D(2px, 2px, 0px);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}
#btn-stop-training {
  & .content {
    background-color: rgba(200, 0, 0, 0.75);
  }
}
</style>
