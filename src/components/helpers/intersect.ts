import { animateCliText } from "@components/helpers/animate";
import type { AnimeParams, AnimeInstance } from "animejs";
import { type Ref } from "vue";

export const getAnimationObserver = ({
  cliContainer,
  anime,
  staggeredAnimation,
}: {
  cliContainer: Ref<HTMLDivElement | null>;
  anime: (params: AnimeParams) => AnimeInstance;
}): IntersectionObserver => {
  const handler: IntersectionObserverCallback = (entries, observer) => {
    try {
      if (entries?.[0]?.isIntersecting) {
        observer.disconnect(); // anime - remove anime param from disconnect
        animateCliText({ cliContainer, anime, staggeredAnimation });
      }
    } catch (err) {
      throw new Error("Intersection Observer Failed on this browser");
    }
  };

  const animationObserver = new IntersectionObserver(handler, {
    root: null,
    threshold: [0.5],
  });
  animationObserver.observe(cliContainer.value);

  return animationObserver;
};
