<template>
  <section class="hero-section">
    <div class="hero-title" tabindex="0">
      <h1>I build software that makes work faster.</h1>
    </div>
    <div class="hero-subtitle" tabindex="0">
      <p>
        Hi. I'm Victor, a web engineer, currently living in Kyoto and working at
        <a
          class="content-link"
          target="_blank"
          rel="noopener"
          href="https://scoville.jp/"
        >
          Scoville
        </a>.
      </p>
    </div>
    <div v-if="cliState === 'fullscreen'" class="cli-interaction-wrap cli-placeholder" aria-hidden="true"></div>
    <Teleport to="body" :disabled="cliState !== 'fullscreen'">
      <div
        class="cli-interaction-wrap"
        :class="{
          'cli-fullscreen': cliState === 'fullscreen',
          'cli-minimized': cliState === 'minimized',
          'cli-closed': cliState === 'closed',
        }"
        ref="cliWrap"
        aria-hidden="true"
        @click="cliState === 'minimized' ? handleMinimize() : undefined"
      >
        <div class="cli-buttons" ref="cliButtons">
          <span @click.stop="handleClose" title="Close" />
          <span @click.stop="handleMinimize" title="Minimize" />
          <span @click.stop="handleFullscreen" title="Fullscreen" />
        </div>
        <div class="cli-container" ref="cliContainer">
          <div
            class="bash-history"
            v-for="(line, i) in animationText"
            :key="i"
            :ref="(el) => animationTextRefs.push(el as HTMLElement)"
          >
            <span class="animation-text">{{ line }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script lang="ts">
import type { JSAnimation } from "animejs";
import { animate } from "animejs";
import { ref, onMounted, onUnmounted, nextTick, defineComponent } from "vue";
import { useHeroStore } from '@store/useHeroStore';
import { getExplodedContent } from "@components/helpers";
import { getAnimationObserver } from "@components/helpers/intersect";
import { stopAnimation } from "@components/helpers/animate";

type CliState = 'normal' | 'fullscreen' | 'minimized' | 'closed';

export default defineComponent({
  name: "HeroSection",
  emits: {
    "update-caret-position": null,
  },
  setup() {
    let cliObserver: IntersectionObserver | undefined
    const heroStore = useHeroStore();
    const cliContainer = ref<HTMLDivElement | null>(null);
    const animationText = heroStore.animationTextLines;
    const animationTextRefs = ref<HTMLElement[]>([]);
    let staggeredAnimation = ref<JSAnimation | null>(null);

    const cliWrap = ref<HTMLDivElement | null>(null);
    const cliButtons = ref<HTMLDivElement | null>(null);
    const cliState = ref<CliState>('normal');
    let isAnimating = false;
    let fullscreenOriginRect: DOMRect | null = null;

    // Shared helper: get clip-path inset percentages for the buttons region
    const getButtonsClip = () => {
      const btn = cliButtons.value;
      const el = cliWrap.value;
      if (!btn || !el) return null;
      const btnRect = btn.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const top = ((elRect.height - btnRect.height) / elRect.height * 100).toFixed(1);
      const left = ((elRect.width - btnRect.width) / elRect.width * 100).toFixed(1);
      return { top, left };
    };

    // Shared helper: convert a DOMRect to viewport-relative clip-path inset values (px)
    const rectToClipInset = (rect: DOMRect | { top: number; left: number; right: number; bottom: number }) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      return {
        top: rect.top,
        right: vw - rect.right,
        bottom: vh - rect.bottom,
        left: rect.left,
      };
    };

    // Red — close
    const handleClose = () => {
      if (cliState.value === 'closed' || isAnimating) {
        return;
      }

      const el = cliWrap.value;
      if (!el) return;

      if (cliState.value !== 'normal') {
        cliState.value = 'normal';
      }

      isAnimating = true;
      animate(el, {
        clipPath: [
          'inset(0% 0% 0% 0% round 5px)',
          'inset(50% 50% 50% 50% round 5px)',
        ],
        opacity: [1, 0],
        duration: 350,
        easing: 'easeInQuad',
        onComplete: () => {
          el.style.clipPath = '';
          el.style.opacity = '';
          cliState.value = 'closed';
          isAnimating = false;
        },
      });
    };

    // Yellow — minimize
    const minimizeCli = () => {
      const el = cliWrap.value;
      if (!el) return;

      const clip = getButtonsClip();
      if (!clip) return;

      isAnimating = true;
      animate(el, {
        clipPath: [
          'inset(0% 0% 0% 0% round 5px)',
          `inset(${clip.top}% 0% 0% ${clip.left}% round 5px)`,
        ],
        duration: 300,
        easing: 'easeInCubic',
        onComplete: () => {
          el.style.clipPath = '';
          cliState.value = 'minimized';
          nextTick(() => { isAnimating = false; });
        },
      });
    };

    // Yellow — restore from minimized
    const restoreCli = () => {
      const el = cliWrap.value;
      if (!el) return;

      const clip = getButtonsClip();
      if (!clip) return;

      isAnimating = true;
      el.style.clipPath = `inset(${clip.top}% 0% 0% ${clip.left}% round 5px)`;
      cliState.value = 'normal';
      nextTick(() => {
        animate(el, {
          clipPath: [
            `inset(${clip.top}% 0% 0% ${clip.left}% round 5px)`,
            'inset(0% 0% 0% 0% round 5px)',
          ],
          duration: 350,
          easing: 'easeOutQuart',
          onComplete: () => {
            el.style.clipPath = '';
            isAnimating = false;
          },
        });
      });
    };

    const handleMinimize = () => {
      if (cliState.value === 'fullscreen' || cliState.value === 'closed' || isAnimating) {
        return;
      }

      cliState.value === 'minimized' ? restoreCli() : minimizeCli();
    };

    // Green — enter fullscreen
    const enterFullscreen = () => {
      const el = cliWrap.value;
      if (!el) return;

      if (!animationsEnabled) {
        cliState.value = 'fullscreen';
        return;
      }

      fullscreenOriginRect = el.getBoundingClientRect();
      const inset = rectToClipInset(fullscreenOriginRect);

      isAnimating = true;
      cliState.value = 'fullscreen';
      nextTick(() => {
        animate(el, {
          clipPath: [
            `inset(${inset.top}px ${inset.right}px ${inset.bottom}px ${inset.left}px round 5px)`,
            'inset(0px 0px 0px 0px round 0px)',
          ],
          duration: 350,
          easing: 'easeOutQuart',
          onComplete: () => {
            el.style.clipPath = '';
            isAnimating = false;
          },
        });
      });
    };

    // Green — exit fullscreen
    const exitFullscreen = () => {
      const el = cliWrap.value;
      if (!el) return;

      if (!animationsEnabled) {
        cliState.value = 'normal';
        fullscreenOriginRect = null;
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = fullscreenOriginRect || { top: 0, left: 0, right: vw, bottom: vh };
      const inset = rectToClipInset(rect);

      isAnimating = true;
      animate(el, {
        clipPath: [
          'inset(0px 0px 0px 0px round 0px)',
          `inset(${inset.top}px ${inset.right}px ${inset.bottom}px ${inset.left}px round 5px)`,
        ],
        duration: 350,
        easing: 'easeInQuart',
        onComplete: () => {
          el.style.clipPath = '';
          cliState.value = 'normal';
          fullscreenOriginRect = null;
          isAnimating = false;
        },
      });
    };

    const handleFullscreen = () => {
      if (cliState.value === 'minimized' || cliState.value === 'closed' || isAnimating) {
        return;
      }

      cliState.value === 'fullscreen' ? exitFullscreen() : enterFullscreen();
    };

    onMounted(() => {
      requestAnimationFrame(() => {
        const prefersReducedMotion = typeof window !== 'undefined'
          && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
          for (const el of animationTextRefs.value) {
            const span = el.querySelector('.animation-text');
            if (span) {
              (span as HTMLElement).style.opacity = '1'
            };
          }
          return;
        }

        const formattedText = getExplodedContent(animationText);
        for (const i in formattedText) {
          animationTextRefs.value[i].innerHTML = formattedText[i];
        }
        cliObserver = getAnimationObserver({
          cliContainer,
          staggeredAnimation,
        });
      });
    });

    onUnmounted(() => {
      cliObserver?.disconnect();
      if (staggeredAnimation.value) {
        stopAnimation(staggeredAnimation.value)
      };
    });

    return {
      cliContainer,
      animationText,
      animationTextRefs,
      cliWrap,
      cliButtons,
      cliState,
      handleClose,
      handleMinimize,
      handleFullscreen,
    };
  },
});
</script>

