<template>
  <section class="hero-section">
    <div class="hero-title">
      <h1>Hi. I'm Victor. <span class="text-block">A web engineer.</span></h1>
    </div>
    <div class="hero-subtitle">
      <p>
        I'm a full-stack web engineer with a passion for bringing products to life. Currently living
        in Kyoto and working for
        <a href="https://www.shipandco.com/ja/" aria-label="Visit Ship&co website">Ship&co</a>
      </p>
    </div>
    <div class="cli-container" ref="cliContainer">
      <div class="bash-history" v-for="(line, i) in bashHistory" :key="i" :aria-label="line">
        {{ staticText }} <span class="pre-text">{{ line }}</span>
      </div>
      <div class="cli-wrapper" @click.stop.prevent="refocusActiveTextLine">
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
  </section>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { handleCursorReposition, handleCaretReposition } from '../helpers';

export default {
  emits: {
    // https://vueschool.io/lessons/defining-custom-events-emits
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

    onMounted(() => {
      cliWrapperActiveText.value.contentEditable = true;
      cliWrapperActiveText.value.focus();

      const observeHandler = entries => {
        try {
          if (entries?.[0]?.isIntersecting) {
            if (cliWrapperActiveText.value !== document.activeElement) {
              cliWrapperActiveText.value.focus();
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

      return handleCursorReposition({ store, domRef: cliWrapperActiveText.value, offsetY: 2 })
        .then(() => emit('update-caret-position'))
        .catch(err => console.log('Failed to update caret position', err.message));
    });

    onUnmounted(() => {
      cliObserver.disconnect();
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
        windowElem: isSubmit ? undefined : window,
        domRef: cliWrapperActiveText.value,
        offsetY: isSubmit ? 2 : 1,
        store,
      })
        .then(() => emit('update-caret-position'))
        .catch(err => console.log('Failed to update caret position', err.message));
    };

    const handleKeyUp = async event => {
      const isArrowKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key);
      if (!isArrowKey) {
        return;
      }
      return handleCursorReposition({ store, windowElem: window, offsetY: 1 })
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
  font-size: 3.2rem;
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

@media all and (min-width: 1000px) {
  .hero-section .hero-title h1 {
    font-size: 4.2rem;
  }
  .hero-section .hero-subtitle p {
    padding-right: 3.5rem;
  }
}

.hero-section .cli-container {
  display: flex;
  flex-direction: column;
  height: 350px;
  background-color: var(--black);
  color: var(--white);
  border-radius: 15px;
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: Monaco, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.1rem;
  text-align: left;
  padding: 1rem 0.5rem;
  outline: none;
}

.cli-container .bash-history {
  width: 100%;
  background: none;
}

.cli-container .cli-wrapper {
  outline: none;
  caret-color: transparent;
  background: none;
  flex-grow: 1;
}

.pre-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  outline: none;
  background: inherit;
  color: inherit;
}

@media all and (min-width: 768px) {
  span.text-block {
    display: block;
  }
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
  .hero-section .cli-container {
    grid-column: 2 / 3;
    grid-row: 1/ 5;
    height: 550px;
  }
}

[contenteditable] {
  -webkit-user-select: text;
  user-select: text;
  border: 1px solid red;
}
</style>
