import { animateCliText } from "@components/helpers/animate";
import type { JSAnimation } from "animejs";
import { type Ref } from "vue";

export const getAnimationObserver = ({
  cliContainer,
  staggeredAnimation,
}: {
  cliContainer: Ref<HTMLDivElement | null>;
  staggeredAnimation: Ref<JSAnimation | null>;
}): IntersectionObserver => {
  const handler: IntersectionObserverCallback = (entries, observer) => {
    try {
      if (entries?.[0]?.isIntersecting) {
        observer.disconnect();
        animateCliText({ cliContainer, staggeredAnimation });
      }
    } catch (err) {
      throw new Error("Intersection Observer Failed on this browser");
    }
  };

  const animationObserver = new IntersectionObserver(handler, {
    root: null,
    threshold: [0.5],
  });

  if (cliContainer.value) {
    animationObserver.observe(cliContainer.value);
  }

  return animationObserver;
};
