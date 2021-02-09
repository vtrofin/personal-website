export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      logoClass: `shipandco-logo`,
      backgroundClass: `shipandco-background`,
      excerpt:
        'SaaS tool that helps online sellers automate shipping: get shipping quotes, make shipping labels and fulfill orders',
      item_title: 'A long title for the project description',
      role: 'Full Stack * Optimizations/ Add new Features'
    }
  }),
  getters: {
    getProject: state => {
      return state.project;
    }
  }
};
