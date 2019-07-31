<template>
  <div class="thumbnail" id="thumbnail" @click="onClick">
    <div class="layer-container">
      <img :src=fullPath class="main-content"/>
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
    filename: String,
    
  },
  created() {
    // EventBus.$emit('onNavigationImageClicked', this.item[0]);
  },
  computed: {
    fullPath: function () {
      return modPath.join(modPath.resolve(this.root), this.filename)
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
.main-content {
  width: 40px;
}
.thumbnail {
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
.thumbnail:hover::after {
  content: "";
  display: inline-flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #42ab427d;
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
</style>
