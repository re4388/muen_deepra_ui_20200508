<template>
  <div id="viewer-overview-panel" class="container-main">
    <div class="page-content">
      <template>
        <vue-picture-swipe :items="items"></vue-picture-swipe>
      </template>
      
      <div class="viewer-list">
        <template v-for="(item, index) in projects">
          <viewer-card
            :key="index"
            :details="item"
          />
          <!-- <div class="pictureWrap" ></div>
          <img src="../../assets/x-ray1.jpg"> -->
        </template>
      </div>

      <template>
        <div id="app">
          <VueDragResize 
          :isActive="true" 
          :w="300" 
          :h="300" 
          :top="100"
          :left="100"
          v-on:resizing="resize" 
          v-on:dragging="resize"            
          >                      
          <img src="../../assets/x-ray1.jpg" style="width: 100%; height: 100%" />
            <h3>example</h3>
            <p>{{ top }} х {{ left }} </p>
            <p>{{ width }} х {{ height }}</p>
          </VueDragResize>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ViewerCard from './ViewerCard.vue'
import viewerData from './viewer_data.json'
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'
import VuePictureSwipe from 'vue-picture-swipe';
 
Vue.component('vue-drag-resize', VueDragResize)

export default {
  name: 'ViewerOverviewPanel',
  name: 'app',
  components: {
    ViewerCard,
    VueDragResize,
    VuePictureSwipe
  },
  data () {
    return {
      projects: viewerData.content,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      items: [{
          key: 1,
          src: 'http://via.placeholder.com/600x400',
          thumbnail: 'http://via.placeholder.com/64x64',
          w: 600,
          h: 400,
          alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
        },
        {
          key: 2,
          src: 'http://via.placeholder.com/1200x900',
          thumbnail: 'http://via.placeholder.com/64x64',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  methods: {
    resize(newRect) {
    this.width = newRect.width;
    this.height = newRect.height;
    this.top = newRect.top;
    this.left = newRect.left;
    }
  }
}
</script>

<style lang="scss" scoped>
#viewer-overview-panel {
  min-height: 100%;
  background-color: rgb(185, 185, 185);
  overflow-y: scroll;
}
.page-content {
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.pictureWrap {
  background: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 870px;  
  margin: 0;
}

.img {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 10px; 
  z-index: 10;
  margin: 0;

}

#btnEnlarge {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  align-items: center;
  float: left;
  position: absolute;
  top: 15px;
  left: 160px;
}

#btnShrink {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  align-items: center;
  float: left;
  position: absolute;
  top: 15px;
  left: 210px;
}

// Picture Swipe Gallery


</style>