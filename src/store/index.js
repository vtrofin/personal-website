import { createStore } from 'vuex';
import heroModule from './modules/hero_module';
import projectsModule from './modules/projects_module';
import companiesModule from './modules/companies_module';

const store = createStore({
  state: () => ({
    isMobile: false
  }),
  modules: {
    hero: heroModule,
    projects: projectsModule,
    companies: companiesModule
  },
  getters: {
    checkMobile: state => {
      return state.isMobile;
    }
  },
  mutations: {
    updateMobileStatus: (state, payload) => {
      const { isMobile } = payload;
      state.isMobile = isMobile;
    }
  },
  actions: {
    setMobileDevice({ commit }, payload) {
      commit('updateMobileStatus', payload);
    }
  }
});

export default store;
