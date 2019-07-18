<template>
  <div id="top-navbar" class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap">
    <div class="page-indicator-container">
      <a id="brand" class="navbar-brand" href="#" @click.prevent="onClick">{{ brandText }}</a>
      <a id="page-indicator"> {{ pageIndicatorDisplay }} </a>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event_bus.js'

export default {
  name: 'TopNavbar',
  props: {
    brandText: String
  },
  created () {
    EventBus.$on('pageChanged', (page) => {
      this.pageIndicator = page
    })
  },
  methods: {
    onClick() {
      this.$store.dispatch('setCurrentEntry', 'main')
      EventBus.$emit('entryChanged', 'main')
      this.$router.push('/')
    }
  },
  computed: {
    pageIndicatorDisplay: function () {
      return this.pageIndicator == '' ? '' : ('> ' + this.pageIndicator)
    }
  },
  data () {
    return {
      pageIndicator: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$navbar-height: 56px;

#top-navbar {
  min-height: $navbar-height;
}
#brand {
  position: relative;
  width: 136px;
  left: 0px;
  margin: 0px;
}
#page-indicator {
  color: white;
  font: bold;
  // font-size: 16px;
}
</style>
