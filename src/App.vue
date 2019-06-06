<template>
  <div id="app">
    <top-navbar brandText="DeepRA"/>
    <div id="display-panel" class="d-flex flex-row">
      <sidebar/>
      <base-panel class="flex-fill"/>
      <!-- <base-panel/> -->
    </div>
  </div>
</template>

<script>
import TopNavbar from './components/TopNavbar.vue'
import Sidebar from './components/SideBarMenu/SideBarMenu.vue'
import BasePanel from './components/BasePanel.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    TopNavbar,
    BasePanel
  }
}
</script>

<style scoped>
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
}
#top-navbar {
  position: absolute;
}
#sidebar {
  position: relative;
  height: 100%;
  margin-left: 0px;
  margin-bottom: 0px;
}
</style>
