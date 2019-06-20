<template>
  <div class="training-progress">
    <div class="title text-content">{{ content.title }}</div>
    <div class="progress">
      <div class="progress-bar" role="progressbar"
        :style="{width: progressValue + '%'}"
        v-bind:aria-valuenow=progressValue
        v-bind:aria-valuemin=progressValueMin
        v-bind:aria-valuemax=progressValueMax>
        <div class="progress-text">{{ progressValue }}%</div>
      </div>
    </div>
    <div class="estimated-time text-content">Estimated time of completion:</div>
  </div>
</template>

<script>
export default {
  name: 'TrainingProgress',
  props: {
    content: Object
  },
  created: function () {
    // For testing in prototype only
    this.demoForUpdateProgress()
  },
  methods: {
    updateProgressBar (val) {
      if (val > this.progressValueMax) {
        return
      }
      this.progressValue = val
      if (val === this.progressValueMax) {
        console.log('Training is finished')
        this.$emit('on-progress-finished', true)
      }
    },
    // For testing in prototype only
    demoForUpdateProgress () {
      let val = 0
      setInterval(() => {
        val += 1
        this.updateProgressBar(val)
      }, 100)
    }
  },
  data () {
    return {
      progressValue: 0,
      progressValueMin: 0,
      progressValueMax: 100
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  margin: 0px 0px 20px 0px;
}
.training-progress {
  color: black;
  padding: 20px;
}
.progress-bar {
  background-color: rgb(0, 123, 255);
  & .progress-text {
    user-select: none;
  }
}
.text-content {
  text-align: left;
}
</style>
