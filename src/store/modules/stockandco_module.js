export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      logoClass: `stockandco-logo`,
      backgroundClass: `stockandco-background`,
      excerpt: 'Shopify app to sync inventory levels in real time across multiple Shopify stores',
      item_title: 'Stock&Co',
      role: 'Full-stack web engineer',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
