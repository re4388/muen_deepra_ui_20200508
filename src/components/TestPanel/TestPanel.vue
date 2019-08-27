<template>
  <div id="test-panel" class="container-main">
    <div class="panel-content d-flex flex-column">
      <div class="step-navigator d-flex flex-row">
        <step-pipeline
          :contentList="stepContent"
          :indexActivated="currentStep"
          :enableSelectionOnClicked="false"
          @onStepChanged="updateCurrentStep"
        />
        <step-content
          class="flex-fill"
          ref="stepContent"
          :is="stepContent[currentStep]['contentType']"
          :content="stepContent[currentStep]"
        />
      </div>
      <div class="control-section">
        <a class="btn-flow-control" @click="progressToNextStep">
          <div class="content">
            <p v-if="this.currentStep == this.stepContent.length-1">Done</p>
            <p v-else>Next</p>
          </div>
        </a>
        <a class="btn-flow-control" id="btn-cancel" @click="redirectToPage">
          <div class="content">
            <p>Cancel</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import StepPipeline from '@/components/Pipeline/StepPipeline.vue'
import StepContent from '@/components/Pipeline/StepContent.vue'
import ImportDatasetStep from './StepContent/ImportTestDatasetStep.vue'
// TODO: reuse existing component `TrainingPanel/StepContent/ResourcesCheckStep.vue`
import ResourcesCheckStep from './StepContent/ResourcesCheckStep.vue'
import PredictionProgress from './StepContent/PredictionProgress.vue'
import { mapGetters, mapActions } from 'vuex'
import { EventBus } from '@/event_bus.js'

export default {
  name: 'TestPanel',
  components: {
    StepPipeline,
    StepContent,
    ImportDatasetStep,
    ResourcesCheckStep,
    PredictionProgress
  },
  created: function () {
    this.initializeComponent()
  },
  mounted () {
    EventBus.$emit('pageChanged', {
      pages: ['Test'],
      keepRoot: true,
    })
    EventBus.$emit('pageChanged',this.$route.meta.title)
  },
  methods: {
    ...mapActions({
      resetStageLock: 'Testing/resetStageLock'
    }),
    initializeComponent () {
      this.$store.dispatch('Testing/resetAllState')
    },
    updateCurrentStep (stepId) {
      // NOTE: remove current implementation to avoid user switching stage
    },
    progressToNextStep () {
      // Notify child component to check the content
      let call = this.$refs.stepContent.checkContent()
      // Handling empty returned response while the child component is not ready
      if (call === undefined) return

      call.then((result) => {
        if (this.isCurrentStageLocked) return

        console.log(this.currentStep, this.stepContent.length - 1)
        if (this.currentStep == this.stepContent.length - 1) {
          this.$router.push('/viewer-overview')
        }
        this.currentStep += 1
        this.resetStageLock()
      })
    },
    finializeProjectCreation () {
      // TODO: save meta data by backend
    },
    redirectToPage () {
      this.$router.push('/model-profile')
    }
  },
  computed: {
    ...mapGetters('Testing', {
      isCurrentStageLocked: 'isCurrentStageLocked'
    })
  },
  data () {
    return {
      stepContent: [
        {
          id: 0,
          title: 'Import dataset',
          contentType: 'ImportDatasetStep'
        },
        {
          id: 1,
          title: 'Overview of dataset',
          contentType: 'ResourcesCheckStep'
        },
        {
          id: 2,
          title: 'Start testing',
          contentType: 'PredictionProgress'
        }
      ],
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
#btn-cancel {
  & .content {
    background-color: rgba(200, 0, 0, 0.75);
  }
}
</style>
