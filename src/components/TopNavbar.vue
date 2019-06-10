<template>
  <div id="top-navbar" class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap">
    <a id="brand" class="navbar-brand" href="#" @click.prevent="onClick">{{ brandText }}</a>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar',
  props: {
    brandText: String
  },
  methods: {
    onClick() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
$navbar-height: 56px;

#top-navbar {
  min-height: $navbar-height;
}
#brand {
  position: relative;
  width: 136px;
  left: 0px;
}
</style>
