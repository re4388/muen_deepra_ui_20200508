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
import { window } from 'd3-selection';
import { connect } from 'http2';
import { mapState } from 'vuex';

export default {
  name: 'ImageBox',
  components: {
    thumbnail
  },
  created () {
    EventBus.$once('notifyImageTotalNumber', (imageTotalNumber)=>{
      this.total = imageTotalNumber
      this.initializeComponent()
    })
  },
  mounted(){
    const listElm = document.querySelector('#imgList');
    listElm.addEventListener('scroll', e => {
      let condition = listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight
      if(condition) {
        this.loadMore();
      }
    });
    // Initially load some items.
    // this.loadMore();
  },
  methods: {
    initializeComponent () {
      this.loadedImages = this.fileList.slice(this.currentIndex, this.currentIndex+this.batchSize)
      this.currentIndex += this.batchSize
    },
    showClickedThumbnail (item, index) {
      EventBus.$emit('onNavigationImageClicked', {item, index})
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
    indexNumber () {
      return this.indexNumber
    }
  },
  computed: {
    currentImageIndex () {
      return this.indexNumber + 1
    },
    ...mapState({
      fileList: state => state.Viewer.parsedFileList,
      predictedLabels: state => state.Testing.predictedLabels
    })
  },
  data () {
    return {
      loading: false,
      nextItem: 1,
      loadedImages: [],
      currentIndex: 0,
      indexNumber: 0,
      total: '',
      batchSize: 40
    }
  }
}
</script>

<style lang="scss" scoped>
.imgList {
  width: 317px;
  height: 320px;
  overflow: scroll;
  margin: 0 auto;
  list-style-type: none;
  text-align: left;
  position: relative;
  top: -20px;
  padding-bottom: 20px;
}
// .imgList::-webkit-scrollbar { 
//     display: none; 
// }
.catalog {
  width: 300px;
  height: 20px;
  background: #777777;
  position: relative;
  top: 300px;
  left: 0;
  z-index: 20;
  line-height: 20px;
  color: white;
}
.box {
  height: 320px;
  width: 317px;
  overflow: hidden;
  position: fixed;
  top: 350px;
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
  margin-top: 1px;
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
</style>
