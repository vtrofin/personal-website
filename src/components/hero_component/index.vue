<template>
  <section class="hero-section">
    <h1 class="hero-title">Hi. I'm Victor. <span class="text-block">A web programmer.</span></h1>
    <p class="hero-subtitle">
      I'm a full-stack web engineer with a passion for bringing products to life. Currently living
      in Kyoto and working for
      <a href="https://www.shipandco.com/ja/" aria-label="Visit Ship&co website">Ship&co</a>
    </p>
    <div class="cli-container">
      <div class="decoration-block top-left" aria-hidden="true"></div>
      <div class="decoration-block top-right" aria-hidden="true"></div>
      <div class="decoration-block bottom-left" aria-hidden="true"></div>
      <div class="decoration-block top-right" aria-hidden="true"></div>
      <div class="cli-wrapper"></div>
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
@media all and (min-width: 768px) {
  span.text-block {
    display: block;
  }
}
</style>
