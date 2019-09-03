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
            v-model="url"
            id="imgExample"
            class="imgExample d-inline-flex justify-content-center"            
            :filters="isOpenFilters"
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
          </imagvue>
        </v-zoomer>    
      </div>

      <div class="metadataDisplay">
        {{ this.imageFilename }}
      </div>

  </div>
</template>

<script>
import imagvue from 'imagvue'
// NOTE: dependency `parcel-bundler` used by `vue-zoomer` makes distributed
//   electron application unable to launched sucessfully.
//   (ReferenceError: `parcelRequire is not defined`)
//   So that we change the source of `vue-zoomer` from released source in
//   npm modules to cloned source in `src/vendor/vue-zoomer/src`.
import VueZoomer from '@/vendor/vue-zoomer/src'
import thumbnail from '@/components/SideBarMenuRight/Thumbnail.vue'
import ImageBox from '@/components/SideBarMenuRight/ImageBox.vue'
import imageData from '@/components/SideBarMenuRight/image_data.json'
import { EventBus } from '@/event_bus.js'
import modPath from 'path'
import fileFetecher from '@/utils/file_fetcher.js'

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
    console.log('----loading----')
    this.initializeComponent()
    // methods-1
    // when (once) receive the message about viewerDatasetChange, 
    // get the current dataset from fileFecher,
    // and let the firstImage equal to the first item from the fileList
    // finally, join the root and filename for imageUrl using
    EventBus.$once('viewerDatasetChanged',()=>{
      // Parse path of images from dataset and assign to `this.images`
      let firstImage = this.$store.getters['Viewer/parsedFileList'][0]
      let resolvedRoot = firstImage.root !== '' ? modPath.resolve(firstImage.root) : ''
      let joined = modPath.join(resolvedRoot, firstImage.filename)
      this.url = joined
      this.imageFilename = firstImage.filename
    }),
    // // methods-2
    // // when receive the message adout "onFirstImageLoaded"
    // // join the root and the filename as imageUrl
    // EventBus.$on('onFirstImageLoaded', (obj) => {
    //   console.log(obj)
    //   let item = obj
    //   let joined = modPath.join(modPath.resolve(item.root), item.filename)
    //   // console.log(joined)
    // this.url = joined
    // })
    // when onNavigationImageClicked, join the root and filename for imageUrl using
    EventBus.$on('onNavigationImageClicked',(obj)=>{
      let item = obj.item
      let resolvedRoot = item.root !== '' ? modPath.resolve(item.root) : ''
      let joined = modPath.join(resolvedRoot, item.filename)
      this.url = joined
      this.imageFilename = item.filename
    })
  },
  methods: {
    initializeComponent() {
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
  },
  data() {
    return {
      imageFilename: null,
      pathCollector: null,
      cnt: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      // projects: viewerData.content,
      isOpenFilters: true ,
      filters: {
        // maintain the aspect ratio
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
      url: 'https://www.evershine.com/wp-content/uploads/2017/11/60T90-Black.jpg'
    }
  }    
}
</script>

<style lang="scss" scoped>
.wrap__1 {
  background-color: rgb(0, 0, 0);
}
.wrap__2 {
  object-fit: contain;
}
// 下拉式選取區塊
.drop-down-menu {
  height: 50px;
  line-height: 100%;
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
  display: block;
  z-index: 998;
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
#imgExample {
  object-fit: contain;
  height: 100%;
  z-index: -1;
}
.metadataDisplay {
  color: white;
  position: absolute;
  bottom: 50px;
  margin-left: 20px;
  user-select:none;
}
</style>
