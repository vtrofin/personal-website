export default {
  namespaced: true,
  state: () => ({
    companies: [
      {
        project: 'bertrandandco',
        type: 'work',
        item_title: 'Cocos - i work at Bento&co',
        excerpt: 'I did some work here ',
        // logoClass: `bentoandco-logo`,
        // backgroundClass: `bentoandco-background`,
        path: 'https://bertrandco.com/',
        ariaLabel: 'View Bertrand&co website',
      },
      {
        project: 'smoothjapan',
        type: 'work',
        item_title: 'Ananas - i work at Bento&co',
        excerpt: 'I did a little bit of work here ',
        // logoClass: `smoothjapan-logo`,
        // backgroundClass: `smoothjapan-background`,
        path: 'https://twitter.com/smoothjapan',
        ariaLabel: 'Smooth Japan has been shut down.',
      },
    ],
  }),
  getters: {
    getAllCompanies: state => {
      return state.companies;
    },
  },
};
