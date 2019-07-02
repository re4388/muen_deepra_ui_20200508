<template>
  <div>
    <h1>This is tab1</h1>
    <MetricsDisplay />
    <GraphDisplay />
    <ThresholdAdjustment />
  </div>


</template>

<script>
  import MetricsDisplay from '../InfoDisplay/MetricsDisplay.vue'
  import GraphDisplay from '../InfoDisplay/GraphDisplay.vue'
  import ThresholdAdjustment from '../InfoDisplay/ThresholdAdjustment.vue'

  export default {
    name: 'Tab1info',
    components: {
      MetricsDisplay,
      GraphDisplay,
      ThresholdAdjustment
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>

</style>
