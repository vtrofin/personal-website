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
      "I ensure high-quality outcomes by following industry recognized best practices.",
      "My primary tech stack includes TypeScript, Node.js and ReScript.",
      "I have foundational knowledge in Rust and Swift.",
      "I thrive in interdisciplinary teams, bringing out my best work through close collaboration.",
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
