<template>
  <div>
    <div class="m-3">
      <form class="range-field my-1 w-25">
        <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.1" 
        v-model.lazy.number="slider"
        @change="ThresholdChange"
        />
        {{ slider }}
      </form>
      <ul>
        <li v-for="(val, key) in thresholdData">
          {{ key }}: {{ val  }}
        </li>
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
    },
    methods:{
      ThresholdChange(){
        let val = this.slider
        // console.log(val)
        this.$emit('threshold-change',{
          result:val
        })
      }
    }
  }

</script>

<style scoped>
ul li {
  list-style-type:none;
  }

</style>
