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
import { defineComponent, PropType } from "vue";
import { type ProjectName } from "src/globals";

export default defineComponent({
  name: "MainLayout",
  components: { HeaderComponent, FooterComponent },
  props: {
    modifier: { type: String as PropType<ProjectName>, required: false, default: "" },
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
  color: var(--color-text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
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
  background-color: var(--color-accent);
  transition: all 0.2s ease-in-out;
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
  background-color: var(--color-accent-eyeq);
  color: var(--color-surface);
}

.calliope-active,
.calliope-project-active {
  background-color: var(--color-accent-calliope);
  color: var(--color-surface);
}

.ats-active,
.ats-project-active {
  background-color: var(--color-accent-ats);
  color: var(--color-surface);
}

.shipandco-active,
.shipandco-project-active {
  background-color: var(--color-accent-shipandco);
  color: var(--color-surface);

}

.dummy-active,
.dummy-project-active {
  background-color: var(--color-accent-dummy);
  color: var(--white);
}

.scoville-active {
  background-color: var(--color-accent-scoville);
  color: var(--color-surface);
}

.bertrandco-active {
  background-color: var(--color-accent-bertrandco);
  color: var(--color-surface);
}


/* Icons and Logos  */
.scoville-logo {
  background-image: url("/logo-scoville.svg");
}
</style>
