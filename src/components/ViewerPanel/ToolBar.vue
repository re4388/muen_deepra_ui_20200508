<template>
  <div id="tool-bar d-flex flex-column" class="tool-bar">

      <div class="wrap__1 flex-fill flex-column">
        <ul class="drop-down-menu d-flex justify-content-center">
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/settings_brightness.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.contrast}}% </br>
                <input 
                  class="inputControl" 
                  type="range" 
                  name="contrast"
                  min="0" 
                  max="150" 
                  v-model="filters.contrast"
                /></div>
              </li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/brightness.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.brightness}}% </br>
                <input 
                  type="range" 
                  name="brightness" 
                  min="0" 
                  max="150" 
                  v-model="filters.brightness"
                /></div>
              </li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/invert_colors.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.invert}}% </br>
                <input 
                  type="range" 
                  name="invert" 
                  min="0" 
                  max="100" 
                  v-model="filters.invert"
                /></div>
              </li>
            </ul>
          </li>
          <li><a href="#"><div class="filterbtn"><img class="img__icon" src="../../assets/opacity.png"></div></a>
            <ul>
              <li><div class="filter">{{filters.opacity}}% </br>
                <input 
                  type="range" 
                  name="opacity" 
                  min="0" 
                  max="200" 
                  v-model="filters.opacity"
                /></div>
              </li>
            </ul>
          </li>
          <li><a href="#" @click=setToDefault()><div class="filterbtn"><img class="img__icon" src="../../assets/undo.png"></div></a>
          </li>
        </ul>
      </div>


      <div class="wrap__2 d-inline-flex flex-fill flex-column justfy-content-center align-self-center;" style="width:100%; height:100%;">
        <v-zoomer class="zoomer d-inline-flex flex-column">
          <imagvue 
            v-model="imageUrl"
            :src="firstImage"
            id="imgExample"
            class="imgExample d-inline-flex justify-content: center"            :filters="isOpenFilters"
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
          <!-- <transition>
            <img 
            v-show="isLoad" 
            :src="url" 
            @load="loaded"
            >
          </transition> -->

          </imagvue>
          <!-- <img :src="firstImage" id="firstImage"/> -->
          <!-- <firstImage :images="firstImage"/> -->
        </v-zoomer>

        <!-- 
        <template>
          <img 
          :key="index"
          id="firstImage"
          class="firstImage" 
          src="firstImageUrl"
          @click="showFirstImage(item, index)"
          />
        </template> -->
    
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import imagvue from 'imagvue'
import VueZoomer from 'vue-zoomer'
import 'vue-zoomer/dist/vue-zoomer.css'
import thumbnail from '@/components/SideBarMenuRight/Thumbnail.vue'
import ImageBox from '@/components/SideBarMenuRight/ImageBox.vue'
import imageData from '@/components/SideBarMenuRight/image_data.json'
import { EventBus } from '@/event_bus.js'
import modPath from 'path'
import fileFetecher from '@/utils/file_fetcher.js'
import FirstImage from '@/components/ViewerPanel/FirstImge.vue'

Vue.use(VueZoomer)

