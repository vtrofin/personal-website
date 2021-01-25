import { handleCursorReposition, handleCaretReposition } from './index';

export const refocusActiveTextLine = focusTarget => e => {
  if (focusTarget.value !== document.activeElement) {
    focusTarget.value.focus();
    e?.currentTarget.setAttribute('data-focus-click', 'true');
  }
};

export const handleResizeEvent = (cliWrapperActiveText, store, emit) => async () => {
  try {
    await handleCursorReposition({ domRef: cliWrapperActiveText.value, offsetY: 1, store });
    emit('update-caret-position');
  } catch (err) {
    console.log('Failed to update caret position on window resize', err.message);
  }
};

export const handleKeyUpEvent = (store, emit) => async event => {
  const isArrowKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key);
  if (!isArrowKey) {
    return;
  }

  try {
    await handleCursorReposition({ offsetY: 1, store });
    emit('update-caret-position');
  } catch (err) {
    console.log('Failed to update caret position', err.message);
  }
};

export const handleInputEvent = (store, emit, cliWrapperActiveText) => async event => {
  const isSubmit =
    event?.inputType === 'insertParagraph' ||
    (event?.data === null && event?.inputType === 'insertText');
  const isPaste = event?.inputType === 'insertFromPaste';
  const text = cliWrapperActiveText.value.innerText;

  if (isSubmit) {
    cliWrapperActiveText.value.innerText = '';
    const regexp = new RegExp('^(\\r\\n|\\r|\\n)\\1*|(\\r\\n|\\r|\\n)\\2*$', 'gi');
    const formattedText = text.replace(regexp, '');
    await store.dispatch({ type: 'hero/pushLine', text: formattedText });
  }

  if (isPaste) {
    cliWrapperActiveText.value.innerText = text;
    handleCaretReposition(cliWrapperActiveText.value);
  }

  try {
    await handleCursorReposition({
      domRef: cliWrapperActiveText.value,
      offsetY: isSubmit ? 2 : 1,
      store,
      isSubmit,
    });
    emit('update-caret-position');
  } catch (err) {
    console.log('Failed to update caret position', err.message);
  }
};
