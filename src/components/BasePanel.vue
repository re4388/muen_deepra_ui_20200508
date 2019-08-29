<template>
  <div id="base-panel" class="container-main">
    <div id="page-content">
      <p>Base panel</p>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event_bus.js'

export default {
  name: 'BasePanel',
  components: {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.resetStates()
    })
  },
  methods: {
    resetStates () {
      this.$store.dispatch('setCurrentEntry', 'main')
      EventBus.$emit('entryChanged', 'main')

      // Reset state
      this.$store.dispatch('DataImport/resetAllState')
      this.$store.dispatch('Project/resetAllState')
      this.$store.dispatch('Validation/resetAllState')
      this.$store.dispatch('Training/resetAllState')
      this.$store.dispatch('Testing/resetAllState')
      this.$store.dispatch('Label/resetAllState')

      EventBus.$emit('pageChanged', '')
    }
  }
}
</script>

<style lang="scss" scoped>
#base-panel {
  min-height: 100%;
  background-color: gray;
}
#page-content {
  margin-top: 150px;
  color: black;
}
</style>
