<template>
  <div class="step-pipeline">
    <template v-for="(item, index) in contentList">
      <pipeline-element
        :key="index"
        :digit="item.id"
        @onLabelSelected="notifySelection"
      />
    </template>
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
    contentList: Array
  },
  methods: {
    notifySelection (selectedId) {
      this.$emit('onStepChanged', selectedId)
      this.indexSelected = selectedId;
      console.log(this.indexSelected)
    }
  },
  data() {
    return {
      indexSelected: null
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
</style>
