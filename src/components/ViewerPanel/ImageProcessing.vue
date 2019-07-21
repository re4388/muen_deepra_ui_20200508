<template>
  <div id="image-Processing d-flex">
      <VueDragResize 
        :isActive="true"
        :isResizable="true"
        :isDraggable="true"
        :aspectRatio="true"
        :w="filters.width"
        :h="filters.height"
        :x="0"
        :y="50"
        v-on:resizing="resize" 
        v-on:dragging="resize">
        <!-- <p>{{ top }} х {{ left }} </p> -->
        <!-- <p>{{ width }} х {{ height }}</p> -->
        <imagvue class="imgExample" 
          style="width: 100%;"
          v-model="url"
          :filters="isOpenFilters"
          :onerror="()=>url='https://i.stack.imgur.com/cl91I.png'"
          :width="filters.width" 
          :height="filters.height"
          :brightness="filters.brightness"
          :contrast="filters.contrast"
          :grayscale="filters.grayscale"
          :hue-rotate="filters.rotate"
          :opacity="filters.opacity"
          :invert="filters.invert"
          :saturate="filters.saturate"
          :sepia="filters.sepia"
          :customData="customData()"
        >
        <transition-group 
        src="https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif" 
        :lazy="1000"
        >
        </transition-group>
        </imagvue>
      </VueDragResize>
    </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';
import imagvue from 'imagvue'

export default {
  name: 'ImageProcessing',
  components: {
    imagvue,
    VueDragResize
  },
  methods: {
    onLoadEvent() {
      console.log("Image on load!");
    },
    customData() {
      return {
        on: {
          load: this.onLoadEvent,
        }
      }
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    }
  },
  computed: {
    // fixedRatioHeight () {
    //   return this.filters['width']
    // },
    dropShadow() {
      return this.dropShadowJson
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      // projects: viewerData.content,
      isOpenFilters: true ,
      dropShadowJson:
      {
        offset: 16,
        blurRadius: 16,
        spreadRadius: 10,
        color: "#000000"
      },
      filters: {
        // maintain the aspect ratio
        width: 500,
        // height: 500,
        contrast: 100,
        brightness: 100,
        grayscale: 0,
        rotate: 0,
        opacity: 100,
        invert: 0,
        saturate: 100,
        sepia: 0,
      },
      tooltip: false,
      url: 'https://media.mnn.com/assets/images/2012/05/XrayExposure.jpg.653x0_q80_crop-smart.jpg',
      errorURL:'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif',
      loadUrls:[
        {url:'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif' , lazy:'https://goo.gl/aiwqia'}
      ],
      // imageList: imageData.content
    }
  }    
}
</script>

<style lang="scss">
.vdr.active:before {
  outline: none;
}

.vdr-stick {
  display: none;
}

.imgExample {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
