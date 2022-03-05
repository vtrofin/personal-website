import { getLastNode } from './index';

export const setUpAnimation = anime => {
  // x => translated -50%. translate -80% -> -20%
  // y -> translated 0; translate -70% -> 40%
  anime.set('.ghost-eyes-container', {
    translateX: () => {
      return '-50%';
    },
  });
  const tl = anime.timeline({
    targets: '.ghost-eyes-container',
    easing: 'easeInOutExpo',
    loop: true,
  });

  const moves = {
    eyesLeft: { translateX: '-80%', duration: 3000, delay: 2500 },
    eyesUp: { translateY: '-50%', duration: 600 },
    eyesBottom: { translateY: '30%', duration: 800, delay: 1500 },
    eyesStart: { translateX: '-50%', translateY: '0%', duration: 500, delay: 1000 },
    blinkOne: { opacity: 0, duration: 300, delay: 250 },
    blinkTwo: { opacity: 1, duration: 350 },
    blinkThree: { opacity: 0, duration: 300, delay: 250 },
    blinkFour: { opacity: 1, duration: 350 },
    eyesRight: { translateX: '-20%', duration: 2500, delay: 1000 },
    goUp: { translateY: '-70%', duration: 700, delay: 500 },
    goMidRight: { translateY: '0%', duration: 800 },
    goCenter: { translateX: '-50%', duration: 800, delay: 800 },
    scaleEyes: { scale: 1.2, duration: 500 },
    scaleBackEyes: { scale: 1, duration: 900, delay: 1200 },
    blinkFive: { opacity: 0, duration: 300, delay: 250 },
    blinkSix: { opacity: 1, duration: 350 },
    blinkSeven: { opacity: 0, duration: 300, delay: 250 },
    blinkEight: { opacity: 1, duration: 350 },
  };

  return Object.keys(moves).reduce((acc, key) => {
    acc = acc.add(moves[key]);
    return acc;
  }, tl);
};

const getTargets = ani => {
  const parentTarget = (ani?.animatables ?? []).map(item => item.target);
  if (!parentTarget.length) {
    return [];
  }

  return ani.children.reduce((allTargets, child) => {
    const childTargets = getTargets(child);
    allTargets = allTargets.concat(childTargets);
    return allTargets;
  }, parentTarget);
};

export const stopAnimation = (tl, anime) => {
  const allTargets = getTargets(tl);
  return allTargets.map(target => anime.remove(target));
};

export const animateCliText = ({ cliContainer, anime, staggeredAnimation }) => {
  staggeredAnimation.value = anime({
    targets: '.bash-history .animation-text',
    opacity: [0, 1],
    round: 1,
    delay: 25,
    delay: anime.stagger(25, { start: 350, direction: 'normal', easing: 'linear' }),
    complete: () => {
      // display the blinking cursor after animation finished
      const cursor = getLastNode(cliContainer.value);
      cursor.style.display = 'inline-block';
    },
  });

  staggeredAnimation.value.play();
};
