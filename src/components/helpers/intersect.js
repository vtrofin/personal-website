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
