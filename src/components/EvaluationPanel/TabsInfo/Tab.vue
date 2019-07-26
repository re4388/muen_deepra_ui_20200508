<template>
  <!-- 上層有loop thru每一個tab的name, 又<a>會觸發currentView -->
  <div v-if="name === currentView" class="tab">
    <slot name="title"></slot>
    <slot name="MetricsDisplay"></slot>

    <div class="row innerGrpah">
      <dir :class="[activeClass]">
        <slot name="GraphDisplay2"></slot>
      </dir>
      <dir class="col-4" v-if="currentView !== 'all class'">
        <slot name="ThresholdAdjustment"></slot>
      </dir>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    name: {
      type: String
    },
    currentView: {
      type: String
    }
  },
  data() {
    return {
      isShow: true
      // activeClass:'col-8'
    };
  },
  computed: {
    activeClass() {
      if (this.currentView === "all class") {
        return "col-12";
      } else {
        return "col-8";
      }
    }
  }
};
</script>

<style scoped>
.innerGrpah {
  align-self: center;
  /* height: 1000px;
  width: 1000px; */
}
</style>
