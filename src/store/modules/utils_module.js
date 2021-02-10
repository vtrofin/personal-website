export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      excerpt:
        'A set of developer tools to create test data for development shops: customers, products and orders',
      item_title: 'Ship&Co Utils',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
