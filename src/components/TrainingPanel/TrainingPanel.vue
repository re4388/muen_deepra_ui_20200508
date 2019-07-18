<template>
  <div id="training-panel" class="container-main">
    <div class="panel-content d-flex flex-column">
      <div class="step-navigator d-flex flex-row">
        <step-pipeline
          :contentList="stepContent"
          :indexActivated="currentStep"
          @onStepChanged="updateStep"
        />
        <component
          class="flex-fill"
          :is="stepContent[currentStep]['contentType']"
          :content="stepContent[currentStep]"
          @onProgressFinished="toggleBtnFlowControl"
        />
      </div>
      <div class="control-section">
        <a class="btn-flow-control" id="btn-flow-control" @click="enterToNextStep">
          <div class="content">
            <p v-if="this.currentStep == this.stepContent.length-1">Done</p>
            <p v-else>Next</p>
          </div>
        </a>
        <p v-if="this.currentStep == this.stepOfTraining">
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
import { EventBus } from '@/event_bus.js'

export default {
  name: 'TrainingPanel',
  components: {
    StepPipeline,
    StepContent,
    ResourcesCheckStep,
    TrainingProgress
  },
  mounted () {
    EventBus.$emit('pageChanged', 'Training')
  },
  methods: {
    updateStep (stepId) {
      // NOTE: remove current implementation to avoid user switching stage
    },
    enterToNextStep () {
      if (this.currentStep < this.stepContent.length - 1) {
        if (this.currentStep === this.stepOfTraining && !this.isTrainingFinished) {
          return
        }
        this.currentStep += 1
        this.toggleBtnFlowControl(this.currentStep !== this.stepOfTraining)
      }
    },
    toggleBtnFlowControl (enable) {
      this.isTrainingFinished = enable
      let el = document.getElementById('btn-flow-control').getElementsByClassName('content')[0]
      el.style.backgroundColor = enable ? 'rgba(0, 150, 150, 0.75)' : 'rgb(175, 175, 175)'
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
          title: 'Done',
          contentType: 'StepContent'
        }
      ],
      currentStep: 0,
      stepOfTraining: 1,
      isTrainingFinished: false
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
