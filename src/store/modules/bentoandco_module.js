export default {
  namespaced: true,
  state: () => ({
    project: {
      excerpt:
        'Shopify online store selling bento boxes, from Kyoto. The main reason why Ship&co exists today',
      description: ['a longer text describing what you did for that project'],
      logoClass: `bentoandco-logo`,
      backgroundClass: 'bentoandco-background',
      type: 'project',
      item_title: 'A long title for the project description', // will not overwrite the homepage short title
      role: 'Front-End bug fixes and enhancements',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
