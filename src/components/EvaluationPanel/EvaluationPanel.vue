<template>
  <div class="container-fluid ">
    <!-- 標題 -->
    <header class="row ">
      <div class="col-12 ">
        <h2 class="text-light bg-color rounded-pill border p-2 m-3">{{ title }}</h2>
        <p id="page-content" class="px-3 m-2 text-light text-left">
          The Model evaluation report. 
        In this analysis, images were divided in {{ folderNumber }} folds for training dataset and validation dataset. 
        The prediction performance of model are shown in following table.
        <!-- The Model evaluation report is created at {{ createTime }}. 
        In this analysis, we analyzed {{ imageNumber }} image, 
        and these images were divided in {{ folderNumber }} folds for training dataset and validation dataset. 
        It takes {{ trainingTime}} for training .
        The prediction performance of model are shown in following table. -->
        </p>
      </div>
    </header>
    <!-- 主要內容 -->
    <main class="row ">
      <Tabs class="col-12 "></Tabs>
    </main>
    <!-- footer -->
    <footer class="row ">
      <div class="col-12 text-center text-muted py-4">copyright @muenai</div>
    </footer>
  </div>
</template>

<script>
import Tabs from "./TabsInfo/Tabs.vue";
export default {
  name: "EvaluationPanel",
  components: {
    Tabs
  },
  data() {
    return {
      title: "First Image Dataset Model 1",
      // TODO: need to link to backend
      // use...vuex 
      createTime:'11:21, 2019/07/30',
      imageNumber:'4023',
      folderNumber: '10',
      trainingTime: '10 hr 23 min',

    };
  }
};
</script>

<style lang="scss" scoped>
.container-fluid {
  // min-height: 100%;
  background-color:#808080;
  overflow-y: scroll;
}

.container {
  // list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

