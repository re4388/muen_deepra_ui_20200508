<template>
  <div id="model-profile" class="container-main">
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
        <div class="metric-info text-content">
          <span class="text-title">Performance: </span>
          <p class="text-value">
            log loss, precision, recall
          </p>
        </div>
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
import modelManager from '@/api/models_service.js'
import { EventBus } from '@/event_bus.js'

export default {
  name: 'ModelProfile',
  props: {
  },
  created () {
    this.fetechProjectData().then((result) => {
      this.initializeComponent()
    })
  },
  mounted () {
    // EventBus.$emit('pageChanged', {
    //   pages: ['Model profile'],
    //   keepRoot: true,
    // })
    EventBus.$emit('pageChanged',  this.$route.meta.title)
  },
  methods: {
    initializeComponent () {
      this.isLoading = false
      this.name = this.model.name
      this.description = this.model.description
      this.location = this.model.location
    },
    fetechProjectData () {
      return new Promise((resolve, reject) => {
        this.model = this.$store.getters['Model/currentModel']
        console.log('--- got model from store ')
        console.log(this.model)
        modelManager.getModel(this.model.uuid).then((result) => {
          this.model = result.model
          resolve(result)
        }).catch((err) => {alert(err)})
      })
    },
    redirectToPage () {
      this.$router.push('/testing')
    }
  },
  computed: {
    creationDatetime() {
      if (this.model === {}) return ''
      let date = new Date()
      let ts = this.model.creation_timestamp
      date.setTime(ts.seconds + '000')
      return date.toUTCString().split(' ').slice(0, 5).join(' ')
    }
  },
  watch: {
  },
  data () {
    return {
      isLoading: true,
      model: {},
      name: '',
      description: '',
      timestamp: '',
      location: '',
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
