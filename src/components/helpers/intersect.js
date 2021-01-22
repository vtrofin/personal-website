export const getCliObserver = (cliWrapperActiveText, isMobile, docElem) => {
  const observeHandler = entries => {
    try {
      if (entries?.[0]?.isIntersecting) {
        if (cliWrapperActiveText.value !== docElem.activeElement) {
          // only refocus desktop browsers on scroll back up to the CLI
          !isMobile && cliWrapperActiveText.value.focus();
        }
      } else {
        cliWrapperActiveText.value.blur();
      }
    } catch (err) {
      throw new Error('Intersection Observer Failed on this browser');
    }
  };

  return new IntersectionObserver(observeHandler, { root: null, threshhold: [0.2] });
};

export const getCursorObserver = (container, activeTxt, docElem) => {
  const cursor = docElem.getElementById('blinking-cursor');

  if (!cursor) {
    throw new Error('Cursor DOM element not found');
  }

  if (!cursor.style) {
    cursor.style = {};
  }

  const handler = entries => {
    try {
      if (entries?.[0]?.isIntersecting) {
        if (!cursor.style.display || cursor.style.display === 'none') {
          cursor.style.display = 'block';
        }
      } else {
        cursor.style.display = 'none';
      }
    } catch (err) {
      throw new Error('Intersection Observer Failed on this browser');
    }
  };

  const observer = new IntersectionObserver(handler, { root: container.value, threshhold: [1] });
  observer.observe(activeTxt.value);
  return observer;
};
