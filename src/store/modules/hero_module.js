export default {
  namespaced: true,
  state: () => ({
    bashHistory: [],
    staticText: "$",
    coordinates: {
      x: null,
      y: null,
    },
    animationTextLines: [
      "$ whoami",
      "I shape ideas into practical software focusing on accessibility and performance.",
      "I follow industry-recognized best practices.",
      "My tech stack: ReScript, TypeScript and Node.js.",
      "Proficient with Swift UI.",
      "Learning Rust and iOS development in my spare time.",
      "I'm doing my best work when closely collaborating with clients, designers and other web engineers.",
      // `I'm excited about the intersection of code and math, looking to complement my coding skills with knowledge of machine learning.`,
      `Open to full-time offers in Japan. Available to take on freelance opportunities worldwide.`,
    ],
  }),
  getters: {
    getBashHistory: (state) => {
      return state.bashHistory;
    },
    getStaticText: (state) => {
      return state.staticText;
    },
    getCoordinates: (state) => {
      return state.coordinates;
    },
    getAnimationText: (state) => {
      return state.animationTextLines;
    },
  },
  mutations: {
    pushToHistory(state, payload) {
      const { text } = payload;
      state.bashHistory = [...state.bashHistory, text];
    },
    updateCoords(state, payload) {
      const { x, y } = payload;
      state.coordinates = {
        x: !!x || x === 0 ? x : state.coordinates.x,
        y: !!y || y === 0 ? y : state.coordinates.y,
      };
    },
  },
  actions: {
    pushLine({ commit }, payload) {
      commit("pushToHistory", payload);
    },
    updateCoordinates({ commit }, payload) {
      commit("updateCoords", payload);
    },
  },
};
