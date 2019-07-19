<template>
  <div id="thumbnail">
    <div class="layer-container">
      <img :src=fullPath class="main-content"/>
    </div>
  </div>
</template>   
     
<script>
import modPath from 'path'

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
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  width: 40px;
}
</style>
