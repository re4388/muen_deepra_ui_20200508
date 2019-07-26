<template>
  <div id="viewer-container" class="container">
    <!-- <thumbnail
      :key="index"
      :root="item.root"
      :filename="item.filename"
      @click="showFirstImage(item, index)"
    /> -->
  </div>
</template>

<script>
import FirstImage from '@/components/ViewerPanel/FirstImge.vue'
import { EventBus } from '@/event_bus.js'
import ToolBar from '@/components/ViewerPanel/ToolBar.vue'

export default {
  name:"ViewerContainer",
  // components: {
  //   FirstImage
  // },
  // created () {
  //   this.initializeComponent()
  // },
  // methods: {
  //   initializeComponent () {
  //   },
  //   showFirstImage (item, index) {
  //     console.log('--- event `the first image loaded` issued ---')
  //     console.log(item, index)
  //     EventBus.$emit('onLoadFirstImage', {item, index})
  //   }
  // },
  // props: {
  //   currentImageSrc: String,
  //   images: Array
  // },
  // computed: {
  // },
  // data () {
  //   return {
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.container {
  // min-width: 100%;
  // min-height: 100%;
  // padding-right: 0px;
  // flex-direction: column;
  // justify-content: center;
  // overflow: hidden;
  // border: 1px solid green;
  // text-align: center;
  // background: white;
  // border: 1px solid red;
  // width: 40px;
  // height: 40px;
}
</style>