<template>
  <div class="dataset-report-step step-content">
    <h4 class="title text-content">{{ content.title }}</h4>
    <div class="content-section flex-fill">
      <p class="text-content">
        Folder path: {{ folderPath }}
        <br />
        Label file: {{ labelFile }}
        <br />
        Task type: {{ taskType }}
        <br />
        File counts (in folder): {{ fileCounts }}
        <br />
      </p>
      <p class="text-content">
        <!-- TODO: replace this by list group -->
        Labels: {{ labels.join(', ') }}
        <br />
        Total labels: {{ totalLabels }}
        <br />
        Labeled file counts: {{ normalFiles }}
        <br />
        Unlabeled file counts: {{ unlabeledFiles }}
        <br />
        Missed file counts: {{ missedFiles }}
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
      this.fileCounts = newContent.fileCounts;
      this.labelFile = newContent.labelFile;
      this.totalLabels = newContent.totalLabels;

      let labelReport = newContent.details.labelReport;
      this.labels = labelReport.labels
      this.normalFiles = labelReport.normal;
      this.unlabeledFiles = labelReport.unlabeled;
      this.missedFiles = labelReport.missed;
    },
    checkContent() {
      if (this.dataRecieved) {
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
    }
  },
  data() {
    return {
      totalLabels: "",
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
.step-content {
  color: black;
  padding: 20px;
}
.text-content {
  text-align: left;
}
</style>
