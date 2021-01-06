const getCaretPosition = windowElem => {
  let x = 0;
  let y = 0;

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

  x = rect.left;
  y = rect.top;

  return { x, y };
};

const getCaretPositionFromElement = domElem => {
  if (!domElem) {
    return;
  }
  const rect = domElem.getBoundingClientRect();
  return { x: rect.right, y: rect.top };
};

export const handleCursorReposition = ({ store, domRef, windowElem, offsetY = 0 }) => {
  const coordinates = getCaretPosition(windowElem) || getCaretPositionFromElement(domRef) || {};
  return store.dispatch({
    type: 'hero/updateCoordinates',
    x: coordinates?.x ?? 0,
    y: (coordinates?.y ?? 0) + offsetY
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

export const getHeaderClass = (modifier, currentClass = '') => {
  if (modifier) {
    const prevClass = currentClass.split(' ')[0];
    return prevClass + ' ' + modifier;
  } else {
    return currentClass;
  }
};
