export default {
  namespaced: true,
  state: () => ({
    project: {
      excerpt:
        'Shopify app that syncs inventory levels across multiple Shopify stores in real time',
      description: ['a longer text describing what you did for that project'],
      logoClass: `stockandco-logo`,
      backgroundClass: `stockandco-background`,
      type: 'project',
      item_title: '', // will not overwrite the homepage short title
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
