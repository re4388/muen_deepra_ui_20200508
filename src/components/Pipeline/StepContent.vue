<template>
  <div class="step-content" @simpleevent="showEvent">
    <p class="title">{{ content.title }}</p>
    <p class="description">{{ content.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'StepContent',
  props: {
    content: Object
  },
  methods: {
    showEvent (event) {
      alert(event)
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content {
  color: black;
  padding: 20px;
}
.title {
  text-align: left;
}
.description {
  text-align: left;
}
</style>
