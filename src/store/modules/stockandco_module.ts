import type { Module } from "vuex";
import type { ProjectState, RootState } from "@store/modules/module_types";

const stockandcoModule: Module<ProjectState, RootState> = {
  namespaced: true,
  state: () => ({
    project: {
      type: "project",
      logoClass: `stockandco-logo`,
      backgroundClass: `stockandco-background`,
      excerpt: "Sync inventory in real time across multiple Shopify stores",
      item_title: "Stock&Co",
      role: "Full-stack web engineer",
    },
  }),
  getters: {
    getProject: (state) => {
      return state.project;
    },
  },
};

export default stockandcoModule;
