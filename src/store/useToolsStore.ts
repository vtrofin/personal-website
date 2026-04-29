import { defineStore } from "pinia";
import type { ToolsModuleState } from "@store/modules/module_types";

export const useToolsStore = defineStore("tools", {
  state: (): ToolsModuleState => ({
    frontEnd: ["React", "Vue.js", "Tailwind CSS", "shadcn/radix UI", "Storybook"],
    backEnd: ["Node.js", "Fastify", "PostgreSQL", "Drizzle ORM", "Prisma", "Redis", "MongoDB", "GraphQL"],
    staticSiteGens: ["Next.js", "React Router v7"],
    other: ["Jest", "Vitest", "Sentry"],
    compiled: ["TypeScript", "ReScript"],
    devops: ["GitHub Actions", "Terraform", "CDK", "SST", "AWS", "Docker"],
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
