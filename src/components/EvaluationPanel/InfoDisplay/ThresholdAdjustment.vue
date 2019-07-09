<template>
  <div class="pr-5">

    <div class="mt-5">
      <form class="range-field my-1 w-40">
        <label for="">Threshold Value</label> <br>
        <input type="range" min="0" max="1" step="0.1" v-model.lazy.number="slider" slider-data
          @change="ThresholdChange" />
        <h2 class="slider">{{ slider }}</h2>
      </form>
    </div>

    <div class="pt-2">
      <h3>Image: <span> {{ imageNumber}} </span><br>
        Presison: {{precision}} <br>
        Recall: {{recall}} <br></h3>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ThresholdAdjustment',
    props: {
      thresholdData: {
        type: Object,
      }
    },

    data() {
      return {
        slider: 0,
        imageNumber: 0,
        precision: 0,
        recall: 0
        // imageNumber: this.thresholdData.image,
        // precision: this.thresholdData.precision,
        // recall: this.thresholdData.recall
        // precision: 0,
        // recall: 0
      }
    },

    created() {
      console.log(this.thresholdData)
      this.imageNumber = this.thresholdData.image
      this.precision = this.thresholdData.precision
      this.recall = this.thresholdData.recall
    },
    methods: {
      ThresholdChange() {
        let val = this.slider
        this.$emit('threshold-change', {
          result: val
        })
      }
    },
    watch: {
      slider() {
        this.precision = this.precision - this.slider * 20
        this.recall = this.recall + this.slider * 5
      }
    },
    // computed: {
    //   precision() {
    //     let precision = this.thresholdData.precision
    //     if (this.slider !== 0) {
    //       return precision - this.slider * 20
    //     } else {
    //       return precision
    //     }
    //   },
    //   recall() {
    //     let recall = this.thresholdData.recall
    //     if (this.slider !== 0) {
    //       return recall + this.slider * 5
    //     } else {
    //       return recall
    //     }
    //   }
    // }
  }

</script>

<style scoped>
  ul li {
    list-style-type: none;
  }

</style>
