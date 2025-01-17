<template>
  <div id="project-profile" class="container-main">
    <div class="page-content d-flex flex-column">
      <div class="project-info flex-fill">
        <div class="name text-content">
          <span class="text-title">Name: </span>
          <span class="text-value">{{ name }}</span>
        </div>
        <div class="description text-content">
          <span class="text-title">Description: </span>
          <span class="text-value">{{ description }}</span>
        </div>
        <div class="creation-datetime text-content">
          <span class="text-title">Created at: </span>
          <span class="text-value">{{ creationDatetime }}</span>
        </div>
        <div class="location text-content">
          <span class="text-title">Location: </span>
          <span class="text-value">{{ location }}</span>
        </div>
        <div class="label-list text-content">
          <span class="text-title">Labels: </span>
          <span class="text-value">{{ labelList }}</span>
        </div>
        <div class="label-report text-content">
          <span class="text-title">Label report: </span>
          <div class="label-total">
            - labeled: {{ labeledFiles }}
          </div>
          <div class="label-unlabeled">
            - unlabeled: {{ unlabeledFiles }}
          </div>
          <div class="label-missed">
            - missed: {{ missedFiles }}
          </div>
        </div>
        <div class="label-file text-content">
          <span class="text-title">Label file:</span>
          <b-form-select
            id="input-label-file"
            v-model="selectedLabelFileUuid"
            :options="labelFileList"
            @change="selectedLabelFileChanged"
          >
          </b-form-select>
        </div>
        <!-- <div calss="label-list-view">
          <b-list-group id="label-list-group">
            <template v-for="(item, index) in labelList">
              <b-list-group-item :key=index>{{ item }}</b-list-group-item>
            </template>
          </b-list-group>
        </div> -->
      </div>
      <div class="control-section">
      <a class="btn-flow-control" id="btn-flow-control" @click="redirectToPage">
          <div class="content">
            <p>Continue</p>
          </div>
        </a>
    </div>
    </div>
  </div>
</template>

<script>
import projectService from '@/api/projects_service.js'
import datasetService from '@/api/dataset_service.js'
import labelService from '@/api/label_service.js'
import { EventBus } from '@/event_bus.js'

export default {
  name: 'ProjectProfile',
  props: {
  },
  created () {
    this.fetechProjectData().then((result) => {
      this.initializeComponent()
      labelService.getLabelList(this.project.dataset_uuid).then((result) => {
        let timestampConverter = (ts) => {
          let date = new Date()
          date.setTime(ts.seconds + '000')
          return date.toUTCString().split(' ').slice(0, 5).join(' ')
        }

        this.labelFileList = result.map((item, index) => {
          let date = new Date()
          let ts = this.project.creation_timestamp
          date.setTime(ts.seconds + '000')  // unit: ms
          return {
            value: item.uuid,
            text: `version_${index}, created at: ${timestampConverter(item.creation_timestamp)}`
          }
        }).reverse()

        // Set default value of `b-form-select`
        let currLabelFileUuid = JSON.parse(this.dataset['details_json'])['label_file_uuid']
        let idx = this.labelFileList.map(item => item.value).indexOf(currLabelFileUuid)
        this.selectedLabelFileUuid = this.labelFileList[idx].value
      }).catch((err) => {alert(err)})
    })
  },
  methods: {
    initializeComponent () {
      console.log('--- initializing project profile ---')
      console.log(this.project)
      console.log(this.dataset)
      this.isLoading = false
      this.name = this.project.name
      this.description = this.project.description
      this.location = this.project.location

      EventBus.$emit('pageChanged', this.$route.meta.title)
      EventBus.$emit('showProjectName', this.name)
    },
    fetechProjectData () {
      return new Promise((resolve, reject) => {
        this.project = this.$store.getters['Project/currentProject']
        projectService.getProject(this.project.uuid).then((result) => {
          this.project = result.project
          this.dataset = result.dataset
          // XXX: save task type into store for further usage, but this might need
          //   to be refactored
          this.$store.dispatch('Project/setTaskType', this.dataset['task_type'])
          resolve(result)
        }).catch((err) => {alert(err)})
      })
    },
    redirectToPage () {
      this.$router.push('/training')
    },
    selectedLabelFileChanged () {
      datasetService.changeLabel(
        this.project['dataset_uuid'],
        this.selectedLabelFileUuid
      ).then((result) => {
        // refresh cached metadata
        this.fetechProjectData()
      }).catch((err) => {alert(err)})
    }
  },
  computed: {
    creationDatetime() {
      if (this.project === {}) return ''
      let date = new Date()
      let ts = this.project.creation_timestamp
      date.setTime(ts.seconds + '000')  // unit: ms
      return date.toUTCString().split(' ').slice(0, 5).join(' ')
    },
    datasetDetails() {
      if (this.isLoading) return null
      let parsed = JSON.parse(this.dataset.details_json).label_report
      return parsed
    },
    labelList() {
      if (this.datasetDetails === null) return ''
      let parsedList = this.datasetDetails.labels
      return parsedList.join(', ')
    },
    labeledFiles() {
      if (this.datasetDetails === null) return ''
      return this.datasetDetails.normal
    },
    unlabeledFiles() {
      if (this.datasetDetails === null) return ''
      return this.datasetDetails.unlabeled
    },
    missedFiles() {
      if (this.datasetDetails === null) return ''
      return this.datasetDetails.missed
    }
  },
  watch: {
  },
  data () {
    return {
      isLoading: true,
      project: {},
      dataset: {},
      name: '',
      description: '',
      timestamp: '',
      location: '',
      labelFileList: [],
      selectedLabelFileUuid: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$scroll-bar-width: 5px;
.page-content {
  height: 100%;
  overflow: hidden;
  background-color: gray;
}
.text-content {
  text-align: left;
  align-items: center;
  color: black;
}
.text-title {
  font-size: 20px;
  font: bold;
}
.text-value {
  display: inline-block;
  text-align: center;
}
.project-info {
  height: 80%;
  margin: 30px;
}

.label-list {
  display: inline-block;
  overflow-y: scroll;
  max-height: 200px;
  width: 100%;
  // TODO: extract all duplicated style of scroll bar into a single file?
  &::-webkit-scrollbar {
    width: $scroll-bar-width;
  }
  &:hover {
    &::-webkit-scrollbar-track {
      background-color: #808080;
      border-radius: $scroll-bar-width;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0f0f0f;
      border-radius: $scroll-bar-width;
    }
  }
}
.label-list-view {
  height: 400px;
  overflow: scroll;
  margin-bottom: 200px;
}
.label-list-group {
  max-height: 400px;
  overflow: scroll;
  margin-bottom: 200px;
}

.input-label-file {
  width: 600px;
}

.control-section {
  height: 20%;
}

$btn-height: 50px;
.btn-flow-control {
  text-decoration: none;
  margin-right: 50px;
  float: right;
  & .content {
    color: white;
    width: 75px;
    border-radius: 5px;
    height: $btn-height;
    background-color: rgba(0, 150, 150, 0.75);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
    line-height: $btn-height;
    user-select: none;
    &:active {
      background-color: rgba(0, 150, 150, 1);
      transform: translate3D(2px, 2px, 0px);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
