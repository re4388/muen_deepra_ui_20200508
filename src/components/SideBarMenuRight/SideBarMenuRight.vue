<template>
  <div id="sidebar-right" class="sidebarRight d-flex flex-column">
    <div>
      <!-- model selection dropdown -->
    <div class="dropdown">
      <div>
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          boundary="window"
        >Labels
        </button>
        <span class="caret"></span>
        <div class="dropdown-menu scrollable-menu" >
          <a 
          class="dropdownItem dropdown-item"
            v-for="modelName in modelNames"
            :key="modelName + Date.now()"
            @click="modelNameChage(modelName)"
            href="#">
            {{ modelName | modelIdFormater }}
          </a>
        </div>
      </div>

      <div class="mt-2 ml-2">
        <p
          class="modelId"
          :class="{ 'text-left': true, 'text-warning':loadModelError }"
        >{{ modelId | modelIdFormater}}</p>
      </div>
    </div>




      
      <!-- not sure what below code is...?  by Ben -->
      <!-- <div class="rightsideBlock addLabel p-2 flex-fill bd-highlight">
        <div class="rightsideBlockTitle"></div>
      </div>-->
      <components
        id="label-panel"
        :labels="labels"
        :isSingleSelection="isSingleSelection"
        :isDisabled="false"
        :selectedLabel="selectedLabel"
        :srcIndex="selectedImageIndex"
        :predictedLabel="predictedLabel"
        :is="labelPanelType[taskType]">
      </components>
    </div>
    <div class="rightsideBlock imageListBlock data__set p-2 flex-fill bd-highlight">
      <div class="rightsideBlockTitle"><h3>DataSet</h3></div>
      <div id="show__list" class="show__list">
        <img class="datasetImg" src="../../assets/collections.png" @click="showImgList" />
        <div>
          <ImageBox v-show="isShowingImgList" class="imageBox" :images="images" />
        </div>
      </div>
    </div>
    <div class="rightsideBlock edit__logp-2 flex-fill bd-highlight">
      <div class="noteTitle rightsideBlockTitle">
        <h5>
          Edit Log
          <br />&amp;
          <br />Note
        </h5>
        <br />
      </div>
      <div class="note">
        <p>20190523</p>
      </div>
      <div class="note">
        <p>Model 1 Predict as Label1</p>
      </div>
    </div>
    <div class="rightsideBlock edit__logp-2 flex-fill bd-highlight">
      <b-button id="btn-save-changes" variant="light" @click="onSaveChanges">Save</b-button>
    </div>
  </div>
</template>

<script>
import ModelManager from "@/api/models_service.js";
import modFs, { constants, exists } from "fs";
import modPath from "path";
import fileFetcher from "@/utils/file_fetcher.js";
import { converterDict } from "@/utils/label_converter.js";

import ImageBox from "@/components/SideBarMenuRight/ImageBox.vue";
import LabelPanel from "./LabelPanel.vue";
import RegressionLabelPanel from './RegressionLabelPanel.vue';
import imageData from "./image_data.json";
import { EventBus } from "@/event_bus.js";
import fileFetecher from "@/utils/file_fetcher.js";
import { mapState } from "vuex";

const separator = {
  template: `<hr style="border-color: rgba(255, 255, 255); margin: 10px;"/>`
};

