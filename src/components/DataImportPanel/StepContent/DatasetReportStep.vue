<template>
  <div class="dataset-report-step step-content">
    <h4 class="title text-content">{{ content.title }}</h4>
    <div class="content-section flex-fill">
      <p class="text-content">
        Folder path: {{ folderPath }}
        <br />
        Annotation file: {{ labelFile }}
        <br />
        Task type: {{ taskType }}
        <br />
        File counts (in folder): {{ fileCounts }}
        <br />
        Annotation counts (in given annotaion file): {{ labelCounts }}
      </p>
      <p class="text-content label-list">
        <!-- TODO: replace this by list group -->
        Labels: {{ labelSummary }}
      </p>
      <p class="text-content label-report">
        Labeled file counts (exists in annotation file and folder): {{ normalFiles }}
        <br />
        Unlabeled file counts (exists in folder but not listed in annotation file): {{ unlabeledFiles }}
        <br />
        Missed file counts (exists in annotation file but not in folder): {{ missedFiles }}
        <br />
      </p>
      <div v-if="datasetError !== ''">
        <b-alert show dismissible variant="warning">
          <!-- The imported dataset have unlabeled file or / and missed file! -->
          {{ datasetErrorMessages[datasetError] }} <br/>
          Press "Cancel" to cancel this process or press "Next" to continue.
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
import dataImportService from "@/api/dataset_service.js";
import { mapState } from "vuex";

export default {
  name: "DatasetReportStep",
  props: {
    content: Object
  },
  mounted: function() {
    this.initializeContent();
    this.getDatasetInfo();
  },
  methods: {
    initializeContent() {
      this.$store.dispatch("DataImport/setCurrentStage", "datasetReport");
      this.$store.dispatch("DataImport/resetStageLock");
    },
    getDatasetInfo() {
      if (this.datasetInfo.folderPath !== undefined) return;
      dataImportService
        .importDataset(this.folderPath, this.taskType, {
          labelFile: this.labelFile === "" ? null : this.labelFile,
          forTest: false,
          colFilename: this.colFilename,
          colLabel: this.colLabel
        })
        .then(result => {
          this.dataRecieved = true;
          this.datasetInfo = result.content;
          this.updateContent(this.datasetInfo);
        })
        .catch(err => {
          alert(err);
          this.$router.push("/project-overview");
        });
    },
    updateContent(newContent) {
      this.folderPath = newContent.folderPath;
      this.taskType = newContent.taskType;
      this.labelFile = newContent.labelFile;
      this.fileCounts = newContent.fileCounts;
      this.labelCounts = newContent.labelCounts;

      let labelReport = newContent.details.labelReport;
      this.labels = labelReport.labels
      this.normalFiles = labelReport.normal;
      this.unlabeledFiles = labelReport.unlabeled;
      this.missedFiles = labelReport.missed;
    },
    checkContent() {
      if (this.dataRecieved) {
        if (this.unlabeledFiles !== 0 || this.missedFiles !== 0) {
          if (!confirm('Are you sure you want to continue?')) return
        }
        return new Promise((resolve, reject) => {
          this.$store.dispatch("DataImport/unlockStage");
          this.$store.dispatch(
            "DataImport/setCompletedStageIndex",
            this.content.id
          );
          resolve(true);
        });
      }
    }
  },
  computed: {
    ...mapState("DataImport", {
      colFilename: "selectedColFilename",
      colLabel: "selectedColLabel"
    }),
    datasetInfo: {
      get() {
        return this.$store.state.DataImport.datasetInfo;
      },
      set(value) {
        this.$store.dispatch("DataImport/setDatasetInfo", value);
      }
    },
    folderPath: {
      get() {
        return this.$store.state.DataImport.selectedFolder;
      },
      set(value) {
        this.$store.dispatch("DataImport/setSelectedFolder", value);
      }
    },
    taskType: {
      get() {
        return this.$store.state.DataImport.selectedTaskType;
      },
      set(value) {
        this.$store.dispatch("DataImport/setSelectedTaskType", value);
      }
    },
    labelFile: {
      get() {
        return this.$store.state.DataImport.selectedLabelFile;
      },
      set(value) {
        this.$store.dispatch("DataImport/setSelectedLabelFile", value);
      }
    },
    datasetError () {
      let datasetInfo = this.$store.getters['DataImport/datasetInfo']
      if (datasetInfo.details.labelReport === undefined) return

      if (this.unlabeledFiles !== 0 || this.missedFiles !== 0) {
        return 'annotationWarning';
      } else if (datasetInfo.details.labelReport.labels.length <= 1) {
        return 'singleAnnotationWarning'
      } else {
        return '';
      }
    },
    labelSummary () {
      // Default
      if (this.datasetInfo.details.labelReport === undefined) return ''

      if (this.taskType === 'regression') {
        let labels = this.datasetInfo.details.labelReport.labels.map(parseFloat)
        return `min: ${Math.min(...labels)}; max: ${Math.max(...labels)}`
      } else {
        let labels = this.datasetInfo.details.labelReport.labels
        return labels.join(', ')
      }
    }
  },
  data() {
    return {
      labelCounts: 0,
      fileCounts: 0,
      normalFiles: 0,
      unlabeledFiles: 0,
      missedFiles: 0,
      labels: [],
      datasetErrorMessages: {
        annotationWarning: 'There are unannotated files or / and files not existing in folder.',
        singleAnnotationWarning: 'There is only one kind of annotation in given dataset.'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
$scroll-bar-width: 5px;
.step-content {
  color: black;
  padding: 20px;
}
.text-content {
  text-align: left;
  margin: 0px;
}
.label-list {
  display: inline-block;
  overflow-y: scroll;
  max-height: 125px;
  margin: 0px;
  width: 100%;
  // TODO: extract all duplicated style of scroll bar into a single file?
  &::-webkit-scrollbar {
    width: $scroll-bar-width;
  }
  &:hover {
    &::-webkit-scrollbar-track {
      background-color: #A0A0A0;
      border-radius: $scroll-bar-width;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #404040;
      border-radius: $scroll-bar-width;
    }
  }
}
</style>
