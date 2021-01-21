const projects = ['shipandco', 'stockandco', 'staff', 'utils', 'bentoandco'];

export const checkProjectRoute = (params = {}) => {
  const { project_item } = params;
  const isValidProject = projects.find(proj => proj === project_item);
  if (!isValidProject) {
    return { name: 'not-found', params: { pathMatch: ['projects', project_item] } };
  }

  return;
};

export const checkExternalPath = ({ path = '' }) => {
  const regex = /^(https?:\/\/|www\.)/;
  return regex.test(path);
};

export const getSectionLinkClassName = ({
  isExactActive,
  isActive,
  exactActiveClass,
  activeClass,
}) => {
  if (isExactActive) {
    const computed = (exactActiveClass.value || '').split(' ');
    return ['section-link', ...computed];
  }
  if (isActive) {
    const computed = (activeClass.value || '').split(' ');
    return ['section-link', ...computed];
  }
  return 'section-link';
};

export const getFormattedTitle = value => {
  return value.charAt(0).toUpperCase() + value.substring(1);
};

export const checkProjectPage = (store, route) => {
  if (!store) {
    throw new Error('missing arguments store');
  }

  const projects = store.getters['projects/getAllProjects'] || [];
  const project = route?.params?.project_item || store.getters['projects/getActiveProject'];

  if (!projects.length || !project) {
    return false;
  }

  return projects.includes(project);
};
