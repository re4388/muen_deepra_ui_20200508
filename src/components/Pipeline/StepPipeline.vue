<template>
  <div class="step-pipeline">
    <template v-for="(item, index) in contentList">
      <pipeline-element
        :key="index"
        :digit="item.id"
        @on-label-selected="onStepChanged"
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
    onStepChanged (selectedId) {
      this.$emit('on-step-changed', selectedId)
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
