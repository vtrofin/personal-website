export default {
  namespaced: true,
  state: () => ({
    project: {
      type: "project",
      backgroundClass: `calliope-background`,
      excerpt: "AI powered call center leveraging Amazon Connect",
      item_title: "Calliope AI",
      role: "Full-stack web engineer",
    },
  }),
  getters: {
    getProject: (state) => {
      return state.project;
    },
  },
};
