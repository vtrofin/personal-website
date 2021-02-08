export default {
  namespaced: true,
  state: () => ({
    project: {
      excerpt:
        'Internal dashboard to monitor operations in Ship&co. Complete with KPIs, Analytics and Data visualization',
      description: ['a longer text describing what you did for that project'],
      // logoClass: `shipandco-logo`,
      // backgroundClass: `shipandco-background`,
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