export default {
  name: 'ToolBar',
  props: {
    root: String,
    filename: String
  },
  components: {
    imagvue,
    VueZoomer,
    thumbnail
  },
  created(){
    this.initializeComponent()
    // // expect to show the first image
    // EventBus.$on('onLoadFirstImage', (obj) => {
    //   let item = obj[0].item
    //   let joined = modPath.join(modPath.resolve(item.root), item.filename)
    //   this.url = joined
    // },
    // EventBus.$on('onFirstImageLoaded',(obj)=>{
    //   // console.log(obj)
    //   let item = obj.item[0]
    //   let joined = modPath.join(modPath.resolve(item[0].root), item[0].filename)
    //   // console.log(joined)
    //   this.url = joined
    // }),
    EventBus.$on('onNavigationImageClicked',(obj)=>{
      // console.log(obj)
      let item = obj.item
      let joined = modPath.join(modPath.resolve(item.root), item.filename)
      // console.log(joined)
      this.url = joined
    })
    // // method 01
    // EventBus.$on('onFirstImageLoaded', (obj) => {
    //   console.log(obj)
    //   let item = obj
    //   let joined = modPath.join(modPath.resolve(item.root), item.filename)
    //   // console.log(joined)
    //   this.url = joined
    // })
    // method 02
    EventBus.$once('viewerDatasetChanged',()=>{
    // Parse path of images from dataset and assign to `this.images`
    let dataset = this.$store.getters['Viewer/currentDataset']
    console.log(dataset)

    let pathCollector = new fileFetecher.DatasetPathCollector(dataset)
    pathCollector.parseFileList().then((result) => {
      let firstImage = pathCollector.fileList[0]
      let joined = modPath.join(modPath.resolve(firstImage.root), firstImage.filename)
      this.url = joined
      })
    })
  },
  methods: {
    initializeComponent() {
    },
    showFirstImage(item, index) {
      console.log('--- event `loaded the first image` issued ---')
      console.log(item, index)
      EventBus.$emit('viewerDatasetChanged', {item, index})
    },
    showImgList: function() {
      let el = document.querySelector('.title')
      el.classList.toggle('show')
    },
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
    },
    setToDefault() {
      this.filters = this.defaultValues();
    },
    defaultValues() {
      return {
        contrast: 100,
        brightness: 100,
        grayscale: 0,
        rotate: 0,
        opacity: 100,
        invert: 0,
        saturate: 100,
        sepia: 0,
      }
    }
  },
  computed: {
    fixedRatioHeight () {
      return this.filters['width']
    },
    dropShadow() {
      return this.dropShadowJson
    },
    fullPath: function() {
      return modPath.join(modPath.resolve(this.root), this.filename)
    },
    firstImageUrl: function() {
      console.log('----loading the first image----')  
      console.log(this.url)
      let el = document.getElementById('firstImage')
      if (el === null) return ''
      el.src = this.url
      return this.url;
    },
    imageUrl: function() {
      console.log('----loading----')
      console.log(this.url)
      let el = document.getElementById('imgExample')
      if (el === null) return ''
      el.src = this.url
      return this.url
    }
  },
  //   imageUrl: function() {
  //     window.addEventListener('load', () => {
  //     let el = document.getElementById('imgExample')
  //     el.src = this.url
  //     return this.url;
  //     })
  //   }
  // },
  // mounted() {
  //   window.addEventListener('load', () => {
  //     let el = document.getElementById('imgExample')
  //     el.src = ''
  //     return '';
  //   })
  // },
  // updated() {
  //   let el = document.getElementById('imgExample')
  //   el.src = this.url
  //   return this.url;
  // },
  data() {
    return {
      pathCollector: null,
      cnt: 0,
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
        // width: 500,
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
      // firstImageUrl: 'http://www.clker.com/cliparts/n/b/Q/a/X/U/number-1-black-round-md.png',
      url: 'https://yt3.ggpht.com/a/AGF-l79qoSji84zhO0ZXgvbcGvHkYfjxX6O3ycrxmQ=s900-mo-c-c0xffffffff-rj-k-no'
    }
  }    
}
</script>

<style lang="scss" scoped>
.wrap__1 {
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
  height: 114px;
}
.wrap__2 {
  object-fit: contain;
}

// 下拉式選取區塊
.drop-down-menu {
  height: 50px;
}
ul { 
/* 取消ul預設的內縮及樣式 */
  margin: 0;
  padding: 0;
  list-style: none;
}
ul.drop-down-menu {
  background: rgb(231, 231, 231);
}
ul.drop-down-menu li {
  position: relative;
}
ul.drop-down-menu > li:last-child {
  border-right: none;
}
ul.drop-down-menu a {
  background: rgb(231, 231, 231);
  display: block;
  padding: 0 40px;
  line-height: 50px;
}
ul.drop-down-menu a:hover { /* 滑鼠滑入按鈕變色*/
  background: rgb(231, 231, 231);
  border-radius: 3px;
} 
ul.drop-down-menu li:hover > a { /* 滑鼠移入次選單上層按鈕保持變色*/
  background: rgb(255, 255, 255);
}
ul.drop-down-menu li:hover > ul { /* 滑鼠滑入展開次選單*/
  display: block;
  background: rgb(255, 255, 255);
  padding: 5px 10px;
}
ul.drop-down-menu ul { /*隱藏次選單*/
  display: none;
}
ul.drop-down-menu ul li:last-child {
  border-bottom: none;
}
ul.drop-down-menu ul ul { /*第三層以後的選單位置與第二層不同*/
  z-index: 25;
  top: 10px;
  left: 90%;
}
.vdr.active:before {
  // outline: none;
}
.vdr-stick {
  border: 6px solid #6c6c6c;
  // display: none;
}
.vue-zoomer {
  // overflow: hidden;
}
// .zoomer {
//   height: 600px;
// }
#imgExample {
  // min-height: 100%;
  // display: flex;
  // align-items: stretch;
  // width: 50%;
  object-fit: contain;
  // width: auto;
  height: 100%;
}

.firstImage {
  width: 100px;
  height: 100px;
  background: white;
  position: fixed;
  top: 200px;
  left: 300px;
}
</style>