export default {
  name: "SidebarRight",
  components: {
    ImageBox,
    LabelPanel,
    RegressionLabelPanel
  },
  watch: {
    isShowingImgList() {},
    selectedImage(newVal, oldVal) {
      // console.log('Information of selected image: ')
      // console.log(newVal)
    }
  },
  created() {
    this.dataInit();
    EventBus.$on("viewerDatasetChanged", () => {
      // console.log('--- processing with event viewerDatasetChanged')
      EventBus.$emit("notifyImageTotalNumber", this.images.length);
      let dataset = this.$store.getters["Viewer/currentDataset"];
      this.labels = dataset.details.labelReport.labels;
      this.taskType = dataset.taskType;
      this.selectedImage = this.images[0];
      this.firstImageFilename = this.images[0].filename;
      let temp = this.images.label;
    });
    EventBus.$on("onNavigationImageClicked", obj => {
      this.selectedImage = obj.item;
      this.selectedImageIndex = obj.item.index;
      EventBus.$emit("showSelectedFilename", this.selectedImage.filename);
    });
  },
  beforeDestroy() {
    EventBus.$off("viewerDatasetChanged");
    EventBus.$off("onNavigationImageClicked");
  },
  data() {
    return {
      isShowingImgList: false,
      pathCollector: null,
      labels: [],
      taskType: "",
      selectedImage: null,
      selectedImageIndex: 0,
      modelNames: [],
      modelId: "",
      loadModelError: false,
      labelPanelType: {
        binary: 'LabelPanel',
        multiclass: 'LabelPanel',
        multilabel: 'LabelPanel',
        regression: 'RegressionLabelPanel'
      }
    };
  },
  filters: {
    modelIdFormater: function(value) {
      return value.slice(6);
    }
  },
  computed: {
    currentProjectData() {
      return this.$store.getters["Project/currentProject"];
    },
    isSingleSelection() {
      return this.taskType != "multilabel" ? true : false;
    },
    selectedLabel() {
      if (this.selectedImage === null) return "";
      // XXX: We have to check whether the label of selected image has been modified.
      //   If true, we have to return the modified label rather than the original label.
      //   Otherwise, we cannot show the modified result to `LabelPanel`.
      let idx = this.modifiedSamples
        .map(x => x.filename)
        .indexOf(this.selectedImage.filename);
      let labelToBeDisplay =
        idx === -1 ? this.selectedImage.label : this.modifiedSamples[idx].label;
      return labelToBeDisplay;
    },
    predictedLabel() {
      if (this.selectedImage === null) return String(this.predictedLabels[0]);
      // console.log("--- current selected image");
      // console.log(this.selectedImage);
      return String(this.predictedLabels[this.selectedImage.index]);
    },
    images() {
      // XXX: Automatically reorder the file list when order list is available.
      //   However, we might need to make user able to switch this mode off.
      let orderFileList = this.$store.getters["Validation/orderedFileList"];
      let parsedFileList = this.$store.getters["Viewer/parsedFileList"];
      if (orderFileList === null)
        return this.$store.getters["Viewer/parsedFileList"];
      return orderFileList.indices.map(i => parsedFileList[i]);
    },
    ...mapState({
      predictedLabels: state => state.Testing.predictedLabels,
      modifiedSamples: state => state.Label.modifiedSamples
    })
  },
  methods: {
    dataInit() {
      if (this.$store.getters['currentEntry'] !== 'project') return
      this.getModelList()
        .then(result => {
          // if (data.content === null) {
          console.log("--- Tabs: get data from history record ---");
          this.loadModal();
          // }
        })
        .catch(err => {
          console.log("getModelList err:", err);
        });
    },
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
    modelNameChage(id) {
      this.modelId = id;
      this.modelChange();
    },
    modelChange() {
      this.loadModal();
    },
    loadModal() {
      // console.log("currentProjectData:", this.currentProjectData);
      // console.log("current model id:", this.modelId);
      let filePath = modPath.join(
        this.currentProjectData.location,
        "deepra_output",
        this.modelId,
        "validation_all"
      );

      let fn = modPath.join(filePath, "validation_output.json");
      if (!modFs.existsSync(fn)) return

      fileFetcher
        .readJson(fn, false)
        .then(result => {
          // this.loadModelError = false;
          this.loadModelError = false;
          console.log("--- begin to read local json ---");
          console.log(result);
          let taskType = this.$store.getters["Project/taskType"];
          let labelConverter = new converterDict[taskType](
            result.prediction,
            result.labels.map(String)
          );
          let predictedLabels = labelConverter.convertAll();
          this.$store.dispatch("Testing/setPredictedLabels", predictedLabels);
        })
        .catch(err => {
          this.loadModelError = true;
          console.log("readJson err:", err);
          // empty space for offset the filters effect
          this.modelId = "      model doesn't exist";
        });
    },
    showImgList(e) {
      this.isShowingImgList = !this.isShowingImgList;
      let el = document.querySelector(".title");
      if (el === null) return;
      el.classList.toggle("show");
    },
    onSaveChanges() {
      let num = this.$store.getters["Label/modifiedSamples"].length;
      let selectedModal =
        num === 0 ? "modal-no-change-notification" : "modal-confirm-changes";
      this.$parent.$refs[selectedModal].show();
    }
  }
};
</script>

<style lang="scss" scoped>
.modelId {
  font-size: 13px;
  margin-top: 3px;
  // text-align: left;
}

.dropdownManu{
  height: auto;
  max-height: 150px;
  overflow-x: hidden;
}
.dropdown-item {
  font-size: 13px;
  padding: 2%;
  margin: 2%;
  text-align: right;

  // max-height: 200px;
  // overflow-x: hidden;
  // position: absolute
}


.sidebarRight {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  padding: 10px;
  background: #2d2d31;
  text-align: center;
  color: white;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 998;
}
.rightsideBlock {
  border-bottom: 1px solid white;
  padding: 20px 0;
}
.rightsideBlockTitle {
  margin: 10px 0 20px 0;
}
.datasetImg {
  padding: 30px;
}
.data__set > div {
  position: relative;
}
.datasetImg:hover {
  background: rgb(199, 199, 199);
}
.note > p {
  margin: 0;
}
#label-panel {
  max-height: 150px;
  overflow: auto;
}

.scrollable-menu {
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
}

</style>



