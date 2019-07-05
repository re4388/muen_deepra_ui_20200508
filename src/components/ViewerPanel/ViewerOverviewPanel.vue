
<template>
  <div id="viewer-overview-panel" class="container-main">
    <template>
      <div class="wrap">
        <button class="btn"><img class="img__icon" src="../../assets/zoom_in.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/zoom_out.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/settings_brightness.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/grid_on.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/crop_free.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/crop.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/rotate_left.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/rotate_right.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/file_copy.png"></button>
        <button class="btn"><img class="img__icon" src="../../assets/undo.png"></button>
        </div>
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
  box-sizing: border-box;
  min-height: 100%;
  background-color: rgb(0, 0, 0);
  overflow-y: scroll;
}

#img__example {
  // display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90%;
}

.wrap {
  display: flex;
  height: 40px;
  background: rgb(255, 255, 255);
}
.btn {
  background: rgb(231, 231, 231);
  width: 100%;
  display: flex;
  padding: 10px;
  text-align: center;
  flex-direction: column;
  align-items: center;
}

.btn:hover{
  background: lightgray;
}

.img__icon {
  width: 60%;
}

</style>