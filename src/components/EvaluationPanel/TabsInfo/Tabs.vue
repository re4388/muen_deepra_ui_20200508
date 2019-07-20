<template>
  <div class="container">
    <ConfusionMatrix id="modal" v-if="showModal" @close-event="closeModal" />

    <!-- Modal 跳出 混淆矩陣 -->
    <div>


      <!-- D3.js V3 -->
      
      <b-modal hide-footer id="modal-lg" centered title="Confusion Matrix">
        
        <h1>
          <ConfusionMatrix2 />
        </h1>


      <!-- b-button V2 -->
      <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
      <!-- <b-modal hide-footer id="modal-lg" centered size="lg" title="Confusion Matrix">
        <b-table striped hover :items="items"></b-table> -->


        <!-- HTML TABLE V1 -->
        <!-- <table>
          <thead>
            <tr>
              <th v-for="category in selectedCategories" :key="category.id">{{category}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in selectedRows" :key="row.id">
              <td
                v-for=" item in row"
                :key="item.id"
                :title="item.annotation"
                v-tippy="{ 
                          arrow: true, 
                          animation : 'fade', 
                          interactive : true,
                          }"
              >
                {{ item.data }}
              </td>
            </tr>
          </tbody>
        </table> -->


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
      <div class="row">
        <h5 class="col-12 text-left text-light m-0 mt-4">{{ tab.name }}</h5>
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
          <ThresholdAdjustment
            class="mt-3"
            :threshold-data="tab.threshold"
            :graph-data="tab.grpah"
            @threshold-change="ThresholdChange"
          ></ThresholdAdjustment>
          <b-button pill block class="mt-5" v-b-modal.modal-lg variant="outline-dark">Confusion Matrix</b-button>
        </div>
      </div>
    </Tab>
    

    
  </div>
  
</template>

<script>


import * as d3 from 'd3';


// import the fake data
import {
  confusion_matrix,
  confusion_matrix_caterogies,
  confusion_matrix2,
  confusion_matrix_caterogies2,
} from "../InfoDisplay/data4";
import tabData from "@/components/EvaluationPanel/TabsInfo/Tab-data.json";
// import tabData from '@/components/EvaluationPanel/TabsInfo/Tab-data.js'

// import components
import Tab from "./Tab";
import MetricsDisplay from "../InfoDisplay/MetricsDisplay";
import GraphDisplay from "../InfoDisplay/GraphDisplay";
import ThresholdAdjustment from "../InfoDisplay/ThresholdAdjustment";
import ConfusionMatrix from "../InfoDisplay/ConfusionMatrix";
import ConfusionMatrix2 from "../InfoDisplay/ConfusionMatrix2";

export default {
  name: "Tabs",

  components: {
    Tab,
    MetricsDisplay,
    GraphDisplay,
    ThresholdAdjustment,
    ConfusionMatrix,
    ConfusionMatrix2
  },

  data() {
    return {
      items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        ],
      rows: confusion_matrix,
      categories: confusion_matrix_caterogies,
      rows2: confusion_matrix2,
      categories2: confusion_matrix_caterogies2,
      tabs: tabData.content,
      views: [], // e.g. => [ 'AllTabInfo','Tab-1info','Tab-2info','Tab-3info','Tab-4info' ]
      currentView: "",
      newThreshold: 0,
      showModal: false
    };
  },

  mounted() {
    this.getView();
    this.currentView = this.views[0];
    var p = d3
        .select(".d3")
        .data([4, 8, 15,20])
        .text(function (d) {
            return d * 2;
        });

        // Enter… 
        // p
        // .enter()
        // .append("p")
        // .text(function(d) { 
        //     return d; 
        // });
  },
  computed:{
    selectedCategories(){
      if(this.currentView === 'AllTabInfo'){
        return this.categories
      } else if (this.currentView === 'Tab-1info') {
        return this.categories2
      }
    },
    selectedRows(){
      if(this.currentView === 'AllTabInfo'){
        return this.rows
      } else if (this.currentView === 'Tab-1info') {
        return this.rows2
      }
    },

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
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>






<style lang="scss" scoped>
#modal {
  position: absolute;
  left: calc(20% - 50px);
  top: calc(30% - 50px);
  // width: 200px;
  // height: 200px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // background: grey;
  // color:white;
  // flex-direction: column;
  z-index: 2;
}

ul.breadcrumb {
  list-style: none;
  padding: 50px;
  margin: 10px;
  background-color: #696969;
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
      color:rgba(255, 255, 255, 0.5);
      text-decoration: none;
      &:hover {
        color: rgba(255, 255, 255, 0.75);
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