<style>
.hero-section {
  position: relative;
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
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1.2;
  text-align: left;
  color: var(--color-text-primary);
}

.hero-section .hero-subtitle p {
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: left;
  color: var(--color-text-primary);
}

@media all and (min-width: 600px) {
  .hero-section .hero-title h1 {
    font-size: 3.25rem;
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
  background-color: var(--color-surface-dark);
  border-radius: var(--radius-base);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: border-radius 0.3s ease;
}

/* Placeholder — holds grid space while real element is teleported to body */
.hero-section .cli-interaction-wrap.cli-placeholder {
  visibility: hidden;
  pointer-events: none;
}

/* Fullscreen — no .hero-section ancestor because element is teleported to body */
.cli-interaction-wrap.cli-fullscreen {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(--color-surface-dark);
  position: fixed;
  inset: 0;
  z-index: 1000;
  border-radius: 0;
  height: 100dvh !important;
}

/* Closed — stays in grid to preserve layout height, invisible and non-interactive */
.hero-section .cli-interaction-wrap.cli-closed {
  opacity: 0;
  pointer-events: none;
}

/* Minimized — stays in grid to preserve layout height, transparent background,
   buttons float to bottom-right inside the preserved grid space */
.hero-section .cli-interaction-wrap.cli-minimized {
  background: transparent;
  box-shadow: none;
  cursor: pointer;
  position: relative;
}

.hero-section .cli-interaction-wrap.cli-minimized .cli-buttons {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--color-surface-dark);
  border-radius: var(--radius-base);
}

.hero-section .cli-interaction-wrap.cli-minimized .cli-container {
  display: none;
}

.cli-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: var(--color-text-light);
  font-family: "Roboto Mono", Courier, Monaco, Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1rem;
  text-align: left;
  word-break: break-all;
  outline: none;
  overflow: hidden;
  scrollbar-width: none;
  scroll-snap-type: y mandatory;
}

.cli-container::-webkit-scrollbar {
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

.cli-container .bash-history:first-child,
.cli-container .bash-history:nth-child(5) {
  color: var(--color-accent);
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

.cli-buttons>span {
  height: 14px;
  width: 14px;
  display: inline-block;
  border-radius: var(--radius-circle);
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.cli-buttons>span:hover {
  opacity: 0.75;
}

.cli-buttons>span:first-child {
  background-color: #ef4444;
}

.cli-buttons>span:nth-child(2) {
  background-color: #facc15;
}

.cli-buttons>span:last-child {
  background-color: #22c55e;
}
</style>
