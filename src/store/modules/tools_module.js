export default {
  namespaced: true,
  state: () => ({
    frontEnd: ["React", "Vue.js", "CSS", "Tailwind"],
    backEnd: ["Fastify", "Express"],
    staticSiteGens: ["Next.js", "Gatsby"],
    other: ["GraphQL", "MongoDB", "PostgreSQL", "Prisma", "SwiftUI"],
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
