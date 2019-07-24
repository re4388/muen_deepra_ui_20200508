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
              @click="showClickedThumbnail"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>   
     
<script>
import thumbnail from './Thumbnail.vue'

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
    showClickedThumbnail (event, el) {
      console.log(event)
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
