import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.config.productionTip = false;

// Chart.js
import 'chart.js';
import 'vue-chartjs';

// FontAwesome
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faFolder,
  faCube
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';
library.add(faFolder);
library.add(faCube);
Vue.component('font-awesome-icon', FontAwesomeIcon);


// VueTippy
import VueTippy, {
  VueComponent
} from 'vue-tippy';
Vue.use(VueTippy);

// VueZoomer
// NOTE: dependency `parcel-bundler` used by `vue-zoomer` makes distributed
//   electron application unable to launched sucessfully.
//   (ReferenceError: `parcelRequire is not defined`)
//   So that we change the source of `vue-zoomer` from released source in
//   npm modules to cloned source in `src/vendor/vue-zoomer/src`.
import VueZoomer from '@/vendor/vue-zoomer/src';
Vue.use(VueZoomer);

// Bootstrap & BootstrapVue
import './custom.scss'
import BoostrapVue from 'bootstrap-vue';
import 'bootstrap';
Vue.use(BoostrapVue);

// Routing
import BasePanel from './components/BasePanel.vue'
import ProjectOverviewPanel from './components/ProjectPanel/ProjectOverviewPanel.vue'
import ModelOverviewPanel from './components/ModelPanel/ModelOverviewPanel.vue'
import DataImportPanel from './components/DataImportPanel/DataImportPanel.vue'
import TrainingPanel from './components/TrainingPanel/TrainingPanel.vue'
import ViewerOverviewPanel from './components/ViewerPanel/ViewerOverviewPanel.vue'
import EvaluationPanel from './components/EvaluationPanel/EvaluationPanel.vue'
import ProjectProfile from './components/ProjectPanel/ProjectProfile.vue'
import ModelProfile from './components/ModelPanel/ModelProfile.vue'
import TestPanel from './components/TestPanel/TestPanel.vue'

const router = new VueRouter({
  routes: [{
      path: '/',
      name: 'Base',
      component: BasePanel
    },
    {
      path: '/project-overview',
      name: 'ProjectOverview',
      component: ProjectOverviewPanel,
      meta: {
        title: 'Project Overview'
      }
    },
    {
      path: '/model-overview',
      name: 'ModelOverview',
      component: ModelOverviewPanel,
      meta: {
        title: 'Model Overview'
      }
    },
    {
      path: '/import-data',
      name: 'ImportData',
      component: DataImportPanel,
      meta: {
        title: 'Project Overview > Import Data'
      }
    },
    {
      path: '/training',
      name: 'Training',
      component: TrainingPanel,
      meta: {
        title: 'Project Overview > Train'
      }
    },
    {
      path: '/viewer-overview',
      name: 'ViewerOverview',
      component: ViewerOverviewPanel,
      meta: {
        title: 'Viewer'
      }
    },
    {
      path: '/evaluation',
      name: 'Evaluate',
      component: EvaluationPanel,
      meta: {
        title: 'Project Overview > Evaluate'
      }
    },
    {
      path: '/project-profile',
      name: 'ProjectProfile',
      component: ProjectProfile,
      meta: {
        title: 'Project Overview > Profile'
      }
    },
    {
      path: '/model-profile',
      name: 'ModelProfile',
      component: ModelProfile,
      meta: {
        title: 'Model Overview > Profile'
      }
    },
    {
      path: '/testing',
      name: 'Test',
      component: TestPanel,
      meta: {
        title: 'Model Overview > Test'
      }
    }
  ]
})

import App from './App.vue';
import store from './store';
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
});
