export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      backgroundClass: `ats-background`, // TODO: add class to CSS
      excerpt: 'Applicant tracking system for handling job applications and hiring',
      item_title: 'Bluum Hire',
      role: 'Full-stack web engineer',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
