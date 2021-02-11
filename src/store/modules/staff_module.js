export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      excerpt:
        'Internal dashboard to monitor operations in Ship&co. Complete with KPIs, Analytics and Data visualization',
      item_title: 'Staff Dashboard',
      role: 'Full-stack web engineer',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
