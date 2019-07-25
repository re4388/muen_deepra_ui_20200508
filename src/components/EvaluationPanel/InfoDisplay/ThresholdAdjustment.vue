<template>
  <div class="container m-0">
    <b-list-group  class="rounded-pill">
      <b-list-group-item class="list-group text-light text-left">
        <!-- <form class="range-field"> -->
          <!-- <label for>Score threshold</label> -->
          <div>
            <p style="display:inline" class="pr-3">Score threshold   </p>
            <input
            class="mt-1"
            type="range"
            min="0"
            max="1"
            step="0.2"
            v-model.lazy.number="slider"
            @change="ThresholdChange"
            />
            <p class="slider p-5" style=" display:inline">{{ slider }}</p>
          </div>
        <!-- </form> -->
      </b-list-group-item>
      <b-list-group-item class="list-group text-light text-left">Total images: {{ imageNumber }}</b-list-group-item>
      <b-list-group-item class="list-group text-light text-left">Precision : {{ precision }}</b-list-group-item>
      <b-list-group-item class="list-group text-light text-left" >Recall: {{ recall }}</b-list-group-item>
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
      ype: Object
    }
  },

  data() {
    return {
      slider: 0,
      imageNumber: this.graphData["image"]
    };
  },

  created() {
    // console.log(this.graphData["x"]);
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
      let val = this.slider;
      this.$emit("threshold-change", {
        result: val
      });
    }
  },
  computed: {
    precision() {
      return this.graphData["precision"][this.slider * 5] * 100 + "%";
    },
    recall() {
      return this.graphData["recall"][this.slider * 5] * 100 + "%";
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
