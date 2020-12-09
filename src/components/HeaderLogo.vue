<template>
  <div class="brand">
    <div class="logo">
      <svg viewBox="0 0 200 200">
        <path
          stroke="#ff004e"
          stroke-width="0"
          fill="#ff004e"
          d="M140.773,59.227C137.316,55.771,130.055,50,100,50
        s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
        C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
        S144.229,62.683,140.773,59.227z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.brand {
  --logo-size: 50px;
}

.brand {
  flex-grow: 1;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
}

.logo {
  position: relative;
  display: none;
  margin-left: calc(var(--logo-size) / 2);
}
@media all and (min-width: 320px) {
  .logo {
    display: block;
  }
}

/* .brand:before {
  content: '>';
  position: absolute;
  text-align: center;
}
.brand:after {
  content: '_';
  position: absolute;
  text-align: center;
} */

svg {
  width: var(--logo-size);
  height: var(--logo-size);
  /* position: absolute;
  left: calc(var(--logo-size) / 2);
  bottom: calc(var(--logo-size) / -2); */
}

/*

.brand:before {
  background-size: 100% 100%;

  line-height: 205px;
  color: #ff004e;
  font-size: 20px;
  font-family: 'HEAVITAS', 'Helvetica Rounded', Arial, sans-serif;
  font-weight: bold;

  width: 200px;
  height: 200px;
  margin: 0 auto;


  z-index: 99999 !important;
}

svg path {
  position: absolute;
  fill: none;
  stroke-width: 2;
  top: 0;
  left: 0;
  transform-origin: 50% 50%;
  transform: rotate(0deg);
  animation: 4s linear infinite;
} */
</style>
