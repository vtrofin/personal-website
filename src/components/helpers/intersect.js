import { animateCliText } from './animate';

export const getCliObserver = ({ cliWrapperActiveText, cliContainer, isMobile, isAndroid }) => {
  // improve this function by checking all entries, not just the first one
  // and see if inters ratio decreases or increases (for android mobile)
  // and act accordingly -> see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  const observeHandler = entries => {
    try {
      const isClick = cliContainer.value.getAttribute('data-focus-click') === 'true';
      if (entries?.[0]?.isIntersecting) {
        // only refocus desktop browsers on scroll back up to the CLI
        cliWrapperActiveText.value !== document.activeElement &&
          !isMobile &&
          cliWrapperActiveText.value.focus();
      } else {
        if (isMobile && isAndroid) {
          !isClick && cliWrapperActiveText.value.blur();
        } else {
          cliWrapperActiveText.value.blur();
        }
      }
      !!isClick && cliContainer.value.removeAttribute('data-focus-click');
    } catch (err) {
      throw new Error('Intersection Observer Failed on this browser');
    }
  };

  const cliObserver = new IntersectionObserver(observeHandler, {
    root: null,
    threshhold: isMobile && isAndroid ? [0.2, 0.6, 0.9] : [0.2],
  });
  cliObserver.observe(cliContainer.value);
  return cliObserver;
};

export const getCursorObserver = (container, activeTxt) => {
  const cursor = document.getElementById('blinking-cursor');

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

export const getAnimationObserver = ({ cliContainer, anime, staggeredAnimation }) => {
  const handler = (entries, observer) => {
    try {
      if (entries?.[0]?.isIntersecting) {
        observer.disconnect(anime);
        animateCliText({ cliContainer, anime, staggeredAnimation });
      }
    } catch (err) {
      throw new Error('Intersection Observer Failed on this browser');
    }
  };

  const animationObserver = new IntersectionObserver(handler, { root: null, threshold: [0.75] });
  animationObserver.observe(cliContainer.value);

  return animationObserver;
};
