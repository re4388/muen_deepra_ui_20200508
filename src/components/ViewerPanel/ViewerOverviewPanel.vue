<template>
  <div id="viewer-overview-panel" class="container-main">
    <template>
      <template>
        <div class="wrap">
        </div>
  </template>
  </template>
    <img id="img__example" src="../../assets/x-ray1.jpg" />
  </div>
</template>

<script>
// import ViewerCard from './ViewerCard.vue'
import viewerData from "./viewer_data.json";
import Vue from "vue";

new Vue({
  el: '#app',
  
})

export default {
  name: "ViewerOverviewPanel",
  name: "app",
  components: {
    // ViewerCard,
  },
  data() {
    return {
      projects: viewerData.content
    };
  }
};
</script>

<style lang="scss" scoped>
#viewer-overview-panel {
  min-height: 100%;
  background-color: rgb(185, 185, 185);
  overflow-y: scroll;
}

.img__example {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 300px;
}

.wrap {
  display: flex;
  height: 30px;
  background: rgb(77, 77, 77);
}

</style>