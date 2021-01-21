<template>
  <section class="hero-section">
    <div class="hero-title">
      <h1>Hi. I'm Victor. <span class="text-block">A web engineer.</span></h1>
    </div>
    <div class="hero-subtitle">
      <p>
        I'm a full-stack web engineer with a passion for bringing products to life. Currently living
        in Kyoto and working at
        <a
          class="content-link"
          target="_blank"
          rel="noopener"
          href="https://www.shipandco.com/ja/"
          aria-label="Visit Ship&co website"
        >
          Ship&co
        </a>
      </p>
    </div>
    <div class="cli-interaction-wrap">
      <div class="cli-buttons">
        <span />
        <span />
        <span />
      </div>
      <div class="cli-container" ref="cliContainer" @click.stop.prevent="refocusActiveTextLine">
        <div class="bash-history" v-for="(line, i) in bashHistory" :key="i" :aria-label="line">
          {{ staticText }} <span class="pre-text">{{ line }}</span>
        </div>
        <div class="cli-wrapper">
          {{ staticText }}
          <span
            class="pre-text"
            ref="cliWrapperActiveText"
            tabindex="0"
            @input.prevent="handleInput"
            @keyup.stop.prevent="handleKeyUp"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { handleCursorReposition, handleCaretReposition } from '../helpers';

export default {
  emits: {
    'update-caret-position': null,
  },
  setup(props, context) {
    const { emit } = context;
    let cliObserver = null;
    const store = useStore();
    const bashHistory = computed(() => store.getters['hero/getBashHistory']);
    const staticText = computed(() => store.getters['hero/getStaticText']);
    const cliContainer = ref(null);
    const cliWrapperActiveText = ref(null);
    const isMobile = store.getters['checkMobile'];

    const handleResize = async () => {
      try {
        await handleCursorReposition({
          windowElem: window,
          domRef: cliWrapperActiveText.value,
          offsetY: 1,
          store,
        });
        emit('update-caret-position');
      } catch (err) {
        console.log('Failed to update caret position on window resize', err.message);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      cliWrapperActiveText.value.contentEditable = true;

      const observeHandler = entries => {
        try {
          if (entries?.[0]?.isIntersecting) {
            if (cliWrapperActiveText.value !== document.activeElement) {
              // only refocus desktop browsers on scroll back up to the CLI
              !isMobile && cliWrapperActiveText.value.focus();
            }
          } else {
            cliWrapperActiveText.value.blur();
          }
        } catch (err) {
          throw new Error('Intersection Observer Failed on this browser');
        }
      };

      cliObserver = new IntersectionObserver(observeHandler, { root: null, threshhold: [0.2] });
      cliObserver.observe(cliContainer.value);

      setTimeout(() => {
        return handleCursorReposition({
          windowElem: window,
          domRef: cliWrapperActiveText.value,
          offsetY: 2,
          store,
        })
          .then(() => emit('update-caret-position'))
          .catch(err => console.log('Failed to update caret position', err.message));
      }, 0);
    });

    onUnmounted(() => {
      cliObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    });

    const handleInput = async event => {
      const isSubmit =
        event?.inputType === 'insertParagraph' ||
        (event?.data === null && event?.inputType === 'insertText');
      const isPaste = event?.inputType === 'insertFromPaste';
      const text = cliWrapperActiveText.value.innerText;

      if (isSubmit) {
        cliWrapperActiveText.value.innerText = '';
        const regexp = new RegExp('^(\\r\\n|\\r|\\n)\\1*|(\\r\\n|\\r|\\n)\\2*$', 'gi');
        const formattedText = text.replace(regexp, '');
        await store.dispatch({ type: 'hero/pushLine', text: formattedText });
      }

      if (isPaste) {
        cliWrapperActiveText.value.innerText = text;
        handleCaretReposition({
          windowElem: window,
          windowDocument: document,
          domRef: cliWrapperActiveText.value,
        });
      }

      return handleCursorReposition({
        windowElem: window,
        domRef: cliWrapperActiveText.value,
        offsetY: isSubmit ? 2 : 1,
        store,
        isSubmit,
      })
        .then(() => emit('update-caret-position'))
        .catch(err => console.log('Failed to update caret position', err.message));
    };

    const handleKeyUp = async event => {
      const isArrowKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key);
      if (!isArrowKey) {
        return;
      }
      return handleCursorReposition({ windowElem: window, offsetY: 1, store })
        .then(() => emit('update-caret-position'))
        .catch(err => console.log('Failed to update caret position', err.message));
    };

    const refocusActiveTextLine = () => {
      if (cliWrapperActiveText.value !== document.activeElement) {
        cliWrapperActiveText.value.focus();
      }
    };

    return {
      bashHistory,
      staticText,
      cliContainer,
      cliWrapperActiveText,
      handleInput,
      handleKeyUp,
      refocusActiveTextLine,
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
  height: 350px;
  background-color: var(--black);
  border-radius: var(--base-border);
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
  font-family: Monaco, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.1rem;
  text-align: left;
  word-break: break-all;
  outline: none;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  scroll-snap-type: y mandatory;
}

.hero-section .cli-container::-webkit-scrollbar {
  /* background: transparent; */
  display: none;
}

.cli-container .bash-history {
  width: 100%;
  background: none;
  padding-left: 2%;
  padding-right: 2%;
  box-sizing: border-box;
  scroll-snap-align: start;
}

.cli-container .cli-wrapper {
  outline: none;
  caret-color: transparent;
  background: none;
  flex-grow: 1;
  padding-left: 2%;
  padding-right: 2%;
}

.pre-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  background: inherit;
  color: inherit;
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
  padding: 10px 10px;
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
