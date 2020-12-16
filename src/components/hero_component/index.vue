<template>
  <section class="hero-section">
    <h1 class="hero-title">Hi. I'm Victor. <span class="text-block">A web engineer.</span></h1>
    <p class="hero-subtitle">
      I'm a full-stack web developer with a passion for bringing products to life. Currently living
      in Kyoto and working for
      <a href="https://www.shipandco.com/ja/" aria-label="Visit Ship&co website">Ship&co</a>
    </p>
    <div class="cli-container">
      <div class="decoration-block top-left" aria-hidden="true" />
      <div class="decoration-block top-right" aria-hidden="true" />
      <div class="decoration-block bottom-left" aria-hidden="true" />
      <div class="decoration-block top-right" aria-hidden="true" />
      <div class="cli-wrapper" style="">some filler here</div>
    </div>
    <!-- <h1>This is the homepage</h1>
    this is the hero component -->
  </section>
</template>

<script>
// to do: all text in this page to be put in vuex and fetched directly from there
// animation on sean halpin website make the cornea translateX and translateY + scale(0.7 -> 1);
// the entire eye, translateY and the entire eye scale (4)
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
}

@media all and (min-width: 768px) {
  span.text-block {
    display: block;
  }
}
</style>
