<template>
  <section class="hero-section">
    <div class="hero-title">
      <h1>Hi. I'm Victor. <span class="text-block">A web engineer.</span></h1>
    </div>
    <div class="hero-subtitle">
      <p>
        I'm a full-stack web developer with a passion for bringing products to life. Currently
        living in Kyoto and working for
        <a href="https://www.shipandco.com/ja/" aria-label="Visit Ship&co website">Ship&co</a>
      </p>
    </div>
    <div class="cli-container" ref="cliContainer">
      <div class="cli-wrapper">
        <div class="bash-history" v-for="(line, i) in bashHistory" :key="i" :aria-label="line">
          {{ staticText }} <span class="pre-text">{{ line }}</span>
        </div>
      </div>
      <div
        class="cli-wrapper"
        tabindex="0"
        ref="cli"
        @keyup.prevent="disableControl"
        @keydown.prevent="enableControl($event), appendChar($event)"
        @paste.stop.prevent="handlePaste"
      >
        <div class="bash-text">
          {{ staticText }} <span class="pre-text">{{ currentLine }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { checkKeyMatch, isControlKey, isArrowKey } from '../../helpers';

export default {
  setup() {
    // ctrl or command key is pressed; handles pasting on ctrl + v
    const control = ref(false);
    const store = useStore();
    const bashHistory = computed(() => store.getters['hero/getBashHistory']);
    const currentLine = computed(() => store.getters['hero/getCurrentLine']);
    const staticText = computed(() => store.getters['hero/getStaticText']);
    const cli = ref(null);
    const cliContainer = ref(null);
    let cliObserver = null;

    const handleResize = () => {
      cli.value.style.maxWidth = `${cliContainer.value.clientWidth - 16}px`; // 0.5rem padding left right on .cli-wrapper element
    };

    window.addEventListener('resize', handleResize);

    onMounted(() => {
      cli.value.focus();
      // fix for ios => display keyboard on the cli
      cli.value.contentEditable = true;
      handleResize();

      // check when cli is visible in viewport
      cliObserver = new IntersectionObserver(
        entries => {
          try {
            if (entries?.[0]?.isIntersecting) {
              // if cli not focused, focus..
              if (cli.value !== document.activeElement) {
                cli.value.focus();
              }
            } else {
              cli.value.blur();
            }
          } catch (err) {
            throw new Error('Intersection Observer Failed on this browser');
          }
        },
        { root: null, threshhold: [0.2] }
      );

      cliObserver.observe(cli.value);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      cliObserver.disconnect();
    });

    const enableControl = event => {
      if (event.metaKey || event.ctrlKey) {
        control.value = true;
      }
    };

    const disableControl = event => {
      if (event.metaKey || event.ctrlKey) {
        control.value = false;
      }
    };

    // copy paste text
    const handlePaste = event => {
      try {
        const clipboard = event.clipboardData || window.clipboardData;
        const data = clipboard.getData('Text');
        store.dispatch({ type: 'hero/pasteText', data });
      } catch (err) {
        throw new Error('paste not supported in this browser');
      }
    };

    const appendChar = async event => {
      if (!event) return;
      const isSubmit = checkKeyMatch({ event, name: 'Enter', code: 13 });
      const isBack = checkKeyMatch({ event, name: 'Backspace', code: 8 });
      const isDel = checkKeyMatch({ event, name: 'Delete', code: 46 });
      const isTab = checkKeyMatch({ event, name: 'Tab', code: 9 });
      // console.log('event is --->', event);
      if (isSubmit) {
        return store.dispatch({ type: 'hero/pushLine' });
      }
      // if delete remove from current
      if (isBack || isDel) {
        return store.dispatch({ type: 'hero/removeChar' });
      }

      if (isTab) {
        const promises = new Array(2).fill('hero/appendChar').map(type => {
          store.dispatch({ type, char: ' ' });
        });
        return await Promise.all(promises);
      }
      //if control key ignore
      if (isControlKey(event) || isArrowKey(event)) return;

      // if control v paste
      const isControlOn = !!control.value;
      const pressedKey = (event.key || '').toLowerCase();
      if (isControlOn && (pressedKey === 'v' || event.keyCode === 86)) {
        const clipboard = await window.navigator.clipboard.readText();
        return store.dispatch({ type: 'hero/pasteText', data: clipboard });
      }

      // if key append
      store.dispatch({
        type: 'hero/appendChar',
        char: event.key,
        charCode: event.keyCode,
      });
    };

    /* focus cli on click on <main> element  */
    // @click.self="refocusCli"
    // const refocusCli = event => {
    //   return true;
    // };
    // refocusCli,

    /* refocus cli on blur, if still visible. requires saving if cli is visible in a variable 
    and editing this state inside the intersection observer */
    // @blur="handleBlur"
    // const cliVisible = ref(false);
    // cliVisible.value = true;
    // cliVisible.value = true;
    // cliVisible.value = false;
    // const handleBlur = event => {
    //   if (cliVisible.value) {
    //     cli.value.focus();
    //   }
    // };
    // handleBlur,

    return {
      bashHistory,
      currentLine,
      staticText,
      cli,
      cliContainer,
      appendChar,
      handlePaste,
      enableControl,
      disableControl,
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
}

.cli-container .cli-wrapper {
  outline: none;
  caret-color: transparent;
  background: none;
}

.cli-wrapper .bash-history {
  width: 100%;
}

.cli-wrapper .bash-text {
  position: relative;
  display: inline-block;
  width: 100%;
  /* word-wrap: break-word; */
  /* overflow: hidden; */
}

.cli-wrapper .bash-text:after {
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
}

.pre-text {
  white-space: pre-wrap;
  word-wrap: break-word;
}

@-webkit-keyframes cursor-blink {
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
  }
  .cli-container .cli-wrapper {
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
