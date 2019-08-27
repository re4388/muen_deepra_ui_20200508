<template>
  <div class="thumbnail" id="thumbnail" @click="onClick" :style="isDifferentStyle">
    <div class="layer-container">
      <img 
      :src=fullPath
      :style="isModifiedStyle"
      class="main-content"/>
    </div>
  </div>
</template>   
     
<script>
import modPath from 'path'
import { EventBus } from '@/event_bus.js'
// import { mapState } from 'vuex'


export default {
  name: 'Thumbnail',
  data () {
    return {
    }
  },
  props: {  
    root: String,
    filename: String,
    isDifferent: Boolean,
    isModified: Boolean
  },
  computed: {
    fullPath: function () {
      return modPath.join(modPath.resolve(this.root), this.filename)
    },
    isDifferentStyle () {
      return this.isDifferent ? { 'border': '1px solid red' } : { }
    },
    isModifiedStyle () {
      return this.isModified ? { 'border' : '1px solid rgba(230, 230, 112, 0.5)' } : { }
    } 
  },
  methods: {
    onClick () {
      this.$emit('click', this._props)
    }
  }
}
</script>

<style lang="scss" scoped>
// .edited::after {
//   content: "";
//   display: inline-flex;
//   position: absolute;
//   background: rgba(230, 230, 112, 0.5);
//   width: 60px;
//   height: 60px;
//   background-image: url('../../assets/edit.png');
//   background-repeat: no-repeat; 
// }

.main-content {
  width: 40px;
}
.thumbnail {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 3px;
  margin: 1px;
  z-index: 9;
  position: relative;
}
.thumbnail:hover::after {
  content: "";
  display: inline-flex;
  position: absolute;
  top: 1;
  right: 1;
  bottom: 1;
  left: 1;
  background: #42ab427d;
  width: 60px;
  height: 60px;
}
// .thumbnail::after {
//   content: "";
//   display: inline-flex;
//   position: absolute;
//   top: 1;
//   right: 1;
//   bottom: 1;
//   left: 1;
//   background: rgba(230, 230, 112, 0.5);
//   width: 60px;
//   height: 60px;
// }
// .labelGreen::before {
//   content: "";
//   display: inline-flex;
//   position: absolute;
//   top: 0;
//   left: 45px;
//   width: 15px;
//   height: 15px;
//   background: #42ab427d;
// }
</style>
