<template>
  <div class="container m-0">

  
      <b-list-group>
  <b-list-group-item variant="dark"> <form class="range-field">
        <label for>Score threshold</label>
        <div> 
          <input
          type="range"
          min="0"
          max="5"
          step="1"
          v-model.lazy.number="slider"
          @change="ThresholdChange"
        />
        <p class="slider">{{ slider }}</p>
        </div>
    
        
      </form></b-list-group-item>
  <b-list-group-item  variant="dark">Total images: {{ imageNumber }}</b-list-group-item>
  <b-list-group-item  variant="dark">Precision : {{ precision }}</b-list-group-item>
  <b-list-group-item  variant="dark">Recall: {{ recall }}</b-list-group-item>
</b-list-group>
      <!-- <div>
        <b-table class="align-left" small hover :items="myProvider" stacked Outlined ></b-table>
      </div> -->
    
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
    console.log(this.graphData["x"]);
  },
  methods: {
    myProvider(ctx) {
      let items = [{
          "Total images": this.imageNumber,
          Precision: this.precision,
          Recall: this.recall,
        }];

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
      return this.graphData["x"][this.slider] * 100 + "%";
    },
    recall() {
      return this.graphData["y"][this.slider] * 100 + "%";
    }
  }
};
</script>

<style scoped>
ul li {
  list-style-type: none;
}
</style>
