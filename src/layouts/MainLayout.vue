<template>
  <HeaderComponent :modifier="modifier" />
  <main>
    <div class="content">
      <router-view />
    </div>
  </main>
  <FooterComponent />
</template>

<script lang="ts">
import HeaderComponent from "@components/Header.vue";
import FooterComponent from "@components/Footer.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: { HeaderComponent, FooterComponent },
  props: {
    modifier: { type: String, required: false, default: "" },
  },
});
</script>
<style>
main {
  width: 100%;
}

/* Fix scolling lag in Safari: only the body is painted while scrolling. Content is painted with a delay
https://stackoverflow.com/a/26682113/20296910
*/
main * {
  -webkit-transform: translate3d(0, 0, 0);
}

main .content,
.project-header-container .content {
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
}

.content-link,
.contact-link {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  z-index: 10;
  color: #232320;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  /* linear */
  touch-action: manipulation;
}

.contact-link span,
.content-link span {
  z-index: 10;
  position: relative;
}

.content-link:before,
.contact-link:before {
  display: block;
  z-index: 5;
  content: "";
  width: 100%;
  position: absolute;
  bottom: -3px;
  left: 0;
  height: 3px;
  background-color: var(--red);
  transition: all 0.2s ease-in-out;
  /* linear */
  transform: rotate(-1deg);
}

.content-link.reversed:before,
.contact-link.reversed:before {
  transform: rotate(1deg);
}

@media (hover: hover) {

  .content-link:hover:before,
  .contact-link:hover:before {
    height: 10px;
  }
}

.content-image {
  width: 100%;
  filter: drop-shadow(0 52px 74px rgba(0, 21, 64, 0.14));
  border-radius: var(--base-border);
  user-select: none;
  margin: 2rem auto 1rem;
  max-width: 1000px;
  display: block;
}

/* Modifier classes */
/* Font and background colors */
.eyeq-active,
.eyeq-project-active {
  background-color: var(--peach);
  color: var(--black);
}

.calliope-active,
.calliope-project-active {
  background-color: var(--light-blue);
  color: var(--black);
}

.ats-active,
.ats-project-active {
  background-color: var(--light-yellow);
  color: var(--black);
}

.shipandco-active,
.shipandco-project-active {
  background-color: var(--pink);
  color: var(--black);
}


.scoville-active {
  background-color: var(--pink);
  color: var(--black);
}

.bertrandco-active {
  background-color: var(--light-yellow);
  color: var(--black);
}

/* Backgrounds  */
.shipandco-background,
.shipandco-project-active {
  background-image: url("/shipandco.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.shipandco-background {
  background-position: -150px center;
}

.shipandco-project-active {
  background-position: right center;
}

@media all and (min-width: 800px) {

  .shipandco-background,
  .shipandco-project-active {
    background-position: center center;
  }
}

@media all and (min-width: 1400px) {
  .shipandco-project-active {
    background-position: center top;
    background-image: url("/public/shipandco_highres.png");
  }
}

/* Icons and Logos  */
.shipandco-logo {
  background-image: url("/public/logo-shipandco.svg");
}

.scoville-logo {
  background-image: url("/public/logo-scoville.svg");
}
</style>
