export default {
  namespaced: true,
  state: () => ({
    project: {
      excerpt:
        'Saas tool that helps online sellers automate shipping: get shipping quotes, make shipping labels and fulfill orders',
      description: ['a longer text describing what you did for that project'],
      logoClass: `shipandco-logo`,
      backgroundClass: `shipandco-background`,
      type: 'project',
      item_title: 'A long title for the project description', // will not overwrite the homepage short title
      role: 'Full Stack * Optimizations/ Add new Features',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
