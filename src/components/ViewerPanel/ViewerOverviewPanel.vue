<template>
  <div id="viewer-overview-panel" class="container-main">
    <ToolBar/>    
    <SidebarRight/>
    <ViewerContainer/>
    <!-- <imag-vue-panel></imag-vue-panel> -->
  </div>
</template>

<script>
import Vue from "vue";
import SidebarRight from '@/components/SideBarMenuRight/SideBarMenuRight.vue';
import ToolBar from '@/components/ViewerPanel/ToolBar.vue';
import imagvue from 'imagvue';
import VueDragResize from 'vue-drag-resize';
import ViewerContainer from './ViewerContainer.vue';
// import ImagVuePanel from '@/components/ImagVuePanel/ImagVuePanel.vue';
// import imageData from './image_data.json'
// console.log(imagvue)
// console.log(imagvue.props.value)

export default {
  name:"ViewerOverviewPanel",
  components: {
    ViewerContainer,
    SidebarRight,
    ToolBar,
    imagvue,
    VueDragResize
    // ImagVuePanel,
  },
  computed: {
  },
  data() {
    return {
    }
  },
  computed:{
  },
  methods: {
  }  
};


</script>

<style lang="scss" scoped>
#viewer-overview-panel {
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
  max-width: 100%;
  padding-right: 150px;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  border: 1px solid red;
}

</style>