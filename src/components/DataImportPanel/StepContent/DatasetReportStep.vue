<template>
  <div class="dataset-report-step step-content">
    <h4 class="title text-content">{{ content.title }}</h4>
    <p class="description text-content"></p>
  </div>
</template>

<script>
export default {
  name: 'DatasetReportStep',
  props: {
    content: Object
  },
  created: function () {
  },
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content {
  color: black;
  padding: 20px;
}
.text-content {
  text-align: left;
}
</style>
