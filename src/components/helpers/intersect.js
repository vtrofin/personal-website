const getOrientation = (windowElem, isMobile) => {
  if (!isMobile) return;

  const width = windowElem.outerWidth;
  const height = windowElem.outerHeight;
  const ratio = width / height;

  // heuristic calculated based on tests on my phone
  // max ratio i got on my phone in portrait mode with keyboard visible was 1.2
  return ratio > 1.5 ? 'landscape' : 'portrait';
};

const getScrollState = ({ entries, pos }) => {
  const currentY = entries?.[0]?.boundingClientRect?.y;
  const currentRatio = entries?.[0]?.intersectionRatio;
  const isIntersecting = entries?.[0]?.isIntersecting;
  let scrollState = { prevY: pos.prevY, currentY, prevRatio: pos.prevRatio, currentRatio };

  if (currentY < pos.prevY) {
    scrollState.direction = 'down';
    scrollState.action = currentRatio > pos.prevRatio && isIntersecting ? 'enter' : 'leave';
  } else if (currentY > pos.prevY) {
    scrollState.direction = 'up';
    scrollState.action = currentRatio < pos.prevRatio && !isIntersecting ? 'leave' : 'enter';
  } else if (currentY === pos.prevY) {
    scrollState.direction = 'no-scroll';
    scrollState.action = 'no-action';
  }

  pos.prevY = currentY;
  pos.prevRatio = currentRatio;

  return scrollState;
};

export const getCliObserver = ({
  cliWrapperActiveText,
  target,
  isMobile,
  isAndroid,
  docElem,
  pos,
  windowElem
}) => {
  const observeHandler = entries => {
    const scrollState = getScrollState({ entries, pos });

    try {
      if (entries?.[0]?.isIntersecting) {
        // only refocus desktop browsers on scroll back up to the CLI
        cliWrapperActiveText.value !== docElem.activeElement &&
          !isMobile &&
          cliWrapperActiveText.value.focus();
      } else {
        if (isMobile && isAndroid) {
          // fucking hack for Android keyboard pushing upwards!
          // if mobile && Android && scrolling up and dissappear => do not blur
          // if same position && mobile && Android => do not blur
          const orientation = getOrientation(windowElem, isMobile);
          const { direction, action } = scrollState;
          const isPortraitBug =
            orientation === 'portrait' && action === 'leave' && direction === 'up';
          const isLandscapeBug = orientation === 'landscape' && direction === 'no-scroll';
          isPortraitBug || isLandscapeBug ? undefined : cliWrapperActiveText.value.blur();
        } else {
          cliWrapperActiveText.value.blur();
        }
      }
    } catch (err) {
      throw new Error('Intersection Observer Failed on this browser');
    }
  };

  const cliObserver = new IntersectionObserver(observeHandler, { root: null, threshhold: [0.2] });
  cliObserver.observe(target.value);
  return cliObserver;
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
