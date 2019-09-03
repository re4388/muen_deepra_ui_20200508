<template>
  <div class="container">
    <!-- TEST EXPORT MODAL -->
    <b-modal id="bv-modal-example" hide-footer>
      <template slot="modal-title">Summary Export</template>
      <div class="d-block text-center">
        <p class="text-center mt-1">{{ showExportMsg }}</p>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
    </b-modal>
    <!-- Confusion Matrix 的 Modal -->
    <div>
      <b-modal hide-footer centered size="cm" id="modal-lg" @shown="onModalShown">
        <template slot="modal-header">
          <h5 class="text-center">Confusion Matrix</h5>
        </template>
        <h1>
          <ConfusionMatrix :data="selectedMatrixData" :new-threshold="newThreshold" />
        </h1>
      </b-modal>
    </div>

    <!-- if no tabs data, ask user go back to project to init -->
    <div v-if="tabs === null">
      <b-alert show variant="dark">
        <a href="#" class="alert-link">
          <router-link to="/project-overview">Please train a project or select the existing project</router-link>
        </a>
      </b-alert>
    </div>

    <!-- dropdown to select models record -->
    <div class="dropdown d-flex">
      <div>
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Model History</button>
        <span class="caret"></span>
        <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
          <a
            v-for="modelName in modelNames"
            :key="modelName + Date.now()"
            @click="modelNameChage(modelName)"
            class="dropdown-item"
            href="#"
          >{{ modelName | modelIdFormater }}</a>
        </div>
      </div>

      <div class="mt-2 ml-2">
        <p
          :class="{ 'text-left': true, 'text-warning':loadModelError }"
        >{{ modelId | modelIdFormater}}</p>
      </div>
    </div>

    <!-- tabs Breadcrumb -->
    <div class="m-0 bg-white text-white">
      <b-tabs
        v-model="tabIndex"
        class="text-info"
        no-nav-style
        active-nav-item-class="font-weight-bold text-uppercase text-dark"
      >
        <b-tab
          v-for="tab in tabs"
          :key="tab.name"
          :title="tab.name"
          @click.prevent="changeTab(tab)"
        ></b-tab>
      </b-tabs>
    </div>

    <!-- use slot to put components in Tab component -->
    <Tab
      v-for="tab in tabs"
      :key="tab.id"
      :name="tab.name"
      :current-tab="currentTab"
      class="currentTab container"
    >
      <!-- tab title -->
      <!-- <div class="row" slot="title">
        <h5 class="col-12 text-center text-light m-0 mt-3"> {{ tab.name | capitalize }}</h5>
      </div>-->

      <!-- MetricsDisplay component-->
      <div class="row mt-3" slot="MetricsDisplay">
        <MetricsDisplay 
        :metrics-data=" tab.metrics" 
        :graph-data="tab.graph"
        :currentTab="currentTab" 
        class="col-12" 
        />
      </div>

      <!-- GraphDisplay component -->
      <GraphDisplay
        class="outterGraph"
        slot="GraphDisplay"
        :graph-data="tab.graph"
        :new-threshold="newThreshold"
      />

      <!-- ThresholdAdjustment component -->
      <ThresholdAdjustment
        slot="ThresholdAdjustment"
        class="mt-3"
        :threshold-data="tab.threshold"
        :graph-data="tab.graph"
        @threshold-change="ThresholdChange"
      ></ThresholdAdjustment>

      <!-- Confusion Matrix component Button -->
      <b-button
        block
        pill
        size="sm"
        class="mt-4"
        v-b-modal.modal-lg
        variant="outline-dark"
      >Confusion Matrix</b-button>

      <!-- relablel 的按鈕 -->
      <b-button
        block
        pill
        size="sm"
        class="mt-4"
        variant="outline-dark"
        @click="onBtnRelabelClick"
      >Relabel</b-button>

      <!-- export files related to validation, maybe we should group this with `div` tag -->
      <b-button
        block
        pill
        size="sm"
        class="mt-4"
        variant="outline-dark"
        @click="$refs.exportFolderInput[0].click()"
      >Export</b-button>
      <input
        id="exportFolderInput"
        type="file"
        ref="exportFolderInput"
        style="display:none;"
        webkitdirectory
        @change="onExport"
      />
    </Tab>
  </div>
