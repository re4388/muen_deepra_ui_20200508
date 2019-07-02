<template>
  <div>
    <div class="item">
      <MetricsDisplay :data1="data1"></MetricsDisplay>
    </div>
    <div class="mb-5 row">
      <div class="col-md-6">
        <graph-display />
      </div>
      <div class="col-md-6">
        <threshold-adjustment />
      </div>
    </div>
  </div>

</template>

<script>
  import MetricsDisplay from '../InfoDisplay/MetricsDisplay.vue'
  import GraphDisplay from '../InfoDisplay/GraphDisplay.vue'
  import ThresholdAdjustment from '../InfoDisplay/ThresholdAdjustment.vue'

  export default {
    name: 'AllTabInfo',
    components: {
      MetricsDisplay,
      GraphDisplay,
      ThresholdAdjustment
    },
    data() {
      return {
        data1: {
          Sensitivity: '99.2%±0.02',
          Specificity: '94.3%±0.02',
          Precision: '91.8%±0.02',
          F1score: '0.854±0.02',
          AUC: '0.938±0.02',
        },
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
