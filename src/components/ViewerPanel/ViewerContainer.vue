<template>
  <div id="viewer-container" class="container">
  </div>
</template>

<script>
import FirstImage from '@/components/ViewerPanel/FirstImge.vue'
import { EventBus } from '@/event_bus.js'
import ToolBar from '@/components/ViewerPanel/ToolBar.vue'

export default {
  name:"ViewerContainer",
}
</script>

<style lang="scss" scoped>
.container {
  // min-width: 100%;
  // min-height: 100%;
}
</style>