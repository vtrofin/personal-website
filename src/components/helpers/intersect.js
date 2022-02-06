import { animateCliText } from './animate';

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

  const animationObserver = new IntersectionObserver(handler, { root: null, threshold: [0.5] });
  animationObserver.observe(cliContainer.value);

  return animationObserver;
};
