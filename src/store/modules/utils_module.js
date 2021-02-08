export default {
  namespaced: true,
  state: () => ({
    project: {
      excerpt:
        'A set of developer tools to create test data for development shops: customers, products and orders',
      description: ['a longer text describing what you did for that project'],
      type: 'project',
      item_title: 'A long title for the project description', // will not overwrite the homepage short title
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
