<template>
  <div class="container">
    <div class="box-container">
      <div class="box-ghost">
        <div class="symbol" />
        <div class="symbol" />
        <div class="symbol" />
        <div class="symbol" />
        <div class="symbol" />
        <div class="symbol" />

        <div class="ghost-container">
          <div class="ghost-eyes-container">
            <div class="eye" />
            <div class="eye" />
          </div>
          <div class="ghost-feet-container">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        <div class="ghost-shadow" />
      </div>
      <div class="text-container" tabindex="0">
        <h2 aria-label="Sue Me Ma Sane">すみません</h2>
        <p>I'm sorry, I can't find this page.</p>
        <router-link to="/" class="content-link not-found" aria-label="Go back to the main page">
          <span>Go Back</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import { onMounted, onUnmounted } from 'vue';
import { setUpAnimation, stopAnimation } from '../components/helpers/animate';

export default {
  name: 'NotFound',
  setup() {
    let tl;
    onMounted(() => {
      tl = setUpAnimation(anime);
      tl.play();
    });

    onUnmounted(() => {
      stopAnimation(tl, anime);
    });
  },
};
</script>

<style scoped>
.container {
  --base-animation-border: 5px;
  --animation-shadow: #695e46;

  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  border-radius: var(--base-animation-border);
  box-sizing: border-box;
  padding: 0;

  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
}
@media all and (min-width: 600px) {
  .container {
    padding: 5%;
    background-color: transparent;
  }
}

.box-container {
  position: relative;
  box-sizing: border-box;
  left: 50%;
  height: 100%;
  padding: 50px;
  min-height: 400px;
  max-height: 600px;
  max-width: 600px;
  background-color: var(--light-red);
  border-radius: calc(var(--base-animation-border) * 1);
  transform: translate3d(-50%, 0, 0);
}

.box-ghost {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate3d(-50%, -30%, 0);
  padding: 15px 25px 25px;
}

.ghost-container {
  position: relative;
  margin: 0 auto;
  background-color: var(--white);
  width: 100px;
  height: 100px;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  animation: updown 3s ease-in-out infinite;
}

.ghost-eyes-container {
  position: absolute;
  top: 40%;
  left: 50%;
  height: 12px;
  width: 70px;
  transform: translateX(-50%) translateZ(0);
}

.ghost-eyes-container .eye {
  width: 12px;
  height: 12px;
  background-color: var(--black);
  border-radius: 50%;
  margin: 0 10px;
  position: absolute;
}
.ghost-eyes-container .eye:first-child {
  left: 0;
}
.ghost-eyes-container .eye:last-child {
  right: 0;
}

.ghost-feet-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
}

.ghost-feet-container > div {
  flex-grow: 1;
  position: relative;
  top: -10px;
  height: 20px;
  background-color: var(--white);
  border-radius: 100%;
}
.ghost-feet-container > div:nth-child(2n) {
  margin: 0;
  border-top: 10px solid var(--animation-gray);
  background-color: transparent;
}
.ghost-shadow {
  height: 20px;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 0 30px 15px 5px var(--animation-shadow);
  animation: smallbig 3s ease-in-out infinite;
}

.symbol {
  opacity: 0.2;
  animation-name: shine;
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-delay: 3s;
  animation-iteration-count: infinite;
}
.symbol:before,
.symbol:after {
  content: '';
  position: absolute;
  width: 12px;
  height: 4px;
  background: var(--white);
  border-radius: 5px;
}

.symbol:nth-of-type(2) {
  position: absolute;
  left: -5px;
  top: 30px;
  height: 12px;
  width: 12px;
  border: 4px solid;
  border-radius: 50%;
  border-color: var(--white);
  animation-delay: 1.3s;
}
.symbol:nth-of-type(3) {
  animation-duration: 3s;
  animation-delay: 0.5s;
}
.symbol:nth-of-type(4) {
  animation-duration: 6s;
  animation-delay: 1.6s;
}
.symbol:nth-of-type(5) {
  position: absolute;
  right: 5px;
  top: 40px;
  height: 8px;
  width: 8px;
  border: 3px solid;
  border-radius: 50%;
  border-color: var(--white);
  animation-duration: 1.7s;
  animation-delay: 7s;
}
.symbol:nth-of-type(6) {
  animation-duration: 2s;
  animation-delay: 6s;
}

.symbol:first-of-type:before,
.symbol:first-of-type::after {
  bottom: 65px;
  left: 0;
}
.symbol:first-of-type:before {
  transform: rotate(45deg);
}
.symbol:first-of-type::after {
  transform: rotate(-45deg);
}

.symbol:nth-of-type(2):before,
.symbol:nth-of-type(2)::after,
.symbol:nth-of-type(5):before,
.symbol:nth-of-type(5)::after {
  content: none;
}

.symbol:nth-of-type(3):before,
.symbol:nth-of-type(3)::after {
  top: 5px;
  left: 40px;
}
.symbol:nth-of-type(3):before {
  transform: rotate(90deg);
}
.symbol:nth-of-type(3):after {
  transform: rotate(180deg);
}

.symbol:nth-of-type(4):before,
.symbol:nth-of-type(4)::after {
  width: 15px;
  top: 10px;
  right: 30px;
}
.symbol:nth-of-type(4):before {
  transform: rotate(45deg);
}
.symbol:nth-of-type(4)::after {
  transform: rotate(-45deg);
}

.symbol:nth-of-type(6):before,
.symbol:nth-of-type(6)::after {
  width: 15px;
  bottom: 65px;
  right: -5px;
}
.symbol:nth-of-type(6):before {
  transform: rotate(90deg);
}
.symbol:nth-of-type(6)::after {
  transform: rotate(180deg);
}

.text-container {
  color: var(--black);
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
}

.text-container h2 {
  margin: 1rem auto;
  padding: 0;
  font-size: 7vmin;
  font-weight: 800;
  line-height: 1.2em;
  margin: auto;
}
.text-container p {
  margin: 1rem auto;
  padding: 0;
  font-size: 1.2rem;
  line-height: 1.5;
}
@media all and (min-width: 600px) {
  .text-container h2 {
    font-size: 2.5rem;
  }
}

.content-link.not-found {
  color: var(--white);
  font-weight: 500;
}
.content-link.not-found:before {
  bottom: -10px;
  background-color: var(--white);
}
@media (hover: hover) {
  .content-link.not-found:hover:before {
    height: 10px;
  }
}

@keyframes updown {
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(5px);
  }
}

@keyframes smallbig {
  0% {
    width: 90px;
  }
  50% {
    width: 100px;
  }

  100% {
    width: 90px;
  }
}

@keyframes shine {
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
