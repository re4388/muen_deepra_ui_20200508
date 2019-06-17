<template>
  <div class="resources-check-step">
    <p class="title text-content">{{ content.title }}</p>
    <p class="resource-disk-space text-content">Available disk space: {{ freeDiskSpace }} MB</p>
    <p class="resource-memory text-content">Available memory: {{ freeMemory }} MB</p>
    <p class="resource-gpu-memory text-content">Available GPU memory: {{ freeGPUMemory }} MB</p>
  </div>
</template>

<script>
import resourceMonitor from '../../../resource_monitor.js'

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
.resources-check-step {
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
