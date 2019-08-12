<template>
  <div class="resources-check-step step-content">
    <p class="title text-content">{{ content.title }}</p>
    <p class="resource-disk-space text-content">Available disk space: {{ freeDiskSpace }} MB</p>
    <p class="resource-memory text-content">Available memory: {{ freeMemory }} MB</p>
    <p class="resource-gpu-memory text-content">Available GPU memory: {{ freeGPUMemory }} MB</p>
  </div>
</template>

<script>
import resourceMonitor from '@/api/resource_monitor.js'
import { mapActions } from 'vuex'

export default {
  name: 'ResourcesCheckStep',
  props: {
    content: Object
  },
  created: function () {
    this.getDiskUsage()
    this.getMemoryUsage()
    this.getGPUMemoryUsage()
  },
  methods: {
    ...mapActions('Training', {
      unlockStage: 'unlockStage',
      setCompletedStageIndex: 'setCompletedStageIndex'
    }),
    getDiskUsage () {
      resourceMonitor.getDiskUsage().then((result) => {
        this.freeDiskSpace = result['free'].toFixed(2)
      })
    },
    getMemoryUsage () {
      resourceMonitor.getMemoryUsage().then((result) => {
        this.freeMemory = result['free'].toFixed(2)
      })
    },
    getGPUMemoryUsage () {
      resourceMonitor.getGPUMemoryUsage().then((result) => {
        this.freeGPUMemory = result['free'].toFixed(2)
      })
    },
    checkContent () {
      return new Promise((resolve, reject) => {
        this.unlockStage()
        this.setCompletedStageIndex(this.content.id)
        resolve(true)
      })
    }
  },
  data () {
    return {
      freeDiskSpace: '',
      freeMemory: '',
      freeGPUMemory: '',
      intervalid: null
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content {
  color: black;
  padding: 20px;
}
.text-content {
  text-align: left;
}
.description {
  text-align: left;
}
</style>
