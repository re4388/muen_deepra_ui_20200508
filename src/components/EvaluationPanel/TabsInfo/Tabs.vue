<template>
  <div class="d-flex flex-column">
    <!-- tabs -->
    <ul class="d-flex flex-row breadcrumb">
      <li v-for="tab in tabs" :key="tab.id">
        <a href="#" 
          @click.prevent="changeView(tab)"
        >
          {{ tab.name }}
        </a>
      </li>
    </ul>
    <!-- individual tab component -->
    <Tab v-for="tab in tabs"
        :key="tab.id" 
        :tab-info="tab" 
        :name="tab.name" 
        :current-view="currentView"
        class="currentView">
      
      <!-- render individual tab name -->
      <h3 class="text-left ml-2">{{ tab.name }}</h3>

      <!-- render MetricsDisplay component -->
      <MetricsDisplay 
      :metrics-data=" tab.metrics">
      </MetricsDisplay>

      <!-- render GraphDisplay component -->
      <div class="mb-5 row">
        <div class="col-md-6">
          <GraphDisplay 
          :graph-data="tab.grpah" 
          :new-value="newThreshold"
          class="newThreshold"
          >
          </GraphDisplay>
        </div>
      
      <!-- ThresholdAdjustment component -->
        <div class="col-md-6">
          <ThresholdAdjustment 
          :threshold-data="tab.threshold" 
          @threshold-change="ThresholdChange">
          </ThresholdAdjustment>
        </div>
      </div>
    </Tab>
  </div>
</template>

<script>
  // import the fake data 
  import tabData from './Tab-data.json'

  // import components
  import Tab from './Tab'
  import MetricsDisplay from '../InfoDisplay/MetricsDisplay'
  import GraphDisplay from '../InfoDisplay/GraphDisplay'
  import ThresholdAdjustment from '../InfoDisplay/ThresholdAdjustment'

  export default {
    name: 'Tabs',
    data() {
      return {
        tabs: tabData.content,
        views: [], // e.g. => [ 'AllTabInfo','Tab-1info','Tab-2info','Tab-3info','Tab-4info' ]
        currentView: '',
        newThreshold:'',
      }
    },
    mounted() {
      this.getView()
      this.currentView = this.views[0]
    },
    methods: {
      getView() {
        this.views = this.tabs.map(key => {
          return key.name
        })
      },
      changeView(obj) {
        this.currentView = obj.name
      },
      ThresholdChange(obj){
        this.newThreshold = obj.result
        // console.log(typeof(this.newThreshold))
      }
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
