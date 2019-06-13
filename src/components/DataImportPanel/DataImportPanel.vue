<template>
  <div id="data-import-panel" class="container-main">
    <div class="panel-content d-flex flex-column">
      <div class="step-navigator d-flex flex-row">
        <step-pipeline
          :contentList="stepContent"
          @on-step-changed="onStepChanged"
        />
        <step-content
          class="flex-fill"
          :content="stepContent[currentStep]"
        />
      </div>
      <div class="control-section">
        <a class="btn-flow-control">
          <div class="content" @click="toNextStep">
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
import stepContentData from './step_pipeline_content.json'

export default {
  name: 'DataImportPanel',
  components: {
    StepPipeline,
    StepContent
  },
  methods: {
    onStepChanged (stepId) {
      this.currentStep = stepId
    },
    toNextStep () {
      if (this.currentStep < this.stepContent.length-1) {
        this.currentStep += 1
      }
    },
  },
  data () {
    return {
      stepContent: stepContentData.content,
      currentStep: 0
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
