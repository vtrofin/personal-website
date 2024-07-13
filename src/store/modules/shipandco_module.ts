import type { Module } from "vuex";
import type { ProjectState, RootState } from "@store/modules/module_types";

const shipandcoModule: Module<ProjectState, RootState> = {
  namespaced: true,
  state: () => ({
    project: {
      type: "project",
      logoClass: `shipandco-logo`,
      backgroundClass: `shipandco-background`,
      excerpt: "Shipping management solution for eCommerce",
      item_title: "Ship&Co",
      role: "Full-stack web engineer",
    },
  }),
  getters: {
    getProject: (state) => {
      return state.project;
    },
  },
};

export default shipandcoModule;
