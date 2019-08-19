<template>
  <div class="container">
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
          <router-link to="/project-overview">Please train a project or choose Model History below</router-link>
        </a>
      </b-alert>
    </div>

    <!-- dropdown to select models record -->
    <div class="text-left">
      <b-dropdown id="dropdown-1" text="Model History" class="m-md-2">
        <b-dropdown-item
          v-for="modelData in modelDatas"
          :key="modelData.name"
          @click="modelDataChage(modelData)"
        >{{ modelData }}</b-dropdown-item>
      </b-dropdown>
    </div>
    <p class="text-left">{{ modelId}}</p>

    <!-- tabs 麵包屑 -->
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
          @click.prevent="changeView(tab)"
        ></b-tab>
      </b-tabs>
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
      <div class="row" slot="title">
        <h5 class="col-12 text-center text-light m-0 mt-3">{{ tab.name | capitalize }}</h5>
      </div>

      <!-- MetricsDisplay -->
      <div class="row mt-3" slot="MetricsDisplay">
        <MetricsDisplay :metrics-data=" tab.metrics" class="col-12" />
      </div>

      <!-- GraphDisplay -->
      <GraphDisplay
        class="outterGrpah"
        slot="GraphDisplay"
        :graph-data="tab.grpah"
        :new-threshold="newThreshold"
      />

      <!-- ThresholdAdjustment -->
      <ThresholdAdjustment
        slot="ThresholdAdjustment"
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
    <p class="text-center mt-1">{{ showExportMsg }}</p>
  </div>
</template>

<script>
/***** local Fake data to locally test *****/
// minist data
import localJson from "../deepra_mnistV2.json";
// binary data
import localJson2 from "../binary_data.json";

// import data
import { generateModel } from "@/components/EvaluationPanel/TabsInfo/dataProcess.js";

// import gRPC
import validationService from "@/api/validation_service.js";
import projectManager from "@/api/projects_service.js";
import ModelManager from "@/api/models_service.js";

// import utilties
import modPath from "path";
import modFs, { constants } from "fs";
import fileFetcher from "@/utils/file_fetcher.js";
import vueUtils from "@/api/vue_utils.js";

// import components
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
      views: [], //  => [ 'class 0','class 1','class 2'...]
      currentView: "",
      newThreshold: 0,
      modelId: "not ready",
      modelDatas: [],
      showExportMsg: ""
    };
  },

  created() {},

  mounted() {
    this.dataInit();
  },

  updated() {},

  computed: {
    selectedMatrixData() {
      // views data is async, so need to skip operation when no views
      if (this.views.length === 0) {
        return;
      }
      // get the current view index
      let currentTab = this.views.indexOf(this.currentView);
      return this.tabs[currentTab]["confusionMatrixInfo"];
    },
    activeClass() {
      if (this.currentView === "all class") {
        return "currentUsed";
      }
    },
    ...mapGetters("Validation", {
      exportLocation: "outputLocation"
    })
  },

  methods: {
    modelDataChage(id) {
      this.modelId = id;
      this.modelChange();
    },

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
    },

    loadFromHistory() {
      let projectInfo = this.$store.getters["Project/currentProject"];
      console.log("---");
      console.log(this.modelId);
      console.log("---");
      let filePath = modPath.join(
        projectInfo.location,
        "deepra_output",
        this.modelId,
        "validation"
      );

      let fn = modPath.join(filePath, "validation_output.json");
      fileFetcher.readJson(fn, true).then(result => {
        console.log("--- begin to read local json ---");
        let tabData = generateModel(result.labels, result.metrics);
        this.tabs = tabData;

        this.$emit("model-data", {
          result: tabData
        });
        this.getView();
        this.currentView = this.views[0];
      });
    },

    modelChange() {
      this.loadFromHistory();
    },

    getModelHistory() {
      let projectInfo = this.$store.getters["Project/currentProject"];

      return new Promise((resolve, reject) => {
        ModelManager.GetModelListByProject(projectInfo.uuid).then(result => {
          let re = /(train_[0-9]+_[0-9]+)/;
          let modelHistory = [];

          for (let i = 0; i < result.model_list.length; i++) {
            let model_path = result.model_list[i];

            if (modFs.existsSync(model_path + "/../" + "validation")) {
              // console.log("exist");
              modelHistory.push(model_path.match(re)[0]);
              this.modelId = modelHistory[modelHistory.length - 1];
              this.modelDatas = modelHistory;
            } else {
              console.log(
                model_path + "/../" + "validation " + ": folder no exist"
              );
            }
          }
          // console.log(modelHistory);
          resolve(true);
        });
      });
    },

    dataInit() {
      console.log("--- Tabs: get data from validation result ---");
      let data = vueUtils.clone(
        this.$store.getters["Validation/validationOutput"]
      );
      this.getModelHistory().then(result => {
        if (data.content === null) {
          console.log("--- Tabs: get data from history record ---");
          this.getModelHistory();
          this.loadFromHistory();
        } else {
          let tabData = generateModel(data.labels, data.metrics);
          this.tabs = tabData;

          this.$emit("model-data", {
            result: tabData
          });
          this.getView();
          this.currentView = this.views[0];
        }
      });
    },

    ...mapActions("Validation", {
      setExportLocation: "setOutputLocation"
    }),

    onExport(evnt) {
      let projectInfo = this.$store.getters["Project/currentProject"];
      if (evnt.target.files.length === 0) return;
      let outputLocation = evnt.target.files[0].path;
      let traied_model_loc = this.modelId;
      validationService
        .exportFiles(projectInfo, outputLocation, traied_model_loc)
        .then(result => {
          console.log(result);

          this.showExportMsg =
            "Files has been successfully move to folder :  " + outputLocation;
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
