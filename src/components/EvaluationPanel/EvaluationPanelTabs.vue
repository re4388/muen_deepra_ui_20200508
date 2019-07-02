<template>
  <div>
    <ul class="breadcrumb">
      <li><a href="#" @click="showAll">All labels</a></li>
      <li><a href="#" @click="show1">Label 1</a></li>
      <li><a href="#" @click="show2">Label 2</a></li>
      <li><a href="#" @click="show3">Label 3</a></li>
    </ul>
    <all-tab-info v-if="showAllTabInfo" />;
    <tab1info v-if="showTable1Info" />
    <tab2info v-if="showTable2Info" />
    <tab3info v-if="showTable3Info" />
  </div>


</template>

<script>
  import AllTabInfo from './TabsInfo/AllTabInfo.vue'
  import Tab1info from './TabsInfo/Tab1info.vue'
  import Tab2info from './TabsInfo/Tab2info.vue'
  import Tab3info from './TabsInfo/Tab3info.vue'

  export default {
    name: 'EvaluationPanel',
    components: {
      AllTabInfo,
      Tab1info,
      Tab2info,
      Tab3info,
    },
    data() {
      return {
        showAllTabInfo: false,
        showTable1Info: false,
        showTable2Info: false,
        showTable3Info: true,
      }
    },
    methods: {
      showAll() {
        this.showAllTabInfo = true
        this.showTable1Info = false
        this.showTable2Inf = false
        this.showTable3Info = false
      },
      show1() {
        this.showAllTabInfo = false
        this.showTable1Info = true
        this.showTable2Info = false
        this.showTable3Info = false
      },
      show2() {
        this.showAllTabInfo = false
        this.showTable1Info = false
        this.showTable2Info = true
        this.showTable3Info = false
      },
      show3() {
        this.showAllTabInfo = false
        this.showTable1Info = false
        this.showTable2Info = false
        this.showTable3Info = true
      },

    }
  }

</script>

<style lang="scss" scoped>
  ul.breadcrumb {
    padding: 1px 10px;
    list-style: none;
    background-color: rgb(128, 128, 128);
  }

  ul.breadcrumb li {
    display: inline;
    font-size: 15px;
  }

  ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
  }

  ul.breadcrumb li a {
    color: #000508;
    text-decoration: none;
  }

  ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
  }

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
