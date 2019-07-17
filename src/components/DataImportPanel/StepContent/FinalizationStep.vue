<template>
  <div class="finalization-step step-content d-flex flex-column">
    <div class="title-section">
      <h4 class="title text-content">{{ content.title }}</h4>
      <p class="description text-content">
        Overview of dataset<br>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinalizationStep',
  props: {
    content: Object
  },
  mounted: function () {
    this.initializeContent()
  },
  methods: {
    initializeContent () {
      this.$store.dispatch('setCurrentStage', 'finalization')
    },
    checkContent () {
      this.$store.dispatch('unlockStage')
      this.$store.dispatch('setCompletedStageIndex', this.content.id)
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content {
  color: black;
  padding: 20px;
}
.text-content {
  text-align: left;
}
.description {
  text-align: left;
}
</style>
