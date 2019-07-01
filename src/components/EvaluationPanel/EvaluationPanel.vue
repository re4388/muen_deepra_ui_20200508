<template>
  <div id="model-overview-panel" class="d-flex-col text-light">
    <div class="border m-3">
      <h2>My first image Dataset_Model 1</h2>
    </div>
    <div>
      <p id="page-content" class="px-3 text-light text-left">
        The Model evaluation report is created at 09:21, 2019/05/17. In this analysis, We analyzed 4463 image, and these
        images were divided in 5 fold for training dataset and validation dataset. It is take 10hr for training . The
        prediction performance of model are shown in following table.
      </p>
      <metrics-display />
      <graph-display />

    </div>
  </div>


</template>

<script>
  import MetricsDisplay from './MetricsDisplay.vue'
  import GraphDisplay from './GraphDisplay.vue'

  export default {
    name: 'EvaluationPanel',
    components:{
      MetricsDisplay,
      GraphDisplay
    }
  }

</script>

<style lang="scss" scoped>
#model-overview-panel {
min-height: 100%;
background-color: gray;
}
#page-content {
color: black;
}

</style>
