import type { Module } from "vuex";
import type { ProjectState, RootState } from "@store/modules/module_types";

const staffModule: Module<ProjectState, RootState> = {
  namespaced: true,
  state: () => ({
    project: {
      type: "project",
      excerpt: "Internal dashboard to monitor operations in Ship&co",
      item_title: "Staff Dashboard",
      role: "Full-stack web engineer",
    },
  }),
  getters: {
    getProject: (state) => {
      return state.project;
    },
  },
};

export default staffModule;
