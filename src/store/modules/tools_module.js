export default {
  namespaced: true,
  state: () => ({
    frontEnd: ['React', 'Vue.js', 'CSS', 'Tailwind'],
    backEnd: ['Fastify', 'Express'],
    staticSiteGens: ['Next.js', 'Gatsby'],
    other: ['GraphQL', 'MongoDB', 'SQL', 'Prisma', 'SwiftUI'],
    compiled: ['TypeScript', 'ReScript'],
  }),
  getters: {
    getAllTools: state => {
      return [
        ...state.frontEnd,
        ...state.compiled,
        ...state.staticSiteGens,
        ...state.backEnd,
        ...state.other,
      ];
    },
  },
};
