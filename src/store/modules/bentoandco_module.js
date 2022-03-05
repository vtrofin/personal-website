export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      logoClass: `bentoandco-logo`,
      backgroundClass: 'bentoandco-background',
      excerpt: 'Shopify online store selling bento boxes from Kyoto',
      item_title: 'Bento&Co Shopify stores', // will not overwrite the homepage short title
      role: '',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
