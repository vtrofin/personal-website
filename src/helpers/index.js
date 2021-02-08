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
  totalItems
}) => {
  let baseClass = ['section-link'];
  if (totalItems <= 2) {
    baseClass = [...baseClass, 'force-half-width'];
  }

  if (isExactActive) {
    const computed = (exactActiveClass.value || '').split(' ');
    return [...baseClass, ...computed];
  }
  if (isActive) {
    const computed = (activeClass.value || '').split(' ');
    return [...baseClass, ...computed];
  }
  return baseClass;
};

export const getFormattedTitle = value => {
  const sentenceCase = value.charAt(0).toUpperCase() + value.substring(1);
  const cpyRegexp = /^Bertrand/gi;
  const isBertrand = cpyRegexp.test(sentenceCase);
  return isBertrand ? sentenceCase : sentenceCase.replace(/andco/, '&Co');
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
