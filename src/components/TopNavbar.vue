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
    EventBus.$on('pageChanged', (info) => {
      if (typeof(info) === 'string') {
        this.pageIndicatorInfo = {
          pages: info === '' ? [] : [info],
          keepRoot: false
        }
      } else {
        this.pageIndicatorInfo = info
      }
    })
  },
  methods: {
    onClick() {
      this.$store.dispatch('setCurrentEntry', 'main')
      EventBus.$emit('entryChanged', 'main')
      // Reset state
      this.$store.dispatch('DataImport/resetAllState')
      this.$store.dispatch('Project/resetAllState')
      this.$store.dispatch('Validation/resetAllState')
      EventBus.$emit('pageChanged', '')
      this.$router.push('/')
    }
  },
  computed: {
    pageIndicatorDisplay: function () {
      if (this.pageIndicatorInfo.pages.length === 0) {
        return ''
      } else {
        let indicator = ['']
        indicator.push(...this.pageIndicatorInfo.pages)
        // this.pageIndicator = this.pageIndicatorInfo.keepRoot ?
        //   this.pageIndicator + indicator.join(' > ') : indicator.join(' > ')
        return indicator.join(' > ')
      }
    },
  },
  data () {
    return {
      pageIndicator: '',
      pageIndicatorInfo: {
        pages: [],
        keepRoot: true
      }
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
