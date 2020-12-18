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

export const checkKeyMatch = ({ event, name, code }) => {
  return (
    event.key === name || event.code === name || event.keyCode === code || event.charCode === code
  );
};

export const isControlKey = event => {
  if (!event) return false;

  const codes = ['Control', 'Shift', 'CapsLock', 'Alt', 'Meta'];
  const keyCodes = [17, 16, 20, 18, 91, 93];

  return codes.includes(event.key) || keyCodes.includes(event.keyCode);
};

export const isArrowKey = event => {
  if (!event) return false;

  const codes = ['ArrowLeft', 'ArrowDown', 'ArrowUp', 'ArrowRight'];
  const keyCodes = [37, 40, 38, 39];

  return codes.includes(event.key) || keyCodes.includes(event.keyCode);
};
