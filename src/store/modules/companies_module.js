export default {
  namespaced: true,
  state: () => ({
    companies: [
      {
        project: 'bertrandco',
        type: 'work',
        item_title: '',
        excerpt:
          'Working as a full-stack web engineer to build features that vastly improve shipping and logistics ',
        path: 'https://bertrandco.com/',
        ariaLabel: 'View Bertrand Co website',
      },
      {
        project: 'smoothjapan',
        type: 'work',
        item_title: '',
        excerpt: 'Started my professional career by doing markup for Wordpress websites',
        path: 'https://twitter.com/smoothjapan',
        ariaLabel: 'View Smooth Japan twitter profile.',
      },
    ],
  }),
  getters: {
    getAllCompanies: state => {
      return state.companies;
    },
  },
};
