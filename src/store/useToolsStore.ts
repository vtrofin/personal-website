import { defineStore } from "pinia";
import type { ToolsModuleState } from "@store/modules/module_types";

export const useToolsStore = defineStore("tools", {
  state: (): ToolsModuleState => ({
    frontEnd: ["React", "Vue.js", "Tailwind CSS"],
    backEnd: ["Nodejs", "Fastify", "Express"],
    staticSiteGens: ["Next.js"],
    other: ["GraphQL", "MongoDB", "PostgreSQL", "Prisma"],
    compiled: ["TypeScript", "ReScript"],
    devops: ["Github Actions", "CircleCI", "Terraform", "AWS", "Docker"],
  }),
  getters: {
    allTools: (state): string[] => [
      ...state.frontEnd,
      ...state.compiled,
      ...state.staticSiteGens,
      ...state.backEnd,
      ...state.other,
      ...state.devops,
    ],
  },
});
