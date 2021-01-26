export default {
  namespaced: true,
  state: () => ({
    project: {
      excerpt:
        'Some random text about this project. Nobody likes to wait… but you can make it less of a pain. I have created. An open-source collection of loading spinners animated with CSS.',
      description: ['a longer text describing what you did for that project'],
      logoClass: `bentoandco-logo`,
      backgroundClass: 'bentoandco-background',
      type: 'project',
      item_title: 'A long title for the project description', // will not overwrite the homepage short title
      role: 'Front-End bug fixes and enhancements'
    }
  }),
  getters: {
    getProject: state => {
      return state.project;
    }
  }
};
