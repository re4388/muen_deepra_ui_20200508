<template>
  <div>
    <Tabs></Tabs>
  </div>


</template>

<script>
  import Tabs from './TabsInfo/Tabs.vue'
  export default {
    name: 'EvaluationPanel',
    components: {
      Tabs,
    },
    data() {
      return {
  
      }
    }
  }

</script>

<style lang="scss" scoped>
  // ul.breadcrumb {
  //   padding: 1px 10px;
  //   list-style: none;
  //   background-color: rgb(128, 128, 128);
  // }

  // ul.breadcrumb li {
  //   display: inline;
  //   font-size: 15px;
  // }

  // ul.breadcrumb li+li:before {
  //   padding: 8px;
  //   color: black;
  //   content: "/\00a0";
  // }

  // ul.breadcrumb li a {
  //   color: #000508;
  //   text-decoration: none;
  // }

  // ul.breadcrumb li a:hover {
  //   color: #01447e;
  //   text-decoration: underline;
  // }

  // .wrapper {
  //   // min-height: 100%;  
  //   background-color: gray;
  //   overflow-y: scroll;
  // }

  // #page-content {
  //   color: black;
  // }

  // .container {
  //   list-style: none;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;

  // }

  // .item {
  //   // background: tomato;
  //   // padding: 5px;
  //   // width: 50px;
  //   // height: 150px;
  //   // margin-top: 10px;
  //   // line-height: 150px;
  //   // color: white;
  //   // font-weight: bold;
  //   font-size: 1 em;
  //   // text-align: center;
  // }

</style>
