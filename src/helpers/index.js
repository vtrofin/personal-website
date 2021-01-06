export const projects = ['shipandco', 'stockandco', 'staff', 'utils', 'shopify'];

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

export const getHeaderClass = (modifier, currentClass = '') => {
  // todo : handle case when prevClass is the same kind as the modifier (incoming class)
  if (modifier) {
    const prevClass = currentClass.split(' ')[0];
    return prevClass + ' ' + modifier;
  } else {
    return currentClass.split(' ')[0];
  }
};
