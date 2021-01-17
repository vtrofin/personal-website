export default {
  namespaced: true,
  state: () => ({
    companies: [
      {
        project: 'bertrandandco',
        type: 'work',
        item_title: 'Cocos - i work at Bento&co',
        excerpt: 'I did some work here ',
        description: ['Here i describe how i gambatted myself'],
        // logoClass: `bentoandco-logo`,
        // backgroundClass: `bentoandco-background`,
        path: 'https://bertrandco.com/',
      },
      {
        project: 'smoothjapan',
        type: 'work',
        item_title: 'Ananas - i work at Bento&co',
        excerpt: 'I did a little bit of work here ',
        description: ['Here i describe the hard work i did.. A..zas'],
        // logoClass: `smoothjapan-logo`,
        // backgroundClass: `smoothjapan-background`,
        path: 'https://twitter.com/smoothjapan',
      },
    ],
  }),
  getters: {
    getAllCompanies: state => {
      return state.companies;
    },
  },
};
