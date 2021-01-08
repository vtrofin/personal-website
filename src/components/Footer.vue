<template>
  <footer>
    <div class="section-header-container">
      <h2 class="section-header">Connect</h2>
    </div>
    <div class="footer-container">
      <h3 class="item-title">Want to work with me?</h3>
      <p class="item-text">
        I do take on freelance opportunities. Feel free to
        <a
          class="contact-link reversed"
          href="mailto:#?subject=Hi"
          target="_blank"
          rel="noopener"
          aria-label="Write me an email"
        >
          <span>send me a message </span></a
        >.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: { modifier: { type: String, required: false, default: '' } },
};
</script>

<style>
footer {
  grid-row-start: -1;
  background: linear-gradient(39.4deg, var(--magenta) -2.55%, rgba(182, 160, 234, 0) 45.21%),
    var(--light-magenta);
  color: var(--black);
  width: 100%;
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
  width: 90%;
  max-width: 1280px;
  color: black;
  margin: 0 auto;
  padding: 0;
  text-align: left;
}
.footer-container p.item-text {
  max-width: 100%;
  padding-bottom: 2.5rem;
}
.footer-container h3.item-title {
  font-size: 8vmin;
  font-weight: 500;
}

@media all and (min-width: 600px) {
  .footer-container h3.item-title {
    font-size: 2.2rem;
  }
}
</style>
