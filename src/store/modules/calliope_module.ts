import type { Module } from "vuex";
import type { ProjectState, RootState } from "@store/modules/module_types";

const calliopeModule: Module<ProjectState, RootState> = {
  namespaced: true,
  state: () => ({
    project: {
      type: "project",
      backgroundClass: `calliope-background`,
      excerpt: "AI powered call center",
      item_title: "Calliope AI",
      role: "Full-stack web engineer",
    },
  }),
  getters: {
    getProject: (state) => {
      return state.project;
    },
  },
};

export default calliopeModule;