</template>

<script>
/***** local Fake data to locally test *****/
// minist data
import localJson from "../multi_class_mnist.json";
// binary data
import localJson2 from "../binary_data.json";
// regression data
import localJsonRegression from "../regression_data.json";

// import dataProcess, which process data from gRPC
import { generateModel } from "@/components/EvaluationPanel/TabsInfo/dataProcess.js";

// import gRPC service
import validationService from "@/api/validation_service.js";
import projectManager from "@/api/projects_service.js";
import ModelManager from "@/api/models_service.js";

// import utilties
import modPath from "path";
import modFs, { constants, exists } from "fs";
import fileFetcher from "@/utils/file_fetcher.js";
import vueUtils from "@/api/vue_utils.js";

// import vue components
import Tab from "./Tab";
import MetricsDisplay from "../InfoDisplay/MetricsDisplay";
import GraphDisplay from "../InfoDisplay/GraphDisplay";
import ThresholdAdjustment from "../InfoDisplay/ThresholdAdjustment";
import ConfusionMatrix from "../InfoDisplay/ConfusionMatrix";

import { mapGetters, mapActions } from "vuex";
// import { Promise } from "q";

export default {
  name: "Tabs",

  components: {
    Tab,
    MetricsDisplay,
    GraphDisplay,
    ThresholdAdjustment,
    ConfusionMatrix
  },

  data() {
    return {
      tabs: null,
      tabList: [], //  => [ 'class 0','class 1','class 2'...]
      currentTab: "",
      newThreshold: 0,
      modelId: "",
      modelNames: [],
      showExportMsg: "",
      loadModelError: false,
      tabIndex: 0
    };
  },
  // watch:{
  //   modelId(){
  //     this.loadModal();
  //   }
  // },

  created() {
    this.dataInit();
  },

  mounted() {},

  computed: {
    currentProjectData() {
      return this.$store.getters["Project/currentProject"];
    },

    selectedMatrixData() {
      // tabList got data is async, so need to skip operation when no tabList
      if (this.tabList.length === 0) {
        return;
      }
      // get the current view index
      let currentTabIndex = this.tabList.indexOf(this.currentTab);
      return this.tabs[currentTabIndex]["confusionMatrixInfo"];
    },

    ...mapGetters("Validation", {
      exportLocation: "outputLocation"
    })
  },

  methods: {
    onModalShown(e) {
      let el = document.getElementsByClassName("modal-cm")[0];
      el.style.maxWidth = "1200px";
      el.style.width = "1200px";
    },
    modelNameChage(id) {
      this.modelId = id;
      this.modelChange();
    },

    getTabList() {
      this.tabList = this.tabs.map(key => {
        return key.name;
      });
    },

    InitTab() {
      this.getTabList();
      this.currentTab = this.tabList[0];
      this.tabIndex = 0;
    },

    changeTab(tab) {
      this.currentTab = tab.name;
    },

    ThresholdChange(obj) {
      this.newThreshold = obj.result;
    },

    loadModal() {
      // console.log("currentProjectData:", this.currentProjectData);
      // console.log("current model id:", this.modelId);

      // locate file path
      let filePath = modPath.join(
        this.currentProjectData.location,
        "deepra_output",
        this.modelId,
        "validation"
      );
      let fn = modPath.join(filePath, "validation_output.json");

      // get file and process data
      fileFetcher
        .readJson(fn, false)
        .then(result => {
          // set up err msg
          this.loadModelError = false;
          console.log("--- begin to read local json ---");

          // process data by generateModel
          let tabData = generateModel(result.labels, result.metrics);
          this.tabs = tabData;

          // emit data to EvaluationPanel.vue
          this.$emit("model-data", {
            result: tabData
          });

          this.InitTab();
          // add sth to reflash the graph
          // console.log(this.currentTab)
          // this.currentTab = this.tabList[0];
        })
        .catch(err => {
          this.loadModelError = true;
          // console.log("readJson err:", err);
          // empty space for offset the filters effect
          this.modelId = "      model doesn't exist";
        });
    },

    modelChange() {
      this.loadModal();
    },

    // getModelList is asy, so make it return a promise to make sure we have resolve
    // and then to process below
    getModelList() {
      return new Promise((resolve, reject) => {
        ModelManager.GetModelListByProject(this.currentProjectData.uuid)
          .then(result => {
            let re = /(train_[0-9]+_[0-9]+)/;
            let modelHistory = [];

            for (let i = 0; i < result.model_list.length; i++) {
              let model_path = result.model_list[i];

              if (modFs.existsSync(model_path + "/../" + "validation")) {
                modelHistory.push(model_path.match(re)[0]);
                this.modelId = modelHistory[modelHistory.length - 1];
                this.modelNames = modelHistory;
              } else {
                console.log(
                  model_path + "/../" + "validation " + ": folder no exist"
                );
              }
            }
            // console.log(modelHistory);
            resolve(true);
          })
          .catch(err => {
            console.log("GetModelListByProject err:", err);
          });
      });
    },

    dataInit() {
      console.log("--- dataInit invoke: get data from validation result ---");

      //TODO: use below line and comment out vueUtils lines can switch to fakedata
      // let data = localJsonRegression

      // use result from validationOutput
      let data = vueUtils.clone(
        this.$store.getters["Validation/validationOutput"]
      );

      this.getModelList()
        .then(result => {
          if (data.content === null) {
            // if not data, got from local history file
            console.log("--- Tabs: get data from history record ---");
            this.getModelList();
            this.loadModal();
          } else {
            // processed data
            let tabData = generateModel(data.labels, data.metrics);
            this.tabs = tabData;

            // send tabData to EvaluationPanel.vue
            this.$emit("model-data", {
              result: tabData
            });

            // Breadcrumb tab init
            this.InitTab();
          }
        })
        .catch(err => {
          console.log("getModelList err:", err);
        });
    },

    ...mapActions("Validation", {
      setExportLocation: "setOutputLocation"
    }),

    onBtnRelabelClick() {
      this.$router.push("/viewer-overview");
    },

    onExport(evnt) {
      if (evnt.target.files.length === 0) return;
      let outputLocation = evnt.target.files[0].path;
      let traied_model_loc = this.modelId;
      validationService
        .exportFiles(this.currentProjectData, outputLocation, traied_model_loc)
        .then(result => {
          console.log(result);
          this.showExportMsg =
            "Files has been successfully move to folder :  " + outputLocation;
          this.$bvModal.show("bv-modal-example");
        })
        .catch(err => {
          console.log("exportFiles err:", err);
        });
    }
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    modelIdFormater: function(value) {
      return value.slice(6);
    }
  }
};
</script>



<style lang="scss" scoped>
// .modal .modal-huge {
//   max-width: 2000px;
//   width: 2000px;
// }

// @media (min-width: 200px) {
//   .modal .modal-huge {
//     max-width: 250% !important;
//     width: 250% !important;;
//   }
// }

.outterGraph {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  height: 500px;
  width: 600px;
}
#modal {
  position: absolute;
  left: calc(20% - 50px);
  top: calc(30% - 50px);
  z-index: 2;
}
#btn-export-files {
  // visibility: hidden;
  display: none;
}

.scrollable-menu {
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
}
.dropdown-menu {
  width: auto;
}
</style>
