export default {
  namespaced: true,
  state: () => ({
    bashHistory: [],
    staticText: 'Victors-MBP:~ victor$',
    coordinates: {
      x: null,
      y: null,
    },
  }),
  getters: {
    getBashHistory: state => {
      return state.bashHistory;
    },
    getStaticText: state => {
      return state.staticText;
    },
    getCoordinates: state => {
      return state.coordinates;
    },
  },
  mutations: {
    pushToHistory(state, payload) {
      const { text } = payload;
      state.bashHistory = [...state.bashHistory, text];
    },
    updateCoords(state, payload) {
      const { x, y } = payload;
      state.coordinates = {
        x: !!x || x === 0 ? x : state.coordinates.x,
        y: !!y || y === 0 ? y : state.coordinates.y,
      };
    },
  },
  actions: {
    pushLine({ commit }, payload) {
      commit('pushToHistory', payload);
    },
    updateCoordinates({ commit }, payload) {
      commit('updateCoords', payload);
    },
  },
};
