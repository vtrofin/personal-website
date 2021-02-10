export default {
  namespaced: true,
  state: () => ({
    project: {
      type: 'project',
      logoClass: `shipandco-logo`,
      backgroundClass: `shipandco-background`,
      excerpt: 'Shipping management solution for eCommerce',
      // 'SaaS tool that helps online sellers automate shipping: get shipping quotes, make shipping labels and fulfill orders',
      item_title: 'Ship&Co',
      role: 'Full-stack web engineer',
    },
  }),
  getters: {
    getProject: state => {
      return state.project;
    },
  },
};
