<template>
  <div id="training-panel" class="container-main">
    <div class="panel-content d-flex flex-column">
      <div class="step-navigator d-flex flex-row">
        <step-pipeline
          :contentList="stepContent"
          @on-step-changed="updateStep"
        />
        <component
          class="flex-fill"
          :is="stepContent[currentStep]['contentType']"
          :content="stepContent[currentStep]"
          @on-progress-finished="toggleBtnFlowControl"
        />
      </div>
      <div class="control-section">
        <a class="btn-flow-control" id="btn-flow-control">
          <div class="content" @click="enterToNextStep">
            <p v-if="this.currentStep == this.stepContent.length-1">Done</p>
            <p v-else>Next</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import StepPipeline from '../Pipeline/StepPipeline.vue'
import StepContent from '../Pipeline/StepContent.vue'
import ResourcesCheckStep from './StepContent/ResourcesCheckStep.vue'
import TrainingProgress from './StepContent/TrainingProgress.vue'

export default {
  name: 'TrainingPanel',
  components: {
    StepPipeline,
    StepContent,
    ResourcesCheckStep,
    TrainingProgress
  },
  methods: {
    updateStep (stepId) {
      this.currentStep = stepId
    },
    enterToNextStep () {
      if (this.currentStep < this.stepContent.length - 1) {
        if (this.currentStep === 1 && !this.isTrainingFinished) {
          return
        }
        this.currentStep += 1
        this.toggleBtnFlowControl(this.currentStep !== 1)
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
</style>
