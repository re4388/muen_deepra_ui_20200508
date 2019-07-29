<template>
  <div id="image-box" class="image-box">
    <div class="box">
      <div class="title">
        <div class="imgList" id="imgList">
          <template v-for="(item, index) in images">
            <thumbnail
              :key="index"
              :root="item.root"
              :filename="item.filename"
              @click="showClickedThumbnail(item, index)"
            />
          </template>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>   
     
<script>
import thumbnail from './Thumbnail.vue'
import { EventBus } from '@/event_bus.js'
import ToolBar from '@/components/ViewerPanel/ToolBar.vue'

export default {
  name: 'ImageBox',
  components: {
    thumbnail
  },
  created () {
    this.initializeComponent()
  },
  methods: {
    initializeComponent () {
    },
    showClickedThumbnail (item, index) {
      console.log('--- event `loaded` issued ---')
      console.log(item, index)
      EventBus.$emit('onNavigationImageClicked', {item, index})
    }
  },
  props: {
    currentImageSrc: String,
    images: Array
  },
  computed: {
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
// ImageList
.imgList {
  width: 300px;
  height: 300px;
  overflow: scroll;
  margin: 0 auto;
  list-style-type: none;
  text-align: left;
  position: relative;
}

.imgList::-webkit-scrollbar { 
    display: none; 
}

.box {
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: fixed;
  top: 350px;
  right: 150px;
  padding: 0px;
}

.title {
  background: #000;
  width: 100%;
  position: absolute;
  right: -400px;
  transition: all 1s;
  overflow: hidden;
}

.show {
  right: 0px;
}
</style>
