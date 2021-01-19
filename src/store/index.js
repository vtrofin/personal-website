import { createStore } from 'vuex';
import heroModule from './modules/hero_module';
import projectsModule from './modules/projects_module';
import companiesModule from './modules/companies_module';

const store = createStore({
  state: () => ({
    isMobile: false,
    isToolboxActive: false
  }),
  modules: {
    hero: heroModule,
    projects: projectsModule,
    companies: companiesModule
  },
  getters: {
    checkMobile: state => {
      return state.isMobile;
    },
    checkToolBox: state => {
      return state.isToolboxActive;
    }
  },
  mutations: {
    updateMobileStatus: (state, payload) => {
      const { isMobile } = payload;
      state.isMobile = isMobile;
    },
    updateToolBoxState: (state, payload = {}) => {
      if (typeof payload.isToolboxActive !== 'boolean') {
        return;
      }
      state.isToolboxActive = payload.isToolboxActive;
    }
  },
  actions: {
    setMobileDevice: ({ commit }, payload) => {
      commit('updateMobileStatus', payload);
    },
    setToolBoxState: ({ commit }, payload) => {
      commit('updateToolBoxState', payload);
    }
  }
});

export default store;
