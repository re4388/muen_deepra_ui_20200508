<template>
  <div class="wrapper">

    <header>
      <div class="container text-light bg-color">
        <div class="item border mt-3 ">
          <h2>My first image Dataset_Model 1</h2>
        </div>
      </div>
      <div class="item">
        <p id="page-content" class="px-3  mb-1 text-light text-left">
          The Model evaluation report is created at 09:21, 2019/05/17. In this analysis, We analyzed 4463 image, and
          these images were divided in 5 fold for training dataset and validation dataset. It is take 10hr for training .
          The prediction performance of model are shown in following table.
        </p>
      </div>
    </header>

    <main>
      <Tabs></Tabs>
    </main>

    <footer class="text-center text-muted py-4">
      Copyright @muenai
    </footer>

  </div>


</template>
<script>
  import Tabs from './TabsInfo/Tabs.vue'
  export default {
    name: 'EvaluationPanel',
    components: {
      Tabs
    }
  }

</script>

<style lang="scss" scoped>
  .wrapper {
    // min-height: 100%;  
    background-color: gray;
    overflow-y: scroll;
  }

  #page-content {
    color: black;
  }

  .container {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  }

  .item {
    // background: tomato;
    // padding: 5px;
    // width: 50px;
    // height: 150px;
    // margin-top: 10px;
    // line-height: 150px;
    // color: white;
    // font-weight: bold;
    font-size: 1 em;
    // text-align: center;
  }

</style>
