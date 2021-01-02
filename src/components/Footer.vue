<template>
  <footer>
    <div class="section-header-container">
      <h2 class="section-header">Connect</h2>
    </div>
    <div class="footer-container">
      <p>text text text text text text text text</p>
      <p>text text text text text text text text</p>
      <p>text text text text text text text text</p>
      <p>text text text text text text text text</p>
      <p>text text text text text text text text</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
footer {
  grid-row-start: -1;
  background: linear-gradient(39.4deg, var(--light-magenta) -5%, rgba(182, 160, 234, 0) 155%),
    var(--light-teal);
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
}
.footer-container {
  width: 90%;
  max-width: 1280px;
  background-color: yellow;
  color: black;
  margin: 0 auto;
  padding: 0;
  border: 1px solid red; /* dev */
}

/*

.general-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 120px auto;
  box-sizing: border-box;
  padding-top: 2.5rem;
}

 */
</style>
