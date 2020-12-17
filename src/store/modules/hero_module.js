export default {
  namespaced: true,
  state: () => ({
    bashHistory: ['npm run start', 'npm install', 'npm run setup', 'npm run serve'],
  }),
  getters: {
    doneTodos: state => {
      return state.bashHistory.filter(line => !!line);
    },
  },
};
