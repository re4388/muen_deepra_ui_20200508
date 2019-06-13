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
        <button>OK</button>
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
    }
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
}
.step-navigator {
  height: 80%;
  margin: 30px;
}
.control-section {
  height: 20%;
  background-color: darkgray;
}
</style>
