export default {
  namespaced: true,
  state: () => ({
    frontEnd: ['React', 'Vue.js', 'Handlebars', 'CSS'],
    backEnd: ['Express', 'Fastify', 'Meteor', 'Feathers JS', 'Vercel serverless'],
    staticSiteGens: ['Gatsby', 'Next.js'],
    other: ['GraphQL', 'MongoDB', 'SQL'],
  }),
  getters: {
    getAllTools: state => {
      return [...state.frontEnd, ...state.staticSiteGens, ...state.backEnd, ...state.other];
    },
  },
};
