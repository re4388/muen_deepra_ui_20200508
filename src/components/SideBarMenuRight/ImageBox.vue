<template>
  <div id="image-box">
    <div class="box">
      <div class="title">
        <div class="imgList" id="imgList">

          <div class="x-rayFilms" v-for="(item,index) in images" :key="index">
            <!-- <img class="thumb" width="40px" :src="getThumb(item.type)" /> -->
            <!-- <img :src="require('../../assets/x-ray1.jpg')" v-for="image in image" height="40px" /> -->
            <img :src="item.src" style="width:40px"/>
            <!-- <img :src="require(`@/assets/${images.src}`)" /> -->
            <!-- <img :src="require(`@/assets/${topnews.img}`)" alt="Top News" /> -->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>   
     
<script>
<<<<<<< Updated upstream
import imageList from '@/static/image_data.json'
=======
// import imageList from '@/assets/image_data.json'
// console.log('--- ImageBox ---')
// console.log(imageList.images)

// imageList.images.map((item) => {
//   item.src = require(item.src)
//   console.log(item)
//   return item
// })
// console.log(imageList)
>>>>>>> Stashed changes

export default {
  name: 'ImageBox',
  components: {
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
      // imageGroups: json.images
      images: [
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1.jpg')},
        { src: require('../../assets/x-ray1_backup.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1_backup.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1.jpg')},
        { src: require('../../assets/x-ray1_backup.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1_backup.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1_backup.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1.jpg')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/viewer-img.png')},
        { src: require('../../assets/x-ray1.jpg')}
      ]
<<<<<<< Updated upstream
=======
      // images: imageList.images
      // imageList: []
>>>>>>> Stashed changes
    }
  }
}
</script>

<style lang="scss">
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
