import shipandcoModule from './shipandco_module';

export default {
  state: () => ({
    projects: ['shipandco', 'stockandco', 'staff', 'utils', 'shopify']
  }),
  namespaced: true,
  modules: {
    shipandco: shipandcoModule
  },
  getters: {
    getAllProjects: state => {
      return state.projects;
    }
  }
};
