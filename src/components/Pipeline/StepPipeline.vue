<template>
  <div class="step-pipeline">
    <div id="container">
      <div class="rect"></div>
      <template v-for="(item, index) in contentList" class="pipeline">
        <pipeline-element
          ref="pipelineElement"
          :key="index"
          :digit="item.id"
          @onLabelSelected="notifySelection"
        />
      </template>
    </div>
  </div>
</template>

<script>
import PipelineElement from './PipelineElement.vue'

export default {
  name: 'StepPipeline',
  components: {
    PipelineElement
  },
  props: {
    contentList: Array,
    enableSelectionOnClicked: Boolean,
    indexActivated: Number
  },
  mounted: function () {
    this.initializeComponent()
  },
  watch: {
    indexActivated () {
      this.activatePipelineElement(this.indexActivated)
    }
  },
  methods: {
    initializeComponent () {
      this.activatePipelineElement(this.indexActivated)
    },
    notifySelection (selectedId) {
      if (!this.enableSelectionOnClicked) return
      this.$emit('onStepChanged', selectedId)
      this.indexSelected = selectedId;
      this.activatePipelineElement(selectedId)
    },
    activatePipelineElement (selectedId) {
      // reset state of all elements
      this.$refs.pipelineElement.forEach((item, index) => {
        item._data.isSelected = false
      })
      this.$refs.pipelineElement[selectedId]._data.isSelected = true
    }
  },
  data() {
    return {
      indexSelected: null,
    }
  }
}
</script>

<style lang="scss" scoped>
.step-pipeline {
  width: 100px;
  min-width: 100px;
  height: 100%;
  overflow-y: hidden;
}
.pipeline {
  position: absolute;
  z-index: 10;
}
// TODO: rewrite this as a dynamic style (height can be changed according to
// the number of steps)
.rect {
  background-color: rgb(80, 80 ,80);
  height: 215px;
  width: 20px;
  position: absolute;
  margin-left: 40px;
  top: 50px;
}
</style>
