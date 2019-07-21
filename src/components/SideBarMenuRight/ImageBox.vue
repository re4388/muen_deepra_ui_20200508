<template>
  <div id="image-box">
    <div class="box">
      <div class="title">
        <div class="imgList" id="imgList">
          <div class="x-rayFilms" v-for="(item, index) in images" :key="index">
            <thumbnail :root="item.root" :filename="item.filename"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>   
     
<script>
import thumbnail from './Thumbnail.vue'
import imageData from './image_data.json'

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
    }
  },
  props: {
    currentImageSrc: String
  },
  computed: {
  },
  data () {
    return {
      images: imageData.images
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

.x-rayFilms {
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 3px;
  z-index: 9;
  position: relative;
}

.x-rayFilms:hover::after {
  content: "";
  display: inline-flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #42ab427d;
}
</style>
