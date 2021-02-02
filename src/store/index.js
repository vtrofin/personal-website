import { createStore } from 'vuex';
import heroModule from './modules/hero_module';
import projectsModule from './modules/projects_module';
import companiesModule from './modules/companies_module';

const store = createStore({
  state: () => ({
    isMobile: false,
    isAndroid: false,
    isToolboxActive: false,
    windowWidth: 0
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
    },
    getInnerWidth: state => {
      return state.windowWidth;
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
    },
    updateWindowWidth: (state, payload) => {
      const { windowWidth } = payload;
      state.windowWidth = windowWidth;
    }
  },
  actions: {
    setMobileDevice: ({ commit }, payload) => {
      commit('updateMobileStatus', payload);
    },
    setToolBoxState: ({ commit }, payload) => {
      commit('updateToolBoxState', payload);
    },
    setWindowWidth: ({ commit }, payload) => {
      commit('updateWindowWidth', payload);
    }
  }
});

export default store;
