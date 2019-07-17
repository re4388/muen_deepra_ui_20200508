<template>
  <div>
    <div>
      <form class="range-field">
        <label for>Threshold Value</label>
        <br />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          v-model.lazy.number="slider"
          @change="ThresholdChange"
        />
        <h2 class="slider">{{ slider }}</h2>
      </form>
    </div>

    <div>
      <h3>
        Image:
        <span>{{ imageNumber}}</span>
        <br />
        Presison: {{precision}}
        <br />
        Recall: {{recall}}
        <br />
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThresholdAdjustment",
  props: {
    thresholdData: {
      type: Object
    }
  },

  data() {
    return {
      slider: 0,
      imageNumber: 0,
      precision: 0,
      recall: 0
    };
  },

  created() {
    this.updateData();
  },
  methods: {
    ThresholdChange() {
      let val = this.slider;
      this.$emit("threshold-change", {
        result: val
      });
    },
    updateData() {
      this.imageNumber = this.thresholdData.image;
      this.precision = this.thresholdData.precision;
      this.recall = this.thresholdData.recall;
    }
  },
  watch: {
    slider() {
      this.precision = this.precision - this.slider * 20;
      this.recall = this.recall + this.slider * 5;
    }
  }
};
</script>

<style scoped>
ul li {
  list-style-type: none;
}
</style>
