<template>
  <div>
    <div class="mt-5">
      <form class="range-field my-1 w-40">
        <label for="">Threshold Value</label> <br>
        <input type="range" min="0" max="1" step="0.1" v-model.lazy.number="slider" @change="ThresholdChange" />
      <h2>{{ slider }}</h2>
      </form>
    </div>
    <!-- <ul>
        <li v-for="(val, key) in thresholdData">
          {{ key }}: {{ val }}
        </li>
      </ul> -->

    <div class="pt-5">
      <h2>Image: {{ imageNumber}} <br>
      Presison: {{precision}} <br>
      Recall: {{recall}} <br></h2>
      
    </div>



  </div>
</template>

<script>
  export default {
    name: 'ThresholdAdjustment',
    props: ['thresholdData'],
    data() {
      return {
        slider: 0,
        imageNumber: this.thresholdData.image,
        precision: this.thresholdData.precision,
        recall: this.thresholdData.recall,
      }
    },
    methods: {
      ThresholdChange() {
        let val = this.slider
        // console.log(val)
        this.$emit('threshold-change', {
          result: val
        })
      }
    },
    watch:{
      slider(){
        this.precision = Math.round(this.precision - this.slider)
        this.recall = Math.round(this.recall + this.slider )
        
      }
    }
  }

</script>

<style scoped>
  ul li {
    list-style-type: none;
  }

</style>
