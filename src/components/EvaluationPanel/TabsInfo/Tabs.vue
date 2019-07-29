<template>
  <div class="container">
    <!-- ROC Graph 的 Modal -->
    <div>
      <b-modal size="lg" id="roc-chart" title="ROC Chart " hide-footer centered>
        <h1>
          <ROCGraph />
        </h1>
      </b-modal>
    </div>

    <!-- Confusion Matrix 的 Modal -->
    <div>
      <b-modal hide-footer centered id="modal-lg" title="Confusion Matrix">
        <h1>
          <ConfusionMatrix :data="selectedMatrixData" />
        </h1>
      </b-modal>
    </div>

    <!-- tabs 麵包屑 -->
    <div class="row align-self-center">
      <div class="col-12 pl-1 pt-2">
        <ul class="pt-0 breadcrumb rounded text-black-50 m-0 p-3">
          <li v-for="tab in tabs" :key="tab.id">
            <a href="#" @click.prevent="changeView(tab)">{{ tab.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 每一個lable/Tab 的元件們 -->
    <Tab
      v-for="tab in tabs"
      :key="tab.id"
      :name="tab.name"
      :current-view="currentView"
      class="currentView container"
    >
      <!-- tab 標題 -->
      <div class="row" slot="title" >
        <h5 class="col-12 text-left text-light m-0 mt-4">{{ tab.name }}</h5>
      </div>

      <!-- MetricsDisplay -->
      <div class="row mt-1" slot="MetricsDisplay">
        <MetricsDisplay :metrics-data=" tab.metrics" class="col-12"></MetricsDisplay>
      </div>

      <!-- GraphDisplay -->
      <!-- <div class="row" > -->
        <!-- <div class="col-8" slot="GraphDisplay2"> -->
          <GraphDisplay2 
          class="outterGrpah"
          slot="GraphDisplay2" 
          :graph-data="tab.grpah" 
          :new-threshold="newThreshold"/>
          <!-- <b-button  v-b-modal.roc-chart pill size="sm"  class="mt-3"  variant="outline-dark">See ROC Chart</b-button> -->
        <!-- </div> -->

        <!-- ThresholdAdjustment -->
        <!-- <div class="col-4" slot="ThresholdAdjustment"> -->
          <ThresholdAdjustment slot="ThresholdAdjustment"
            class="mt-3"
            :threshold-data="tab.threshold"
            :graph-data="tab.grpah"
            @threshold-change="ThresholdChange"
          ></ThresholdAdjustment>

          <!-- Confusion Matrix 的按鈕 -->
          <b-button
            block
            pill
            size="sm"
            class="mt-4"
            v-b-modal.modal-lg
            variant="outline-dark"
          >Confusion Matrix</b-button>

          <!-- relable 的按鈕  還沒建立 TODO:-->
          <b-button
            block
            pill
            size="sm"
            class="mt-4"
            variant="outline-dark"
          >Relable</b-button>
        <!-- </div> -->
      <!-- </div> -->
    </Tab>
  </div>
</template>

<script>
// 導入confusionMatrixData
import { matrixData } from "../InfoDisplay/confusionMatrixData.js";

// 導入Tab-data
import { tabData } from "@/components/EvaluationPanel/TabsInfo/Tab-data.js";
// import { tabData,createData } from "@/components/EvaluationPanel/TabsInfo/Tab-data.js";
// console.log(tabData)
// console.log(classArray)
// let data = {} // from store, from parsed file
// let temp = createData(data.lables, data.metrics)

// import components
import Tab from "./Tab";
import MetricsDisplay from "../InfoDisplay/MetricsDisplay";
import GraphDisplay2 from "../InfoDisplay/GraphDisplay2";
import ThresholdAdjustment from "../InfoDisplay/ThresholdAdjustment";
import ConfusionMatrix from "../InfoDisplay/ConfusionMatrix";
import ROCGraph from "../InfoDisplay/ROCGraph";

export default {
  name: "Tabs",

  components: {
    Tab,
    MetricsDisplay,
    GraphDisplay2,
    ThresholdAdjustment,
    ConfusionMatrix,
    ROCGraph
  },

  data() {
    return {
      tabs: tabData,
      views: [], // e.g. => [ 'AllTabInfo','Tab-1info','Tab-2info','Tab-3info','Tab-4info' ]
      currentView: "",
      newThreshold: 0
    };
  },

  mounted() {
    this.getView();
    this.currentView = this.views[0];
  },
  computed: {
    // 這邊沒有動態生成，因此有一個上限顯示矩陣的數量，目前是10個類別
    selectedMatrixData() {
      if (this.currentView === this.views[0]) {
        return matrixData[0];
      } else if (this.currentView === this.views[1]) {
        return matrixData[1];
      } else if (this.currentView === this.views[2]) {
        return matrixData[2];
      } else if (this.currentView === this.views[3]) {
        return matrixData[3];
      } else if (this.currentView === this.views[4]) {
        return matrixData[4];
      } else if (this.currentView === this.views[5]) {
        return matrixData[5];
      } else if (this.currentView === this.views[6]) {
        return matrixData[6];
      } else if (this.currentView === this.views[7]) {
        return matrixData[7];
      } else if (this.currentView === this.views[8]) {
        return matrixData[8];
      } else if (this.currentView === this.views[9]) {
        return matrixData[9];
      } else if (this.currentView === this.views[10]) {
        return matrixData[10];
      }
      
    }
  },
  methods: {
    // get all tabs
    getView() {
      this.views = this.tabs.map(key => {
        return key.name;
      });
    },
    changeView(tab) {
      this.currentView = tab.name;
    },
    ThresholdChange(obj) {
      this.newThreshold = obj.result;
    }
  }
};
</script>






<style lang="scss" scoped>


.outterGrpah {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  height: 500px;
  width: 700px;
}
#modal {
  position: absolute;
  left: calc(20% - 50px);
  top: calc(30% - 50px);
  z-index: 2;
}

ul.breadcrumb {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid rgb(8, 8, 8);
  cursor: pointer;
  background: #696969;
  margin-bottom: -1px;
  margin-right: -1px;
  list-style: none;
  li {
    // display: inline;
    font-size: 18px;
    + li:before {
      padding: 15px;
      color: rgb(8, 8, 8);
      content: "   ";
    }
    a {
      font-size: 20px;
      // color:rgba(255, 255, 255, 0.5);
      color: #343a40;
      text-decoration: none;
      &:hover {
        // color: rgba(255, 255, 255, 0.75);
        color: #121416;
        text-decoration: none;
      }
    }
  }
}

table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

/* 設定內部框線 */
table,
th,
td {
  border: 1px solid #44475c;
}

table th {
  text-transform: uppercase;
  text-align: center;
  background: #44475c;
  color: #fff;
  /* cursor: pointer; */
  padding: 8px;
  min-width: 30px;
}

table th:first-child {
  /* color: #44475c; */
  background: #44475c;
}

/* table th:hover {
  background: #717699;
} */

/* 這裡需要先設定可能最大的row number, 如果實際資料大於這邊設定的最大值，就會無法呈現效果了 */
table tr:nth-child(1) td:first-child {
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background: #44475c;
}

table tr:nth-child(2) td:first-child {
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background: #44475c;
}
table tr:nth-child(3) td:first-child {
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background: #44475c;
}
table tr:nth-child(4) td:first-child {
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background: #44475c;
}
table tr:nth-child(5) td:first-child {
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background: #44475c;
}

table td {
  text-align: center;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
</style>
