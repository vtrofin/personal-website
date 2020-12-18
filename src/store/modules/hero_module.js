export default {
  namespaced: true,
  state: () => ({
    writeMode: false,
    bashHistory: [],
    currentLine: '',
  }),
  getters: {
    getBashHistory: state => {
      return state.bashHistory;
    },
    isWriteMode: state => {
      return state.writeMode;
    },
    getCurrentLine: state => {
      return state.currentLine;
    },
  },
  mutations: {
    append(state, payload) {
      const { char, charCode } = payload;
      if (char) {
        state.currentLine += char;
      } else {
        state.currentLine += String.fromCharCode(charCode);
      }
    },
    pushToHistory(state) {
      const current = state.currentLine;
      state.bashHistory = [...state.bashHistory, current];
      state.currentLine = '';
    },
    removeCharacter(state) {
      const line = state.currentLine;
      if (line.length) {
        state.currentLine = line.substring(0, line.length - 1);
      }
    },
  },
  actions: {
    appendChar(context, payload) {
      const { commit } = context;
      commit('append', payload);
    },
    pushLine({ commit }) {
      commit('pushToHistory');
    },
    removeChar({ commit }) {
      commit('removeCharacter');
    },
  },
};
