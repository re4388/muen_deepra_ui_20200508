<template>
  <div id="model-overview-panel" class="container-main">
    <div id="page-content">
      <div class="model-list">
        <template v-for="(item, index) in models">
          <model-card
            :key="index"
            :details="item"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ModelCard from './ModelCard.vue'
import modelManager from '@/api/models_service.js'
import { EventBus } from '@/event_bus.js'

export default {
  name: 'ModelOverviewPanel',
  components: {
    ModelCard
  },
  created () {
    EventBus.$on('modelDeleted', () => {
      this.fetchModelData()
    })
  },
  mounted () {
    this.fetchModelData()
    EventBus.$emit('pageChanged', this.$route.meta.title)
  },
  beforeDestroy () {
    EventBus.$off('modelDeleted')
  },
  watch: {
    '$route': 'fetchModelData'
  },
  methods: {
    fetchModelData () {
      modelManager.getModelList().then((result) => {
        if (result.model_list.length === 0) {
          this.models = []
        }
        // TODO: sort by created timestamp
        this.models = result.model_list
        console.log(this.models)
      }).catch((err) => {alert(err)})
    }
  },
  data () {
    return {
      models: []
    }
  }
}
</script>

<style lang="scss" scoped>
#model-overview-panel {
  min-height: 100%;
  background-color: gray;
  overflow-y: scroll;
}
.page-content {
  margin-top: 150px;
  color: black;
}
</style>
