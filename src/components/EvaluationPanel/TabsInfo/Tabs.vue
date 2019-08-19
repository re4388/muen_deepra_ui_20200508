<template>
  <div class="container">
    <!-- TEST EXPORT MODAL -->
    <b-modal id="bv-modal-example" hide-footer>
      <template slot="modal-title">
        Summary Export
      </template>
      <div class="d-block text-center">
        <p class="text-center mt-1">{{ showExportMsg }}</p>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
    </b-modal>
    <!-- Confusion Matrix 的 Modal -->
    <div>
      <b-modal hide-footer centered id="modal-lg" title="Confusion Matrix">
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
    <div class="text-left">
      <b-dropdown id="dropdown-1" text="Model History" class="m-md-2">
        <b-dropdown-item
          v-for="modelName in modelNames"
          :key="modelName + Date.now()"
          @click="modelNameChage(modelName)"
        >{{ modelName }}</b-dropdown-item>
      </b-dropdown>
    </div>
    <p :class="{ 'text-left': true, 'text-warning':loadModelError }">{{ modelId}}</p>

    <!-- tabs Breadcrumb -->
    <div class="m-0 bg-white text-white">
      <b-tabs
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
      <div class="row" slot="title">
        <h5 class="col-12 text-center text-light m-0 mt-3">{{ tab.name | capitalize }}</h5>
      </div>

      <!-- MetricsDisplay component-->
      <div class="row mt-3" slot="MetricsDisplay">
        <MetricsDisplay :metrics-data=" tab.metrics" :currentTab="currentTab" class="col-12" />
      </div>

      <!-- GraphDisplay component -->
      <GraphDisplay
        class="outterGrpah"
        slot="GraphDisplay"
        :graph-data="tab.grpah"
        :new-threshold="newThreshold"
      />

      <!-- ThresholdAdjustment component -->
      <ThresholdAdjustment
        slot="ThresholdAdjustment"
        class="mt-3"
        :threshold-data="tab.threshold"
        :graph-data="tab.grpah"
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

      <!-- relable button TODO:-->
      <b-button block pill size="sm" class="mt-4" variant="outline-dark">Relable</b-button>

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
import localJson from "../deepra_mnistV2.json";
// binary data
import localJson2 from "../binary_data.json";

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
import { Promise } from "q";

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
      loadModelError: false
    };
  },

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
      let currentTab = this.tabList.indexOf(this.currentTab);
      return this.tabs[currentTab]["confusionMatrixInfo"];
    },

    ...mapGetters("Validation", {
      exportLocation: "outputLocation"
    })
  },

  methods: {
    modelNameChage(id) {
      this.modelId = id;
      this.modelChange();
    },

    getTabList() {
      this.tabList = this.tabs.map(key => {
        return key.name;
      });
    },
    
    InitTab(){
      this.getTabList();
      this.currentTab = this.tabList[0];
    },

    changeTab(tab) {
      this.currentTab = tab.name;
    },

    ThresholdChange(obj) {
      this.newThreshold = obj.result;
    },

    loadMoel() {
      console.log("currentProjectData:", this.currentProjectData);
      console.log("current model id:", this.modelId);
      let filePath = modPath.join(
        this.currentProjectData.location,
        "deepra_output",
        this.modelId,
        "validation"
      );

      let fn = modPath.join(filePath, "validation_output.json");
      fileFetcher
        .readJson(fn, true)
        .then(result => {
          console.log("--- fetch local json ---");
          this.loadModelError = false;
          let tabData = generateModel(result.labels, result.metrics);
          this.tabs = tabData;

          // send tabData to EvaluationPanel.vue
          this.$emit("model-data", {
            result: tabData
          });
          this.InitTab()

        })
        .catch(err => {
          this.loadModelError = true;
          console.log("the err:", err);
          this.modelId = "no such file or directory";
          
        });
    },

    modelChange() {
      this.loadMoel();
    },

    getModelList() {
      return new Promise((resolve, reject) => {
        ModelManager.GetModelListByProject(this.currentProjectData.uuid).then(
          result => {
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
          }
        );
      });
    },

    dataInit() {
      console.log("--- Tabs: get data from validation result ---");
      let data = vueUtils.clone(
        this.$store.getters["Validation/validationOutput"]
      );
      this.getModelList().then(result => {
        if (data.content === null) {
          console.log("--- Tabs: get data from history record ---");
          this.getModelList();
          this.loadMoel();
        } else {
          // generate processed data
          let tabData = generateModel(data.labels, data.metrics);
          this.tabs = tabData;

          // send tabData to EvaluationPanel.vue
          this.$emit("model-data", {
            result: tabData
          });

          // Tab init
          this.InitTab()
        }
      });
    },

    ...mapActions("Validation", {
      setExportLocation: "setOutputLocation"
    }),


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

          t;
        });
    }
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
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
</style>
