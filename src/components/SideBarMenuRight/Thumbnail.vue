<template>
  <div class="thumbnail" id="thumbnail" @click="onClick">
    <div class="layer-container">
      <img 
      :src=fullPath
      class="main-content"/>
    </div>
  </div>
</template>   
     
<script>
import modPath from 'path'
import { EventBus } from '@/event_bus.js'


export default {
  name: 'Thumbnail',
  props: {
    root: String,
    filename: String
  },
  computed: {
    fullPath: function () {
      return modPath.join(modPath.resolve(this.root), this.filename)
    }
  },
  methods: {
    onClick () {
      this.$emit('click', this._props)
      // console.log(this._props.filename)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  width: 40px;
}
.thumbnail {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  // box-shadow: 0 0 0 2px black;
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
.labelGreen::before {
  content: "";
  display: inline-flex;
  position: absolute;
  top: 0;
  left: 45px;
  width: 15px;
  height: 15px;
  background: #42ab427d;
}
.labelRed {
  border: 1px solid red;
}
.metadataDisplay {
  color: white;
  position: fixed;
  top: 700px;
  left: 50px;
  // background: blue;
  padding: 10px;
}
</style>
