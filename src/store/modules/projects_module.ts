import shipandcoModule from "@store/modules/shipandco_module";
import stockandcoModule from "@store/modules/stockandco_module";
import staffModule from "@store/modules/staff_module";
import utilsModule from "@store/modules/utils_module";
import bentoandcoModule from "@store/modules/bentoandco_module";
import atsModule from "@store/modules/ats_module";
import calliopeModule from "@store/modules/calliope_module";
import type { Module } from "vuex";
import type {
  ProjectsModuleState,
  RootState,
} from "@store/modules/module_types";
import { allProjects } from "src/globals";
const projectsModule: Module<ProjectsModuleState, RootState> = {
  state: () => ({
    projects: allProjects,
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
