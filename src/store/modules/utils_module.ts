import type { Module } from "vuex";
import type {
  ProjectState,
  ProjectsRootState,
} from "@store/modules/module_types";

const utilsModule: Module<ProjectState, ProjectsRootState> = {
  namespaced: true,
  state: () => ({
    project: {
      type: "project",
      excerpt: "A set of developer tools to create test data",
      item_title: "Ship&Co Utils",
      role: "",
    },
  }),
  getters: {
    getProject: (state) => {
      return state.project;
    },
  },
};

export default utilsModule;
