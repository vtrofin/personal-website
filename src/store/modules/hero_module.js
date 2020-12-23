export default {
  namespaced: true,
  state: () => ({
    bashHistory: [],
    staticText: 'Victors-MBP:~ victor$',
  }),
  getters: {
    getBashHistory: state => {
      return state.bashHistory;
    },
    getStaticText: state => {
      return state.staticText;
    },
  },
  mutations: {
    pushToHistory(state, payload) {
      const { text } = payload;
      state.bashHistory = [...state.bashHistory, text];
    },
  },
  actions: {
    pushLine({ commit }, payload) {
      commit('pushToHistory', payload);
    },
  },
};
