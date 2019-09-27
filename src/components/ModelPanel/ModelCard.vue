<template>
  <div class="model-card d-flex flex-column">
    <div class="title-section d-flex flex-row">
      <h4 class="title flex-fill">{{ details.name }}</h4>
      <div class="dropdown-wrapper">
        <b-dropdown class="dropdown-list" right size="sm">
          <b-dropdown-item
            class="dropdown-item-delete"
            variant="danger"
            @click="showModalDeleteModel"
          >
            Delete
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="content d-flex flex-row">
      <div class="image-section flex-column">
        <div class="thumbnail-section">
        </div>
        <div class="tag-section">
          <p>tags</p>
        </div>
      </div>
      <div class="text-section flex-fill align-items-start flex-column">
        <a class="btn-select-model" @click="selectModel">
          <div class="content">Select</div>
        </a>
        <p class="creation-date">Created: {{ creationDate }}</p>
        <br>
        <div class="metric-info flex-fill">
          <p>Log loss: {{ logLoss }}</p>
        </div>
        
        
      </div>
    </div>
    <b-modal ref="modal-delete-model" title="delete" @ok="deleteModel">
      <p>Are you sure that you want to delete this model?</p>
    </b-modal>
  </div>
</template>

<script>
import modelService from '@/api/models_service.js'
import { EventBus } from '@/event_bus.js'

export default {
  name: 'ModelCard',
  props: {
    details: Object
  },
  computed: {
    metricInfo: function () {
      return JSON.parse(this.details.details_json).metric_info
    },
    creationDate: function () {
      let date = new Date()
      let ts = this.details.creation_timestamp
      // unit: milisecond
      date.setTime(ts.seconds + '000')
      return date.toUTCString().split(' ').slice(0, 5).join(' ')
    },
    logLoss: function () {
      return this.metricInfo.log_loss
    },
    precision: function () {
      return this.metricInfo.micro_precision
    },
    recall: function () {
      return this.metricInfo.micro_recall
    },
    f1Score: function () {
      return this.metricInfo.micro_f1_score
    }
  },
  methods: {
    selectModel () {
      this.$store.dispatch('Model/setCurrentModel', this.details)
      EventBus.$emit('entryChanged', 'model')
      this.$router.push('/model-profile')
    },
    showModalDeleteModel () {
      this.$refs['modal-delete-model'].show()
    },
    deleteModel () {
      console.log(this.details.uuid)
      // TODO: ask for deleting validation result?
      modelService.deleteModel(this.details.uuid).then((result) => {
        EventBus.$emit('modelDeleted')
      }).catch((err) => {alert(err)})
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
$shadow: rgba(0, 0, 0, 0.2);
$card-height: 200px;
$card-min-width: 600px;

.model-card {
  display: block;
  max-width: 80%;
  min-width: $card-min-width;
  height: $card-height;
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding: 5px 15px;
  background-color: rgb(225, 225, 225);
  box-shadow: 0 0.1875rem 1.5rem $shadow;
}
.title-section {
  & .title {
    margin: 5px 10px 5px;
    text-align: left;
  }
  & .btn-more-options {
    user-select: none;
    & .content {
      margin-right: 10px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      font-size: 25px;
      font-size: 18px;
      &:hover {
        color: rgb(150, 150, 150);
      }
      &:active {
        color: black;
      }
    }
  }
}
.image-section {
  background-color: rgb(175, 175, 175);
  width: $card-min-width*0.4;
  height: auto;
  margin-bottom: 10px;
}
.thumbnail-section {
  background-color: rgb(150, 150, 150);
  height: $card-height*0.5;
}
.tag-section {
  color: white;
  text-align: left;
  padding: 15px;
  background-color: rgb(0, 25, 75);
  width: $card-min-width*0.4;
  height: $card-height*0.25;
}
.text-section {
  padding: 0px 10px;
}
.metric-info {
  text-align: left;
  height: $card-height*0.45;
  margin-bottom: 0px;
}
.creation-date {
  text-align: left;
  margin-bottom: 0px;
}

.dropdown-wrapper {
  align-content: center;
  align-items: center;
}

.dropdown-list {
  position: relative;
  margin: .5rem;
  height: 20px;
}

$btn-height: 30px;
.btn-select-model {
  & .content {
    background-color: rgb(185, 185, 185);
    color: rgb(25, 25, 25);
    width: 50px;
    height: $btn-height;
    line-height: $btn-height;
    box-shadow: 2px 2px 2px $shadow;
    float: right;
    text-align: center;
    text-decoration: none;
    margin-bottom: auto;
    user-select: none;
    &:active {
      background-color: rgb(200, 200, 200);
    }
  }
}
</style>
