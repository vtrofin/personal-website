import type { Module } from "vuex";
import type { ProjectState, RootState } from "@store/modules/module_types";

const atsModule: Module<ProjectState, RootState> = {
  namespaced: true,
  state: () => ({
    project: {
      type: "project",
      backgroundClass: `ats-background`,
      excerpt:
        "Applicant tracking system for handling job applications and hiring",
      item_title: "Bluum Hire",
      role: "Full-stack web engineer",
    },
  }),
  getters: {
    getProject: (state: ProjectState) => {
      return state.project;
    },
  },
};

export default atsModule;
