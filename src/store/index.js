import { createStore } from 'vuex';
import heroModule from './modules/hero_module';
import projectsModule from './modules/projects_module';
import companiesModule from './modules/companies_module';

const store = createStore({
  state: () => ({
    isMobile: false,
    isAndroid: false,
    isToolboxActive: false
  }),
  modules: {
    hero: heroModule,
    projects: projectsModule,
    companies: companiesModule
  },
  getters: {
    checkMobile: state => {
      return { isMobile: state.isMobile, isAndroid: state.isAndroid };
    },
    checkToolBox: state => {
      return state.isToolboxActive;
    }
  },
  mutations: {
    updateMobileStatus: (state, payload) => {
      const { isMobile, isAndroid } = payload;
      state.isMobile = isMobile;
      if (typeof isAndroid === 'boolean') {
        state.isAndroid = isAndroid;
      }
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
