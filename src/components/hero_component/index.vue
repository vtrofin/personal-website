<template>
  <section class="hero-section">
    <h1 class="hero-title">Hi. I'm Victor. <span class="text-block">A web engineer.</span></h1>
    <p class="hero-subtitle">
      I'm a full-stack web developer with a passion for bringing products to life. Currently living
      in Kyoto and working for
      <a href="https://www.shipandco.com/ja/" aria-label="Visit Ship&co website">Ship&co</a>
    </p>
    <div class="cli-container">
      <!-- not sure i want to add the four blocks anymore -->
      <div class="decoration-block top-left" aria-hidden="true" />
      <div class="decoration-block top-right" aria-hidden="true" />
      <div class="decoration-block bottom-left" aria-hidden="true" />
      <div class="decoration-block top-right" aria-hidden="true" />
      <div tabindex="0" class="cli-wrapper" ref="cli" @keydown.prevent="appendChar">
        <div class="bash-history" v-for="(line, i) in bashHistory" :key="i" :aria-label="line">
          Victors-MBP:~ victor$ <span class="pre-text">{{ line }}</span>
        </div>
        <!-- instead of using input, use a div with onKeyPress events || if key is enter => mutate;; otherwise append to state -->
        <!-- basically append text to the text below -->
        <div class="bash-text">
          Victors-MBP:~ victor$ <span class="pre-text">{{ currentLine }}</span>
        </div>
        <!-- <input type="text" value="npm install -g foobar" /> -->
      </div>
    </div>
    <!-- <h1>This is the homepage</h1>
    this is the hero component -->
  </section>
</template>

<script>
// animation on sean halpin website make the cornea translateX and translateY + scale(0.7 -> 1);
// the entire eye, translateY and the entire eye scale (4)

import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { checkKeyMatch, isControlKey, isArrowKey } from '../../helpers';

export default {
  setup() {
    const store = useStore();
    const bashHistory = computed(() => store.getters['hero/getBashHistory']);
    const currentLine = computed(() => store.getters['hero/getCurrentLine']);
    const cli = ref(null);

    onMounted(() => {
      cli.value.focus();
    });

    const appendChar = async event => {
      console.log(event.key + ' | ' + event.keyCode);
      if (!event) return;
      const isSubmit = checkKeyMatch({ event, name: 'Enter', code: 13 });
      const isBack = checkKeyMatch({ event, name: 'Backspace', code: 8 });
      const isDel = checkKeyMatch({ event, name: 'Delete', code: 46 });
      const isTab = checkKeyMatch({ event, name: 'Tab', code: 9 });

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
        // await store.dispatch({ type: 'hero/appendChar', char: ' ' });
        // return store.dispatch({ type: 'hero/appendChar', char: ' ' });
      }

      //if control key ignore
      if (isControlKey(event) || isArrowKey(event)) return;
      // if key append
      store.dispatch({
        type: 'hero/appendChar',
        char: event.key,
        charCode: event.keyCode,
      });
    };

    return {
      bashHistory,
      currentLine,
      cli,
      appendChar,
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

.hero-section h1,
.hero-section p {
  margin: 0;
  padding: 0;
  border: 1px solid red; /* dev */
}

.hero-section .cli-container {
  border: 1px solid red; /* dev */
}

.cli-container .cli-wrapper {
  height: 350px;
  background-color: var(--black);
  border-radius: 20px;
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

.cli-wrapper .bash-text {
  position: relative;
  display: inline-block;
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
  .hero-section h1,
  .hero-section p {
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
</style>
