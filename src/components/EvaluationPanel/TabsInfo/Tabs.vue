<template>

  <div class="d-flex flex-column">

    <!-- tabs -->
    <ul class="d-flex flex-row breadcrumb">
      <li v-for="tab in data">
        <a href="#" @click.prevent="changeView(tab)">
          {{ tab.name}}
        </a>
      </li>
    </ul>


    <!-- individual tab component -->
    <tab v-for="tab in data" :tab-info="tab" :name="tab.name" :current-view="currentView">

      <h2>{{ tab.name }}</h2>
      <MetricsDisplay :metrics-data=" tab.metrics"></MetricsDisplay>

      <div class="mb-5 row">
        <div class="col-md-6">
          <GraphDisplay :graph-data="tab.grpah"></GraphDisplay>
        </div>
        <div class="col-md-6">
          <ThresholdAdjustment :threshold-data="tab.threshold"></ThresholdAdjustment>
        </div>
      </div>

    </tab>




  </div>
</template>

<script>
  // import the fake data 
  import TabsData from './Tab-data.json'

  // import components
  import Tab from './Tab'
  import MetricsDisplay from '../InfoDisplay/MetricsDisplay'
  import GraphDisplay from '../InfoDisplay/GraphDisplay'
  import ThresholdAdjustment from '../InfoDisplay/ThresholdAdjustment'

  export default {
    name: 'Tabs',
    data() {
      return {
        data: TabsData.content,
        views: [], // e.g. => [ 'AllTabInfo','Tab-1info','Tab-2info','Tab-3info','Tab-4info' ]
        currentView: ''
      }
    },
    mounted() {
      this.getView()
      this.currentView = this.views[0]
    },
    methods: {
      getView() {
        this.views = this.data.map(key => {
          return key.name
        })
      },
      changeView(obj) {
        this.currentView = obj.name
      },
    },
    components: {
      Tab,
      MetricsDisplay,
      GraphDisplay,
      ThresholdAdjustment,
    }
  }

</script>


<style scoped>
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
