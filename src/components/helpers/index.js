export const getCaretPosition = windowElem => {
  let x = 0;
  let y = 0;

  const isSupported = typeof windowElem.getSelection === 'function';
  if (!isSupported) {
    throw new Error('Your browser does not support fetching the caret position');
  }

  const selection = windowElem.getSelection();
  if (selection.rangeCount === 0) {
    return;
  }

  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rect = range.getClientRects()[0];

  if (!rect) {
    return;
  }

  x = rect.left;
  y = rect.top;

  return { x, y };
};
