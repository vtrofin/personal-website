export default {
  state: () => ({
    companies: ['bentoandco', 'smoothJapan']
  }),
  namespaced: true,
  modules: {},
  getters: {
    getAllCompanies: state => {
      return state.companies;
    }
  }
};
