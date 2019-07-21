<template>
  <div id="project-profile" class="container-main">
    <div class="page-content d-flex flex-column">
      <div class="project-info flex-fill">
        <div class="name text-content">
          <span class="text-title">Name: </span>
          <span class="text-value">{{ project.name }}</span>
        </div>
        <div class="description text-content">
          <span class="text-title">Description: </span>
          <span class="text-value">{{ project.description }}</span>
        </div>
        <div class="creation-datetime text-content">
          <span class="text-title">Created at: </span>
          <span class="text-value">{{ creationDatetime }}</span>
        </div>
        <div class="location text-content">
          <span class="text-title">Location: </span>
          <span class="text-value">{{ project.location }}</span>
        </div>
        <div class="label-list text-content">
          <span class="text-title">Labels: </span>
          <span class="text-value">{{ labelList }}</span>
        </div>
        <div class="label-report text-content">
          <span class="text-title">Label report: </span>
          <div class="label-total">
            - labeled: {{ labeledFileCounts }}
          </div>
          <div class="label-unlabeled">
            - unlabeled: {{ unlabeledFileCounts }}
          </div>
          <div class="label-missed">
            - missed: {{ missedFileCounts }}
          </div>
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
      <a class="btn-flow-control" id="btn-flow-control">
          <div class="content">
            <p>Continue</p>
          </div>
        </a>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectProfile',
  props: {
  },
  created () {
    this.initializeComponent()
  },
  methods: {
    initializeComponent () {
      console.log('--- initializing project profile ---')
      this.project = this.$store.getters.currentProject
      console.log(this.project)
      console.log(JSON.parse(this.project.details_json))
    }
  },
  computed: {
    creationDatetime() {
      if (this.project === null) return ''
      let date = new Date()
      let ts = this.project.creation_timestamp
      date.setTime(ts.seconds + String(ts.nanos/1000000))
      return date.toUTCString().split(' ').slice(0, 5).join(' ')
    },
    details() {
      return JSON.parse(this.project.details_json)
    },
    labelList() {
      let parsedList = this.details.labels
      console.log(parsedList)
      return parsedList.join(', ')
    },
    labeledFileCounts() {
      return this.details.labeled_file_counts
    },
    unlabeledFileCounts() {
      return this.details.unlabeled_file_counts
    },
    missedFileCounts() {
      return this.details.missed_file_counts
    }
  },
  data () {
    return {
      project: null
    }
  }
}
</script>

<style lang="scss" scoped>
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
