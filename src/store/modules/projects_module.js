import shipandcoModule from './shipandco_module';
import stockandcoModule from './stockandco_module';
import staffModule from './staff_module';
import utilsModule from './utils_module';
import shopifyModule from './shopify_module';

export default {
  state: () => ({
    projects: ['shipandco', 'stockandco', 'staff', 'utils', 'shopify']
  }),
  namespaced: true,
  modules: {
    shipandco: shipandcoModule,
    stockandco: stockandcoModule,
    staff: staffModule,
    utils: utilsModule,
    shopify: shopifyModule
  },
  getters: {
    getAllProjects: state => {
      return state.projects;
    }
  }
};
