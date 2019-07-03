<template>

  <div class="d-flex flex-column">
    <template v-for="tab in data"  class="container">
      
        {{ tab.name }}
        <MetricsDisplay :metrics-data=" tab.metrics"></MetricsDisplay>

        <br>
        <br>
        <br>
        <br>
        <br>

        <!-- {{ tab.position }} -->
        <GraphDisplay :graph-data="tab.grpah"></GraphDisplay>


        <br>
        <br>
        <br>
        <br>
        <br>

        {{ tab.threshold }}

        <br>
        <br>
        <br>
        <br>
        <br>

      
    </template>

    

  </div>
</template>

<script>
  import TabsData from './Tab-data.json'
  import MetricsDisplay from '../InfoDisplay/MetricsDisplay'
  import GraphDisplay from '../InfoDisplay/GraphDisplay'
  import ThresholdAdjustment from '../InfoDisplay/ThresholdAdjustment'
  export default {
    name: 'Tabs',
    data() {
      return {
        data: TabsData.content,
      }
    },
    components: {
      MetricsDisplay,
      GraphDisplay,
      ThresholdAdjustment
    }
  }




</script>


<style scoped>
</style>
