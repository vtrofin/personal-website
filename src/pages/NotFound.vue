<template>
  <div class="container">
    <div class="box-container">
      <div class="box-ghost">ttt ttt ttt</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
/* https://codepen.io/diogo_ml_gomes/pen/PyWdLb */
.container {
  --base-animation-border: 5px;
  --animation-gray: #574b33;

  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: auto;
  padding-bottom: 20px;
}

.box-container {
  box-sizing: border-box;
  height: 100%;
  padding: 50px;
  background-color: var(--animation-gray);
  border-radius: var(--base-animation-border);
}

.box-ghost {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate3d(-50%, -50%, 0);
  padding: 15px 25px 25px;
  border: 1px solid red;
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
