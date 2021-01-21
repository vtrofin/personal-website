import { getFormattedTitle } from '../../helpers';

const getScrollOffset = windowElem => {
  const offsetX = windowElem.scrollX || windowElem.pageXOffset || 0;
  const offsetY = windowElem.scrollY || windowElem.pageYOffset || 0;
  return { offsetX, offsetY };
};

const getCaretPosition = windowElem => {
  if (!windowElem) {
    return;
  }

  const isSupported = typeof windowElem.getSelection === 'function';
  if (!isSupported) {
    throw new Error('Your browser does not support fetching the caret position');
  }

  const selection = windowElem.getSelection();
  if (selection.rangeCount === 0) {
    return;
  }

  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(false);
  const rect = range.getClientRects()[0];

  if (!rect) {
    return;
  }

  const { offsetX, offsetY } = getScrollOffset(windowElem);
  return { x: rect.left + offsetX, y: rect.top + offsetY };
};

const getCaretPositionFromElement = (domElem, windowElem) => {
  if (!domElem) {
    return;
  }
  const rect = domElem.getBoundingClientRect();
  const { offsetX, offsetY } = getScrollOffset(windowElem);

  return {
    x: rect.right + offsetX,
    y: rect.top + offsetY,
  };
};

export const handleCursorReposition = ({ windowElem, domRef, offsetY = 0, store, isSubmit }) => {
  const coordinates =
    (!isSubmit && getCaretPosition(windowElem)) ||
    getCaretPositionFromElement(domRef, windowElem) ||
    {};
  return store.dispatch({
    type: 'hero/updateCoordinates',
    x: coordinates?.x ?? 0,
    y: (coordinates?.y ?? 0) + offsetY,
  });
};

export const handleCaretReposition = ({ windowElem, domRef, windowDocument }) => {
  // https://stackoverflow.com/a/6249440
  const range = windowDocument.createRange();
  const sel = windowElem.getSelection();
  const childElems = domRef.childNodes;
  range.setStart(childElems[childElems.length - 1], childElems[childElems.length - 1].length);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

export const getProjectData = (vuexProjects, store) => {
  return vuexProjects.map((project, i) => {
    const projectData = store.getters[`projects/${project}/getProject`];
    const formatted = getFormattedTitle(project);
    const path = `/projects/${project}`;

    /* dev only */
    const baseData = {
      path,
      ariaLabel: `View ${formatted} project`,
      callToAction: 'View Project',
      title: formatted,
      excerpt:
        'Some random text about this project. Nobody likes to wait… but you can make it less of a pain. I have created. An open-source collection of loading spinners animated with CSS.',
      // logoClass: `${project}-logo`,
      // backgroundClass: `${project}-background`,
      type: 'project',
      project,
    };

    return { ...baseData, ...projectData };
  });
};

export const getWorkData = vuexCompanies => {
  return vuexCompanies.map(work => {
    const formatted = getFormattedTitle(work.project);

    return {
      ...work,
      callToAction: 'View Company',
      title: formatted,
    };
  });
};
