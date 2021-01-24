import { getFormattedTitle } from '../../helpers';

const getScrollOffset = () => {
  const offsetX = window.scrollX || window.pageXOffset || 0;
  const offsetY = window.scrollY || window.pageYOffset || 0;
  return { offsetX, offsetY };
};

const getCaretPosition = () => {
  if (!window) {
    return;
  }

  const isSupported = typeof window.getSelection === 'function';
  if (!isSupported) {
    throw new Error('Your browser does not support fetching the caret position');
  }

  const selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return;
  }

  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(false);
  const rect = range.getClientRects()[0];

  if (!rect) {
    return;
  }

  const { offsetX, offsetY } = getScrollOffset();
  return { x: rect.left + offsetX, y: rect.top + offsetY };
};

const getCaretPositionFromElement = domElem => {
  if (!domElem) {
    return;
  }
  const rect = domElem.getBoundingClientRect();
  const { offsetX, offsetY } = getScrollOffset();
  return { x: rect.right + offsetX, y: rect.top + offsetY };
};

export const handleCursorReposition = ({ domRef, offsetY = 0, store, isSubmit }) => {
  const coordinates =
    (!isSubmit && getCaretPosition()) || getCaretPositionFromElement(domRef) || {};
  return store.dispatch({
    type: 'hero/updateCoordinates',
    x: coordinates?.x ?? 0,
    y: (coordinates?.y ?? 0) + offsetY,
  });
};

export const handleCaretReposition = domRef => {
  const range = document.createRange();
  const sel = window.getSelection();
  const childElems = domRef.childNodes;
  range.setStart(childElems[childElems.length - 1], childElems[childElems.length - 1].length);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

export const getProjectData = (vuexProjects, store) => {
  return vuexProjects.map(project => {
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

export const createAnimationRefs = (refName, maxNumber, ref) => {
  if (maxNumber === 0 || !maxNumber) {
    return undefined;
  }

  const animationRefs = new Array(maxNumber).fill().reduce((acc, val, i) => {
    acc[refName + i] = ref(null);
    return acc;
  }, {});

  return animationRefs;
};

export const getExplodedContent = (textArr = []) => {
  const getFormattedLine = (textLine = '') => {
    const split = textLine.split('');
    return split.reduce((acc, char) => {
      acc = acc + `<span class="animation-text">${char}</span>`;
      return acc;
    }, '');
  };

  return textArr.filter(Boolean).map(getFormattedLine);
};

export const getLastNode = parent => {
  if (!parent) {
    return;
  }
  let ch = parent?.children;
  while (ch.length) {
    if (!ch[ch.length - 1].children.length) {
      return ch[ch.length - 1];
    }
    ch = ch[ch.length - 1].children;
  }

  return ch[ch.length - 1];
};
