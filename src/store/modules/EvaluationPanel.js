import localJson from '@/components/EvaluationPanel/deepra_mnistV2.json';

const state = {
	data: {}   // here we put our data
};

// getters
const getters = {
	labels: (state) => {
		return state.data['labels'];   // we setup some things to access
	}
};

// mutations
const mutations = {
	setData(state, data) {
		state.data = data;     // 2. this SetData will set data into state
	}
};

// actions
const actions = {
	getData({ commit }) {
		commit('setData', localJson);   // 1. commit setup mutation SetData with payload
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
