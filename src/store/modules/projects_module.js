import shipandcoModule from './shipandco_module';
import stockandcoModule from './stockandco_module';
import staffModule from './staff_module';
import utilsModule from './utils_module';
import bentoandcoModule from './bentoandco_module';

export default {
  state: () => ({
    projects: ['shipandco', 'stockandco', 'staff', 'utils', 'bentoandco']
  }),
  namespaced: true,
  modules: {
    shipandco: shipandcoModule,
    stockandco: stockandcoModule,
    staff: staffModule,
    utils: utilsModule,
    bentoandco: bentoandcoModule
  },
  getters: {
    getAllProjects: state => {
      return state.projects;
    }
  }
};
