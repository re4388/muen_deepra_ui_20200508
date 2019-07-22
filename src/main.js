import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.config.productionTip = false

// Chart.js
import 'chart.js'
import 'vue-chartjs'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faFolder)
library.add(faCube)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Bootstrap
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'

// VueTippy
import VueTippy, {
  VueComponent
} from 'vue-tippy'
Vue.use(VueTippy)


// BootstrapVue
import BoostrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BoostrapVue)

// Routing
import BasePanel from './components/BasePanel.vue'
import ProjectOverviewPanel from './components/ProjectPanel/ProjectOverviewPanel.vue'
import ModelOverviewPanel from './components/ModelPanel/ModelOverviewPanel.vue'
import DataImportPanel from './components/DataImportPanel/DataImportPanel.vue'
import TrainingPanel from './components/TrainingPanel/TrainingPanel.vue'
import ViewerOverviewPanel from './components/ViewerPanel/ViewerOverviewPanel.vue'
import EvaluationPanel from './components/EvaluationPanel/EvaluationPanel.vue'
import ProjectProfile from './components/ProjectPanel/ProjectProfile.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Base',
      component: BasePanel
    },
    {
      path: '/project-overview',
      name: 'ProjectOverview',
      component: ProjectOverviewPanel
    },
    {
      path: '/model-overview',
      name: 'ModelOverview',
      component: ModelOverviewPanel
    },
    {
      path: '/import-data',
      name: 'ImportData',
      component: DataImportPanel
    },
    {
      path: '/training',
      name: 'Training',
      component: TrainingPanel
    },
    {
      path: '/viewer-overview',
      name: 'ViewerOverview',
      component: ViewerOverviewPanel
    },
    {
      path: '/evaluation',
      name: 'Evaluate',
      component: EvaluationPanel
    },
    {
      path: '/project-profile',
      name: 'ProjectProfile',
      component: ProjectProfile
    }
  ]
})

import App from './App.vue'
import store from './store'
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
