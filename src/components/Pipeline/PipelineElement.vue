<template>
  <div class="pipeline-element">
    <!-- <div class="content">
      <div class="outter-ring"></div>
      <div class="number-label" @click="emitClickedEvent">{{ digit }}</div>
    </div> -->
    <div class="number-label"
      @click="emitClickedEvent"
      :style="labelStyle"
    >
      {{ digit + 1}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PipelineElement',
  props: {
    digit: Number
  },
  watch: {
    isSelected (val) {
      return val
    }
  },
  computed:{
    labelStyle () {
      return {
        background: this.isSelected ? 'orange' : 'lightgray',
      }
    }
  },
  methods: {
    emitClickedEvent () {
      this.$emit('onLabelSelected', this.digit)
    }
  },
  data() {
    return {
      isSelected: false
    }
  }
}
</script>

<style lang="scss" scoped>
$content-height: 75px;
$label-height: $content-height - 10px;
$label-font-size: $label-height / 3;

.pipeline-element {
  padding: 10px 10px;
}
.content {
  position: static;
  height: $content-height;
  width: $content-height;
}
.outter-ring {
  position: relative;
  background-color: black;
  width: $content-height;
  height: $content-height;
  border-radius: 50%;
}
.number-label {
  position: relative;
  background-color: lightgray;
  width: $label-height;
  height: $label-height;
  border-radius: 50%;
  line-height: $label-height;
  text-align: center;
  user-select: none;
  margin: auto;
  font-size: $label-font-size;
}
</style>
