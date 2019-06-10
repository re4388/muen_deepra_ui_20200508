import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.config.productionTip = false

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

// Routing
import BasePanel from './components/BasePanel.vue'
import ProjectOverviewPanel from './components/ProjectPanel/ProjectOverviewPanel.vue'
import ModelOverviewPanel from './components/ModelPanel/ModelOverviewPanel.vue'

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
    }
  ]
})

import App from './App.vue'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
