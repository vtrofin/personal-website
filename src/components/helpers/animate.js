export const setUpAnimation = anime => {
  // x => translated -50%. translate -80% -> -20%
  // y -> translated 0; translate -70% -> 40%

  // https://animejs.com/documentation/#timelineBasics
  // https://animejs.com/documentation/#TLParamsInheritance
  // https://animejs.com/documentation/#TLcontrols
  // https://animejs.com/documentation/#loop
  // https://animejs.com/documentation/#unitlessValue
  // https://animejs.com/documentation/#set

  const tl = anime.timeline({
    targets: '.ghost-eyes-container',
    easing: 'easeInOutExpo',
    loop: true,
  });

  // const eyesStart = { translateX: '-50%', duration: 0, loop: false };
  const eyesLeft = { translateX: '-80%', duration: 3000, delay: 1500 };
  const eyesRight = { translateX: '-20%', duration: 1000, delay: 500 };
  const eyesBack = { translateX: '-50%', duration: 1500, delay: 500 };

  anime.set('.ghost-eyes-container', {
    translateX: function() {
      return '-50%';
    },
  });

  tl.add(eyesLeft)
    .add(eyesRight)
    .add(eyesBack);

  return tl;

  /*
 // main eye animations

  var eyeCornea = {
    targets: '.c-cornea',
    translateX: -40,
    autoplay: true,
    duration: 3000,
    delay: 1500,
    easing: 'easeInOutExpo'
  };

  var eyeCorneaUp = {
    targets: '.c-cornea',
    translateY: -10,
    autoplay: true,
    duration: 100,
    easing: 'easeInOutExpo'
  };

  var eyeCorneaMid = {
    targets: '.c-cornea',
    translateY: 0,
    autoplay: true,
    duration: 50,
    delay: 1000,
    easing: 'easeInOutExpo'
  };

  var eyeCorneaBottom = {
    targets: '.c-cornea',
    translateY: 10,
    autoplay: true,
    duration: 50,
    delay: 1000,
    easing: 'easeInOutExpo'
  };

  var eyeCorneaStart = {
    targets: '.c-cornea',
    translateX: 0,
    translateY: 0,
    autoplay: true,
    duration: 1000,
    delay: 1000,
    easing: 'easeInOutExpo'
  };

  var eyeCorneaDown = {
    targets: '.c-cornea',
    translateY: 80,
    scale: 0.7,
    autoplay: true,
    duration: 500,
    delay: 3000,
    easing: 'easeInOutExpo'
  }

  var eyeRollUp = {
    targets: '.c-cornea',
    translateY: -30,
    autoplay: true,
    duration: 1300,
    delay: 400,
    easing: 'easeInOutBack'
  }

  var eyeRollDown = {
    targets: '.c-cornea',
    translateY: 0,
    autoplay: true,
    duration: 200,
    easing: 'easeOutBack'
  }

  var eyeCornPanRight = {
    targets: '.c-cornea',
    translateX: 80,
    autoplay: true,
    duration: 2000,
    delay: 200,
    easing: 'easeInOutBack'
  }

  var eyeCorneaReUp = {
    targets: '.c-cornea',
    translateX: 0,
    translateY: 0,
    scale: 1,
    autoplay: true,
    duration: 600,
    delay: 2000,
    easing: 'easeInOutExpo'
  }

  var eyeScale = {
    targets: '.c-hero__eye__scale',
    scale: 4.2,
    duration: 600,
    delay: 1500,
    easing: 'easeOutElastic(1, .8)'
  }

  var eyeScaledZoomLeft = {
    targets: '.c-cornea',
    translateX: -40,
    duration: 2500,
    easing: 'easeInOutExpo'
  }

  var eyeScaledZoomRight = {
    targets: '.c-cornea',
    translateX: 40,
    duration: 2500,
    easing: 'easeInOutExpo'
  }

  var eyeScaledZoomCenter= {
    targets: '.c-cornea',
    translateX: 0,
    duration: 2500,
    easing: 'easeInOutExpo'
  }

  var eyeScaleBack = {
    targets: '.c-hero__eye__scale',
    scale: 1,
    duration: 600,
    delay: 500,
    easing: 'easeInOutExpo'
  }



  timelineEye.add(eyeCornea)
  .add(eyeCorneaUp)
  .add(eyeCorneaMid)
  .add(eyeCorneaBottom)
  .add(eyeCorneaStart)
  .add(eyeRollUp)
  .add(eyeRollDown)
  .add(eyeCorneaDown)
  .add(eyeCornPanRight)
  .add(eyeCorneaReUp)
  .add(eyeScale)
  .add(eyeScaledZoomLeft)
  .add(eyeScaledZoomRight)
  .add(eyeScaledZoomCenter)
  .add(eyeScaleBack)

}

*/
};

export const stopAnimation = () => {
  // cancel all targets
  // https://github.com/juliangarnier/anime/issues/188#issuecomment-552562353
  // or anime.remove(el) on each single one..
  // see also this answer https://github.com/juliangarnier/anime/issues/368#issuecomment-385175180
  /*

function getTargets(ani) {
  return ani.children.reduce(
    (all, one) => all.concat(getTargets(one)),
    ani.animatables.map((a) => a.target)
  )
}

function cancel(ani) {
  getTargets(ani).forEach(anime.remove)
}
let ani = anime.timeline(...).add(...).add(...)

// Later on...

cancel(ani)

*/
};
