<template>

  <div class="px-2 ">
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
          <td v-for="(value, key) in metricsData" :key="key"> {{ value }} </td>
        </tr>
      </tbody>
    </table>
    <p class="table-anotation text-left">
      We use test dataset to evaluate the model.This table shows sensitivity ,specificity, precision, F1 score, AUC. F1
      score : 2*Precision*Sensitivity/(Precision Sensitivity). AUC: Area under ROC curve
    </p>
  </div>
</template>

<script>
  export default {
    name: 'MetricDisplay',
    props: ['metricsData']

  }

</script>

<style scoped>
  .table-anotation {
    font-size: 12px;
  }

  ul.breadcrumb {
    padding: 1px 10px;
    list-style: none;
    background-color: rgb(128, 128, 128);
  }

  ul.breadcrumb li {
    display: inline;
    font-size: 15px;
  }

  ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
  }

  ul.breadcrumb li a {
    color: #000508;
    text-decoration: none;
  }

  ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
  }

</style>
