import shipandcoModule from "@store/modules/shipandco_module";
import stockandcoModule from "@store/modules/stockandco_module";
import staffModule from "@store/modules/staff_module";
import utilsModule from "@store/modules/utils_module";
import bentoandcoModule from "@store/modules/bentoandco_module";
import atsModule from "@store/modules/ats_module";
import calliopeModule from "@store/modules/calliope_module";
import type { Module } from "vuex";
import type {
  ProjectsRootState,
  ProjectsState,
} from "@store/modules/module_types";

const projectsModule: Module<ProjectsState, ProjectsRootState> = {
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

export default projectsModule;
