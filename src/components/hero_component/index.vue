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
        />
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
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
    });

    onUnmounted(() => {
      cliObserver.disconnect();
    });

    const handleInput = event => {
      const isSubmit =
        event?.inputType === 'insertParagraph' ||
        (event?.data === null && event?.inputType === 'insertText');

      if (isSubmit) {
        const text = cliWrapperActiveText.value.innerText;
        cliWrapperActiveText.value.innerText = '';
        return store.dispatch({ type: 'hero/pushLine', text });
      }
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
  height: 350px;
  background-color: var(--black);
  border-radius: 15px;
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: Monaco, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: left;
  padding: 1rem 0.5rem;
  color: var(--white);
  outline: none;
  display: flex;
  flex-direction: column;
}

.cli-container .cli-wrapper {
  outline: none;
  caret-color: transparent;
  background: none;
  flex-grow: 1;
}

.bash-history {
  width: 100%;
}

.cli-wrapper .bash-text {
  display: inline-block;
  /* word-wrap: break-word; */
  /* overflow: hidden; */
}

/* .cli-wrapper .bash-text:after {
  position: absolute;
  top: 0px;
  right: -15px;
  content: '';
  width: 0.5rem;
  height: 1rem;
  line-height: 1.2rem;
  background-color: #606060;
  vertical-align: top;
  -webkit-animation: cursor-blink 1s step-end infinite;
  animation: cursor-blink 1s step-end infinite;
} */

.pre-text {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.bash-text .static-text {
  display: inline-block;
}

.bash-text .pre-text {
  display: inline-block;
  outline: none;
}

/* @-webkit-keyframes cursor-blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes cursor-blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
} */

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

@media all and (min-width: 768px) {
  span.text-block {
    display: block;
  }
}

[contenteditable] {
  -webkit-user-select: text;
  user-select: text;
  border: 1px solid red; /* dev */
}
</style>
