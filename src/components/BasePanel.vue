<template>
  <div id="base-panel" class="container-main">
    <div id="page-content">
      <p>Base panel</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BasePanel',
  components: {
  }
}
</script>

<style lang="scss" scoped>
#base-panel {
  min-height: 100%;
  background-color: gray;
}
#page-content {
  margin-top: 150px;
  color: black;
}
</style>
