<template>

  <div class="px-2">
    <table class="table table-bordered table-sm mb-1">
      <thead class="thead-dark">
        <tr>
          <th>Sensitivity</th>
          <th>Specificity</th>
          <th>Precision</th>
          <th>F1 score</th>
          <th>AUC</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td text-light" v-for="(value, key) in metricsData" 
          :key="key"> {{ value | numberFormater }} </td>
        </tr>
      </tbody>
    </table>
    <p class="table-anotation text-left">
      {{ anotationText }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'MetricDisplay',
    props: {
      metricsData:{
        type:Object
      }
    },
    data(){
      return {
        anotationText:`
        We use test dataset to evaluate the model.
        This table shows sensitivity ,specificity, precision, F1 score, AUC. F1
        score : 2*Precision*Sensitivity/(Precision Sensitivity). AUC: Area under ROC curve
        `
      }
    },
    filters:{
      numberFormater(val){
        return parseFloat(val).toFixed(4) * 100 + ' %'
      }
    },

  //   filters: {
  // capitalize: function (value) {
  //   if (!value) return ''
  //   value = value.toString()
  //   return value.charAt(0).toUpperCase() + value.slice(1)
  // }
}

  

</script>

<style scoped>
  .table-anotation {
    font-size: 14px;
  }
</style>
