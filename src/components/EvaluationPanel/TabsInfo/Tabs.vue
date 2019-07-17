<template>
  <!-- tabs 麵包屑 -->
  <div class="container">
    <div class="row align-self-center">
      <div class="col-12 pl-1 pt-2">
        <ul class=" pt-0 breadcrumb text-black-50 mb-1 pb-1">
          <li v-for="tab in tabs" :key="tab.id">
            <a href="#" @click.prevent="changeView(tab)">{{ tab.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 每一個lable/tab 的元件們 -->
    <Tab
      v-for="tab in tabs"
      :key="tab.id"
      :name="tab.name"
      :current-view="currentView"
      class="currentView container"
    >
      <!-- tab / label的 標題 -->
      <div class="row">
        <h3 class="col-12 text-center mt-0 p-2">{{ tab.name }}</h3>
      </div>

      <!-- MetricsDisplay -->
      <div class="row">
        <MetricsDisplay :metrics-data=" tab.metrics" class="col-12"></MetricsDisplay>
      </div>

      <!-- GraphDisplay -->
      <div class="row">
        <div class="col-6">
          <GraphDisplay :graph-data="tab.grpah" :new-threshold="newThreshold"></GraphDisplay>
        </div>

        <!-- ThresholdAdjustment -->
        <div class="col-6">
          <div class="flex-column">
            <div class="col-10"></div>

            <ThresholdAdjustment
              :threshold-data="tab.threshold"
              @threshold-change="ThresholdChange"
            ></ThresholdAdjustment>

            <div class="col-2 mt-5"></div>
            <b-button variant="outline-dark">Confusion Matrix</b-button>
          </div>
        </div>
      </div>
    </Tab>
  </div>
</template>

<script>
// import the fake data
import tabData from "@/components/EvaluationPanel/TabsInfo/Tab-data.json";
// import tabData from '@/components/EvaluationPanel/TabsInfo/Tab-data.js'

// import components
import Tab from "./Tab";
import MetricsDisplay from "../InfoDisplay/MetricsDisplay";
import GraphDisplay from "../InfoDisplay/GraphDisplay";
import ThresholdAdjustment from "../InfoDisplay/ThresholdAdjustment";

export default {
  name: "Tabs",

  components: {
    Tab,
    MetricsDisplay,
    GraphDisplay,
    ThresholdAdjustment
  },

  data() {
    return {
      tabs: tabData.content,
      views: [], // e.g. => [ 'AllTabInfo','Tab-1info','Tab-2info','Tab-3info','Tab-4info' ]
      currentView: "",
      newThreshold: 0
    };
  },

  mounted() {
    this.getView();
    this.currentView = this.views[0];
  },
  methods: {
    getView() {
      this.views = this.tabs.map(key => {
        return key.name;
      });
    },
    changeView(obj) {
      this.currentView = obj.name;
    },
    ThresholdChange(obj) {
      this.newThreshold = obj.result;
    }
  }
};
</script>






<style lang="scss" scoped>
ul.breadcrumb {
  list-style: none;
  background-color: rgb(128, 128, 128);
  li {
    // display: inline;
    font-size: 18px;
    + li:before {
      padding: 5px;
      color: rgb(8, 8, 8);
      content: " | ";
    }
    a {
      color: #080808;
      text-decoration: none;
      &:hover {
        color: #01447e;
        text-decoration: underline;
      }
    }
  }
}
</style>
