import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.config.productionTip = false;

// Chart.js
import 'chart.js';
import 'vue-chartjs';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder, faCube } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faFolder);
library.add(faCube);
Vue.component('font-awesome-icon', FontAwesomeIcon);


// VueTippy
import VueTippy, { VueComponent } from 'vue-tippy';
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
import BasePanel from './components/BasePanel.vue';
import ProjectOverviewPanel from './components/ProjectPanel/ProjectOverviewPanel.vue';
import ModelOverviewPanel from './components/ModelPanel/ModelOverviewPanel.vue';
import DataImportPanel from './components/DataImportPanel/DataImportPanel.vue';
import TrainingPanel from './components/TrainingPanel/TrainingPanel.vue';
import ViewerOverviewPanel from './components/ViewerPanel/ViewerOverviewPanel.vue';
import EvaluationPanel from './components/EvaluationPanel/EvaluationPanel.vue';
import ProjectProfile from './components/ProjectPanel/ProjectProfile.vue';
import ModelProfile from './components/ModelPanel/ModelProfile.vue';

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
		},
		{
			path: '/model-profile',
			name: 'ModelProfile',
			component: ModelProfile
		},
		{
			path: '/testing',
			name: 'Test',
			component: null
		}
	]
});

import App from './App.vue';
import store from './store';
new Vue({
	el: '#app',
	store,
	router,
	render: (h) => h(App)
});
