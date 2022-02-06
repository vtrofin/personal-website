<template>
  <section class="hero-section">
    <div class="hero-title" tabindex="0">
      <h1>Hi. I'm Victor. <span class="text-block">A web engineer.</span></h1>
    </div>
    <div class="hero-subtitle" tabindex="0">
      <p>
        I'm a full-stack web engineer with a passion for bringing products to life. Currently living
        in Kyoto and working at
        <a class="content-link" target="_blank" rel="noopener" href="https://scoville.jp/">
          Scoville
        </a>
      </p>
    </div>
    <div class="cli-interaction-wrap">
      <div class="cli-buttons">
        <span />
        <span />
        <span />
      </div>
      <div class="cli-container" ref="cliContainer">
        <div
          class="bash-history"
          v-for="(line, i) in animationText"
          :key="i"
          :ref="'animationText' + i"
          tabindex="0"
        >
          <span class="animation-text">{{ line }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { createAnimationRefs, getExplodedContent } from '../helpers';
import { getAnimationObserver } from '../helpers/intersect';
import { stopAnimation } from '../helpers/animate';

export default {
  emits: {
    'update-caret-position': null,
  },
  setup() {
    let cliObserver = null;
    const store = useStore();
    const bashHistory = computed(() => store.getters['hero/getBashHistory']);
    const staticText = computed(() => store.getters['hero/getStaticText']);
    const cliContainer = ref(null);
    const cliWrapperActiveText = ref(null);
    const animationText = store.getters['hero/getAnimationText'];
    const animationTextRefs = createAnimationRefs('animationText', animationText?.length, ref);
    let staggeredAnimation = ref(null);

    onMounted(() => {
      // prepare text for animation -> explode into single characters
      const formattedText = getExplodedContent(animationText);
      for (let i in formattedText) {
        animationTextRefs[`animationText${i}`].value.innerHTML = formattedText[i];
      }
      //  check that cli is visible & trigger animation
      cliObserver = getAnimationObserver({ cliContainer, anime, staggeredAnimation });
    });

    onUnmounted(() => {
      cliObserver.disconnect();
      stopAnimation(staggeredAnimation.value, anime);
    });

    return {
      bashHistory,
      staticText,
      cliContainer,
      cliWrapperActiveText,
      animationText,
      ...animationTextRefs,
    };
  },
};
</script>

<style>
.hero-section {
  padding-top: 6rem;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: row;
}

.hero-section .hero-title h1,
.hero-section .hero-subtitle p {
  margin: 0;
  padding: 0;
}

.hero-section .hero-subtitle,
.hero-section .hero-title {
  position: relative;
  display: flex;
}

.hero-section .hero-title {
  align-items: flex-end;
}

.hero-section .hero-subtitle {
  align-items: flex-start;
}

.hero-section .hero-title h1 {
  font-size: 10vmin;
  letter-spacing: -2px;
  line-height: 1.1;
  text-align: left;
  color: var(--black);
}

.hero-section .hero-subtitle p {
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: left;
  color: var(--gray);
}
@media all and (min-width: 600px) {
  .hero-section .hero-title h1 {
    font-size: 4rem;
  }
}
@media all and (min-width: 1000px) {
  .hero-section .hero-subtitle p {
    padding-right: 3.5rem;
  }
}

.hero-section .cli-interaction-wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* height: 350px; */
  background-color: var(--black);
  border-radius: var(--base-border);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.hero-section .cli-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: var(--white);
  font-family: 'Roboto Mono', Courier, Monaco, Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1rem;
  text-align: left;
  word-break: break-all;
  outline: none;
  /* overflow-x: hidden;
  overflow-y: scroll; */
  overflow: hidden;
  scrollbar-width: none;
  scroll-snap-type: y mandatory;
}

.hero-section .cli-container::-webkit-scrollbar {
  display: none;
}

.cli-container .bash-history {
  width: 100%;
  background: none;
  padding-left: 2%;
  padding-right: 2%;
  box-sizing: border-box;
  scroll-snap-align: start;
  line-height: 1.2em;
  margin-bottom: 1rem;
}

.cli-container .cli-wrapper {
  outline: none;
  caret-color: transparent;
  background: none;
  flex-grow: 1;
  padding-left: 2%;
  padding-right: 2%;
}

.pre-text,
.animation-text {
  white-space: pre-wrap;
  outline: none;
  background: inherit;
  color: inherit;
  letter-spacing: 0.0625em;
  display: block;
}
.animation-text {
  display: inline-block;
  opacity: 0;
}

span.text-block {
  display: block;
}

@media all and (min-width: 1000px) {
  .hero-section {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
  }
  .hero-section .hero-title,
  .hero-section .hero-subtitle {
    grid-column: 1 / 2;
    grid-row: span 2;
  }
  .hero-section .cli-interaction-wrap {
    grid-column: 2 / 3;
    grid-row: 1/ 5;
    height: 550px;
  }
}

[contenteditable] {
  -webkit-user-select: text;
  user-select: text;
  border: 1px solid transparent;
}

.cli-buttons {
  box-sizing: border-box;
  padding: 20px 10px;
  align-self: flex-start;
}
.cli-buttons > span {
  height: 14px;
  width: 14px;
  display: inline-block;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 5px;
}

.cli-buttons > span:first-child {
  background-color: #ef4444;
}
.cli-buttons > span:nth-child(2) {
  background-color: #facc15;
}
.cli-buttons > span:last-child {
  background-color: #22c55e;
}
</style>
