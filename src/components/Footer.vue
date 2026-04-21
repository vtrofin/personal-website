<template>
  <footer>
    <div class="section-header-container">
      <h2 class="section-header">Connect</h2>
    </div>
    <div class="footer-container">
      <h3 class="item-title" tabindex="0">Want to hire me?</h3>
      <p class="item-text">
        Feel free to
        <a
          class="contact-link reversed"
          href="mailto:trofin.victor@gmail.com?subject=Hi"
          target="_blank"
          rel="noopener"
        >
          <span> send me a message </span>
        </a>
        .
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style>
footer {
  grid-row-start: -1;
  background: var(--color-accent-inverted);
  color: var(--color-text-primary);
  width: 100%;
  margin-top: 2.5rem;
}

.section-header-container {
  background-color: var(--background-white);
}

footer .section-header {
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  line-height: 0.5em;
}

.footer-container {
  display: grid;
  grid-gap: 20px;
  width: 90%;
  max-width: 1280px;
  color: var(--black);
  margin: 0 auto;
  padding: 0;
  text-align: left;
}

@media all and (min-width: 600px) {
  .footer-container {
    grid-template-columns: 5fr 1fr;
    grid-template-rows: repeat(2 auto);
    margin-bottom: 3rem;
  }

  .footer-container h3.item-title {
    grid-column: 1/2;
  }

  .footer-container p.item-text {
    grid-column: 1/2;
  }

}

.footer-container h3.item-title {
  font-size: 7vmin;
  font-weight: 500;
  margin-left: 0;
  margin-bottom: 0;
  word-break: normal;
}

@media all and (min-width: 600px) {
  .footer-container h3.item-title {
    font-size: 1.8rem;
  }
}

.footer-container p.item-text {
  max-width: 100%;
  padding-bottom: 1rem;
  margin-left: 0;
  margin-bottom: 0;
  width: auto;
}

.footer-container .contact-link {
  color: var(--color-text-primary);
}

.footer-container .contact-link:before {
  background-color: var(--color-accent);
}
</style>
