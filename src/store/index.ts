import { createStore } from "vuex";
import heroModule from "@store/modules/hero_module";
import projectsModule from "@store/modules/projects_module";
import companiesModule from "@store/modules/companies_module";
import toolsModule from "@store/modules/tools_module";
import type { RootState } from "@store/modules/module_types";

// Deprecate for Pinia. Still maintained but not improved. I love the Vue ecosystem.
// Makes it more difficult to keep up to changes that in React.
// https://www.npmjs.com/package/vuex
const store = createStore<RootState>({
  state: () => ({
    isMobile: false,
    isAndroid: false,
    isToolboxActive: false,
    windowWidth: 0,
  }),
  modules: {
    hero: heroModule,
    projects: projectsModule,
    companies: companiesModule,
    tools: toolsModule,
  },
  getters: {
    checkMobile: (state) => {
      return { isMobile: state.isMobile, isAndroid: state.isAndroid };
    },
    checkToolBox: (state) => {
      return state.isToolboxActive;
    },
    getInnerWidth: (state) => {
      return state.windowWidth;
    },
  },
  mutations: {
    updateMobileStatus: (state, payload) => {
      const { isMobile, isAndroid } = payload;
      state.isMobile = isMobile;
      if (typeof isAndroid === "boolean") {
        state.isAndroid = isAndroid;
      }
    },
    updateToolBoxState: (state, payload = {}) => {
      if (typeof payload.isToolboxActive !== "boolean") {
        return;
      }
      state.isToolboxActive = payload.isToolboxActive;
    },
    updateWindowWidth: (state, payload) => {
      const { windowWidth } = payload;
      state.windowWidth = windowWidth;
    },
  },
  actions: {
    setMobileDevice: ({ commit }, payload) => {
      commit("updateMobileStatus", payload);
    },
    setToolBoxState: ({ commit }, payload) => {
      commit("updateToolBoxState", payload);
    },
    setWindowWidth: ({ commit }, payload) => {
      commit("updateWindowWidth", payload);
    },
  },
});

export default store;
