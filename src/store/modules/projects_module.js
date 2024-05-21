import shipandcoModule from "./shipandco_module";
import stockandcoModule from "./stockandco_module";
import staffModule from "./staff_module";
import utilsModule from "./utils_module";
import bentoandcoModule from "./bentoandco_module";
import atsModule from "./ats_module";
import calliopeModule from "./calliope_module";

export default {
  state: () => ({
    projects: [
      "calliope",
      "ats",
      "staff",
      "stockandco",
      "shipandco",
      "utils",
      "bentoandco",
    ],
    activeProject: "",
  }),
  namespaced: true,
  modules: {
    ats: atsModule,
    shipandco: shipandcoModule,
    stockandco: stockandcoModule,
    staff: staffModule,
    utils: utilsModule,
    bentoandco: bentoandcoModule,
    calliope: calliopeModule,
  },
  getters: {
    getAllProjects: (state) => {
      return state.projects;
    },
    getActiveProject: (state) => {
      return state.activeProject;
    },
  },
  mutations: {
    setActiveProject: (state, payload) => {
      const { project } = payload;
      state.activeProject = project ? project : "";
    },
  },
  actions: {
    setActiveProject: ({ commit }, payload) => {
      commit("setActiveProject", payload);
    },
  },
};
