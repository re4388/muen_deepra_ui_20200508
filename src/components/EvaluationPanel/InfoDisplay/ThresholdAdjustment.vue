<template>
  <div>
    <div class="m-3">
      <form class="range-field my-1 w-25">
        <input type="range" min="0" max="1" step="0.1" v-model="slider"/>
        {{ slider }}
      </form>
      <ul>
        <li v-for="item in thresholdData">{{item }}</li>
      </ul>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'ThresholdAdjustment',
    props: ['thresholdData'],
    data() {
      return {
        slider:0
      }
    }
  }

</script>

<style scoped>
</style>
