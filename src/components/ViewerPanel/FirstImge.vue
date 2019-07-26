<template>
  <div class="first-image" id="first-image" @click="onClick">click me
    <img :src=firstPath class="content"/>
  </div>
</template>   
     
<script>
import modPath from 'path'
import { EventBus } from '@/event_bus.js'


export default {
  name: 'FirstImage',
  props: {
    root: String,
    filename: String
  },
  computed: {
    firstPath: function () {
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
.content {
  width: 40px;
  height: 40px;
  background: white;
}

</style>
