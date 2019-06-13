<template>
  <div class="pipeline-element">
    <div class="number-label" @click="showMessage">
      {{ digit }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PipelineElement',
  props: {
    digit: Number
  },
  methods: {
    showMessage () {
      this.$emit('on-label-selected', this.digit)
    }
  }
}
</script>

<style lang="scss" scoped>
$label-height: 75px;
$label-font-size: $label-height/3;

.pipeline-element {
  padding: 5px 10px;
}
.number-label {
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
