import { getLastNode } from "@components/helpers/index";
import {
  animate,
  createTimeline,
  set,
  stagger,
  remove,
  type AnimationParams,
  type JSAnimation,
  type Timeline,
  type TimelinePosition,
} from "animejs";
import type { Ref } from "vue";

export const setUpAnimation = () => {
  set(".ghost-eyes-container", {
    translateX: "-50%",
  });
  const tl = createTimeline({
    defaults: { ease: "inOutExpo" },
    loop: true,
  });

  const moves: {
    [key: string]: { params: AnimationParams; delay?: TimelinePosition };
  } = {
    eyesLeft: {
      params: { translateX: "-80%", duration: 3000 },
      delay: "+=2500",
    },
    eyesUp: { params: { translateY: "-50%", duration: 600 } },
    eyesBottom: {
      params: { translateY: "30%", duration: 800 },
      delay: "+=1500",
    },
    eyesStart: {
      params: { translateX: "-50%", translateY: "0%", duration: 500 },
      delay: "+=1000",
    },
    blinkOne: { params: { opacity: 0, duration: 300 }, delay: "+=250" },
    blinkTwo: { params: { opacity: 1, duration: 350 } },
    blinkThree: { params: { opacity: 0, duration: 300 }, delay: "+=250" },
    blinkFour: { params: { opacity: 1, duration: 350 } },
    eyesRight: {
      params: { translateX: "-20%", duration: 2500 },
      delay: "+=1000",
    },
    goUp: { params: { translateY: "-70%", duration: 700 }, delay: "+=500" },
    goMidRight: { params: { translateY: "0%", duration: 800 } },
    goCenter: { params: { translateX: "-50%", duration: 800 }, delay: "+=800" },
    scaleEyes: { params: { scale: 1.2, duration: 500 } },
    scaleBackEyes: { params: { scale: 1, duration: 900 }, delay: "+=1200" },
    blinkFive: { params: { opacity: 0, duration: 300 }, delay: "+=250" },
    blinkSix: { params: { opacity: 1, duration: 350 } },
    blinkSeven: { params: { opacity: 0, duration: 300 }, delay: "+=250" },
    blinkEight: { params: { opacity: 1, duration: 350 } },
  };

  return Object.keys(moves).reduce((acc, key) => {
    const { params, delay } = moves[key];
    acc = acc.add(".ghost-eyes-container", params, delay);
    return acc;
  }, tl);
};

export const stopAnimation = (tl: Timeline | JSAnimation) => {
  tl.pause();
  remove(".ghost-eyes-container");
};

export const animateCliText = ({
  cliContainer,
  staggeredAnimation,
}: {
  cliContainer: Ref<HTMLDivElement | null>;
  staggeredAnimation: Ref<JSAnimation | null>;
}) => {
  staggeredAnimation.value = animate(".bash-history .animation-text", {
    opacity: [0, 1],
    duration: 1,
    delay: stagger(25, {
      start: 350,
      ease: "linear",
    }),
    onComplete: () => {
      if (cliContainer.value) {
        const cursor = getLastNode(cliContainer.value) as HTMLDivElement;
        cursor.style.display = "inline-block";
      }
    },
  });
  staggeredAnimation.value.play();
};
