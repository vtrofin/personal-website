export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      excerpt: 'A set of developer tools to create test data',
      item_title: 'Ship&Co Utils',
      role: '',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
