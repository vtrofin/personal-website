<template>
  <footer>
    <div class="section-header-container">
      <h2 class="section-header">Connect</h2>
    </div>
    <div class="footer-container">
      <h3 class="item-title" tabindex="0">
        Want to hire me?
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
      </h3>
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
  /* padding-bottom: 2.5rem; */
}

.section-header-container {
  background-color: var(--color-surface-light);
}

footer .section-header {
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  line-height: 0.5em;
}

.footer-container {
  width: 90%;
  max-width: 1280px;
  color: var(--color-text-primary);
  margin: 0 auto;
  padding: 0;
  text-align: left;
}

.footer-container h3.item-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 3rem 0;
  word-break: break-word;
}

.footer-container .contact-link {
  color: inherit;
}

.footer-container .contact-link:before {
  background-color: var(--color-accent);
}
</style>
