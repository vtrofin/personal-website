<template>
  <footer>
    <div class="footer-container">this is the footer</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
footer {
  grid-row-start: -1;
  background: #42a5f5;
  color: white;
  width: 100%;
  padding: 20px 0;
}
.footer-container {
  max-width: 90%;
  margin: 0 auto;
}
</style>
