<template>
  <div id="app">
    <top-navbar brandText="DeepRA"/>
    <div id="display-panel" class="d-flex flex-row">
      <component
        class="sidebar"
        :is="sidebarType[currentEntry]"
      >
      </component>
      <router-view class="flex-fill"></router-view>
    </div>
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue'
import Sidebar from '@/components/SidebarMenu/SidebarMenu.vue'
import ProjectSidebar from '@/components/SidebarMenu/ProjectSidebar.vue'
import BasePanel from '@/components/BasePanel.vue'
import { EventBus } from '@/event_bus.js'

export default {
  name: 'App',
  components: {
    Sidebar,
    ProjectSidebar,
    TopNavbar,
    BasePanel
  },
  watch: {
    currentEntry () {
      console.log('currentEntry:')
      console.log(this.$store.getters.currentEntry)
      return this.$store.getters.currentEntry
    }
  },
  created () {
    this.initializeComponent()
    EventBus.$on('entryChanged', (entry) => {
      this.currentEntry = entry
    })
  },
  mounted () {
    console.log(this.$store.getters.currentEntry)
  },
  methods: {
    initializeComponent () {
      this.currentEntry = this.$store.getters.currentEntry
      console.log('----- initializing component -----')
      console.log(this.currentEntry)
    }
  },
  data () {
    return {
      currentEntry: 'main',
      sidebarType: {
        main: 'Sidebar',
        project: 'ProjectSidebar'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#display-panel {
  position: absolute;
  margin-top: 56px;
  margin-bottom: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
#top-navbar {
  position: absolute;
}
.sidebar {
  position: relative;
  height: 100%;
  margin-left: 0px;
  margin-bottom: 0px;
}
</style>

<style lang="scss">
// Syntax for prevent dragging HTML element, this is disabled currently.
// *, *::after, *::before {
//   -webkit-user-select: none;
// 	-webkit-user-drag: none;
// 	-webkit-app-region: no-drag;
// }
</style>
