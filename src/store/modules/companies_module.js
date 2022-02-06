export default {
  namespaced: true,
  state: () => ({
    companies: [
      {
        project: 'scoville',
        type: 'work',
        item_title: '',
        excerpt: 'Full-stack web engineer for an applicant tracking system',
        path: 'https://scoville.jp/',
        ariaLabel: "View Scoville's website",
      },
      {
        project: 'bertrandco',
        type: 'work',
        item_title: '',
        excerpt: 'Full-stack web engineer for a shipping management solution',
        path: 'https://bertrandco.com/',
        ariaLabel: 'View Bertrand Co website',
      },
    ],
  }),
  getters: {
    getAllCompanies: state => {
      return state.companies;
    },
  },
};
