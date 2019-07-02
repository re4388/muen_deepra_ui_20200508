<template>

  <div class="px-2 ">
    <ul class="breadcrumb">
      <li><a href="#" @click="getLabelAll">All labels</a></li>
      <li><a href="#" @click="getLabel1">Label 1</a></li>
      <li><a href="#" @click="getLabel2">Label 2</a></li>
      <li><a href="#" @click="getLabel3">Label 3</a></li>

    </ul>
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
          <td v-for="(value,key) in label" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
    <p class="table-anotation text-left">We use test dataset to evaluate the model. This table shows sensitivity ,
      specificity, precision, F1 score, AUC.
      F1 score : 2*Precision*Sensitivity/(Precision Sensitivity). AUC: Area under ROC curve
    </p>
  </div>
</template>

<script>
  export default {
    name: 'MetricDisplay',
    data() {
      return {
        label: {
          Sensitivity: null,
          Specificity: null,
          Precision: null,
          F1score: null,
          AUC: null,
        }
      }
    },
    created() {

      this.label = dataFromServer.labelAll

    },
    methods: {
      getLabelAll() {
        this.label = dataFromServer.labelAll
      },
      getLabel1() {
        this.label = dataFromServer.label1
      },
      getLabel2() {
        this.label = dataFromServer.label2
      },
      getLabel3() {
        this.label = dataFromServer.label3
      }
    },
  }




  let dataFromServer = {
    labelAll: {
      Sensitivity: '99.2%±0.02',
      Specificity: '94.3%±0.02',
      Precision: '91.8%±0.02',
      F1score: '0.854±0.02',
      AUC: '0.938±0.02',
    },
    label1: {
      Sensitivity: '12.3%±0.02',
      Specificity: '14.3%±0.02',
      Precision: '11.8%±0.02',
      F1score: '1.854±0.02',
      AUC: '1.938±0.02',
    },
    label2: {
      Sensitivity: '22.3%±0.02',
      Specificity: '24.3%±0.02',
      Precision: '21.8%±0.02',
      F1score: '2.854±0.02',
      AUC: '2.328±0.02',
    },
    label3: {
      Sensitivity: '32.3%±0.02',
      Specificity: '34.3%±0.02',
      Precision: '31.8%±0.02',
      F1score: '3.854±0.02',
      AUC: '3.938±0.02',
    },
  }

</script>

<style scoped>

  .table-anotation{
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
