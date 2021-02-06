export default {
  namespaced: true,
  state: () => ({
    frontEnd: ['React', 'Vuejs'],
    backEnd: ['express'],
    other: [],
  }),
  getters: {
    getAllTools: state => {
      return [...state.frontEnd, ...state.backEnd, ...state.other];
    },
  },
};
