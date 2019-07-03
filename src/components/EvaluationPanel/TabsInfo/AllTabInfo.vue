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
  import allTableData from './All-table-data.json'

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
          ...allTableData.metrics
        }
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
