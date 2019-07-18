<template>
  <div class="container-fluid ">
    <!-- 標題 -->
    <header class="row ">
      <div class="col-12 ">
        <h2 class="text-light bg-color border p-2 m-3">{{ title }}</h2>
        <p id="page-content" class="px-3 m-2 text-light text-left">{{ description }}</p>
      </div>
    </header>
    <!-- 主要內容 -->
    <main class="row ">
      <Tabs class="col-12 "></Tabs>
    </main>
    <!-- footer -->
    <footer class="row ">
      <div class="col-12 text-center text-muted py-4">opyright @muenai</div>C
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
      description: `The Model evaluation report is created at 09:21, 2019/05/17. 
        In this analysis, We analyzed 4463 image, and these images were divided in 5 fold for training dataset and validation dataset. 
        It is take 10hr for training .
        The prediction performance of model are shown in following table.`
    };
  }
};
</script>

<style lang="scss" scoped>
.container-fluid {
  // min-height: 100%;
  background-color: gray;
  overflow-y: scroll;
}

.container {
  // list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

