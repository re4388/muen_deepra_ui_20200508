<template>
  <div class="container m-0">
    <b-list-group  class="rounded-pill">
      <b-list-group-item class="list-group text-light text-left">
          <div>
            <p style="display:inline" class="pr-3">Score threshold</p>
            <input
            class="mt-1"
            type="range"
            min="1"
            :max="step"
            step=1
            v-model.lazy.number="slider2"
            @change="ThresholdChange"
            />
          </div>
      </b-list-group-item>
      <b-list-group-item class="list-group text-light text-left">Threshold : {{ threshold }}</b-list-group-item>
      <b-list-group-item class="list-group text-light text-left">Precision : {{ precision }}</b-list-group-item>
      <b-list-group-item class="list-group text-light text-left" >Recall: {{ recall }}</b-list-group-item> 
      <b-list-group-item class="list-group text-light text-left">Total images: {{ totalImages }} </b-list-group-item> 

    </b-list-group>   
  </div>
</template>

<script>
export default {
  name: "ThresholdAdjustment",
  props: {
    thresholdData: {
      type: Object
    },
    graphData: {
      type: Object
    }
  },

  data() {
    return {
      slider: 0,
      slider2:1,
      // TODO: still need to connect to backend data
      totalImages:this.graphData["image"],
      step: this.graphData["dataColumn"][0].length - 1  //elt 0 is threshold string 
      // imageNumber: this.graphData["image"]
    };
  },

  created() {
    
    // console.log(this.graphData["dataColumn"][0]);
  },
  methods: {
    myProvider(ctx) {
      let items = [
        {
          "Total images": this.imageNumber,
          Precision: this.precision,
          Recall: this.recall
        }
      ];

      return items || [];
    },
    ThresholdChange() {
      let val = this.slider2;
      this.$emit("threshold-change", {
        result: val
      });
    }
  },
  computed: {
    threshold() {
    return this.graphData["dataColumn"][0][this.slider2].toFixed(2)
    },
    precision() {
    return this.graphData["dataColumn"][1][this.slider2].toFixed(2)
    },
    recall() {
    return this.graphData["dataColumn"][2][this.slider2].toFixed(2)
    }
  }
};
</script>

<style scoped>

.list-group {
  background-color: #696969;
}

ul li {
  list-style-type: none;
}
</style>
