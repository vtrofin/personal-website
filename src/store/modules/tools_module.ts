import type { Module } from "vuex";
import type { ToolsModuleState, RootState } from "@store/modules/module_types";

const toolsModule: Module<ToolsModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    frontEnd: ["React", "Vue.js", "Tailwind CSS"],
    backEnd: ["Nodejs", "Fastify", "Express"],
    staticSiteGens: ["Next.js"],
    other: ["GraphQL", "MongoDB", "PostgreSQL", "Prisma"], // "SwiftUI"
    compiled: ["TypeScript", "ReScript"],
    devops: ["Github Actions", "CircleCI", "Terraform", "AWS", "Docker"],
  }),
  getters: {
    getAllTools: (state) => {
      return [
        ...state.frontEnd,
        ...state.compiled,
        ...state.staticSiteGens,
        ...state.backEnd,
        ...state.other,
        ...state.devops,
      ];
    },
  },
};

export default toolsModule;
