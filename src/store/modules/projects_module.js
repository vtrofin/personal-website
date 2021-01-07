import shipandcoModule from './shipandco_module';
import stockandcoModule from './stockandco_module';

export default {
  state: () => ({
    projects: ['shipandco', 'stockandco', 'staff', 'utils', 'shopify']
  }),
  namespaced: true,
  modules: {
    shipandco: shipandcoModule,
    stockandco: stockandcoModule
  },
  getters: {
    getAllProjects: state => {
      return state.projects;
    }
  }
};
