<template>
  <div id="image-box" class="image-box">
    <div class="box">
      <div class="title">
        <div class="catalog">{{ currentImageIndex }} / {{ total }}</div>
          <div class="imgList-wrapper">
            <transition name="fade">
              <div class="loading" v-show="loading">
                <span class="fa fa-spinner fa-spin"></span> Loading
              </div>            
            </transition>
            <div class="imgList " id="imgList">
              <template class="imgList-item" id="imgList-item" v-for="(item, index) in loadedImages">
                <thumbnail
                  :key="index"
                  :root="item.root"
                  :filename="item.filename"
                  :isDifferent="isDifferentArray.indexOf(item.index) !== -1"
                  :isModified="isModifiedArray.indexOf(item.index) !== -1"
                  @click="showClickedThumbnail(item, index)"
                />
              </template>
            </div>       
          </div>
      </div>
    </div>
  </div> 
</template>   
     
<script>
import thumbnail from './Thumbnail.vue'
import { EventBus } from '@/event_bus.js'
import ToolBar from '@/components/ViewerPanel/ToolBar.vue'
import { window } from 'd3-selection'
import { connect } from 'http2'
import { mapState } from 'vuex'

export default {
  name: 'ImageBox',
  components: {
    thumbnail
  },
  mounted () {
    let func  = function FUNC_NAME (foo) {return foo.bar};
    const listElm = document.querySelector('#imgList');
    listElm.addEventListener('scroll', e => {
      let condition = listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight
      if(condition) {
        this.loadMore();
      }
    })
  },
  beforeDestroy() {
    EventBus.$off('notifyImageTotalNumber')
  },
  methods: {
    initializeComponent () {
      this.loadedImages = this.images.slice(this.currentIndex, this.currentIndex+this.batchSize)
      this.currentIndex += this.batchSize
      this.isInitialized = true
    },
    showClickedThumbnail (item, index) {
      EventBus.$emit('onNavigationImageClicked', {item, index})
      // console.log('--- selected image:')
      // console.log(item)
      // console.log(`ground truth: ${item.label}, predicted: ${this.predictedLabels[item.index]}`)
      this.indexNumber = index === undefined ? 0 : index
    },
    loadMore () {
      this.loading = true;
      setTimeout(e => {
        let batchSizeNumber = Math.ceil(this.loadedImages.length / this.batchSize)
        if (batchSizeNumber*this.batchSize <= this.loadedImages.length) {
          this.loadedImages.push(...this.images.slice(this.currentIndex, this.currentIndex+this.batchSize))
          this.currentIndex += this.batchSize
        }
        this.loading = false;
      }, 200);
    }
  },
  props: {
    currentImageSrc: String,
    images: Array
  },
  watch: {
    indexNumber () {},
    images (newVal, oldVal) {
      // XXX: source of `images` is generated from asynchronous operation, so that we cannot
      //   updated `loadedImages` when this component is just created / mounted.
      if (this.isInitialized) return
      this.initializeComponent()
    }
  },
  computed: {
    currentImageIndex () {
      return this.indexNumber + 1
    },
    isDifferentArray () {
      return this.differentLabels
    },
    isModifiedArray () {
      return this.modifiedSamples.map((item) => item.index)
    },
    total () {
      return this.images.length
    },
    ...mapState ({
      predictedLabels: state => state.Testing.predictedLabels,
      differentLabels: state => state.Testing.differentLabels,
      modifiedSamples: state => state.Label.modifiedSamples
    })
  },
  data () {
    return {
      loading: false,
      nextItem: 1,
      loadedImages: [],
      currentIndex: 0,
      indexNumber: 0,
      batchSize: 40,
      isInitialized: false
    }
  }
} 
</script>

<style lang="scss" scoped>
.edited::after {
  content: "";
  display: inline-flex;
  position: absolute;
  background: rgba(230, 230, 112, 0.5);
  width: 60px;
  height: 60px;
  background-image: url('../../assets/edit.png');
  background-repeat: no-repeat; 
}

$scroll-bar-width: 5px;
.imgList {
  width: 315px;
  height: 329px;
  margin: 0 auto;
  list-style-type: none;
  text-align: left;
  position: relative;
  top: -20px;
  padding-bottom: 20px;
  overflow-y: scroll;
    &::-webkit-scrollbar {
    width: $scroll-bar-width;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-track {
      background-color: #808080;
      z-index: 21;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0f0f0f;
    }
  }
}
.catalog {
  width: 315px;
  height: 20px;
  background: #777777;
  position: relative;
  top: 309px;
  left: 0;
  z-index: 20;
  line-height: 20px;
  color: white;
}
.box {
  height: 328px;
  width: 315px;
  overflow: hidden;
  position: fixed;
  top: 300px;
  right: 150px;
  padding: 0px;
  padding-bottom: 20px;
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
.imgList-wrapper {
  position: relative;
}
.imgList {
  overflow: auto;
}
.imgList-item {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 60px;
  height: 60px;
  margin-top: 0px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #dce4ec;
}
.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 25;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
  font-size: 16px;
  background: gray;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.changeStyle {
  position: relative;
  top: -20px;
}
</style>
