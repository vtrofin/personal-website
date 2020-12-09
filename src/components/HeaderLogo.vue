<template>
  <div class="brand">
    <router-link to="/" aria-label="Start page" class="main-link">
      <div class="logo">
        <svg viewBox="0 0 200 200">
          <path
            stroke-width="0"
            stroke="#574B33"
            fill="#574B33"
            d="M140.773,59.227C137.316,55.771,130.055,50,100,50
        s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
        C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
        S144.229,62.683,140.773,59.227z"
          />
        </svg>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.brand {
  --logo-size: 50px;
  flex-grow: 1;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
}
.main-link {
  margin-left: calc(var(--logo-size) / 2);
  display: none;
}
@media all and (min-width: 320px) {
  .main-link {
    display: block;
  }
}
.logo {
  position: relative;
}
.logo:hover {
  transform: rotate(10deg) scale(1.1);
}

.logo:before {
  content: '>_';
  position: absolute;
  text-align: center;
  color: var(--logo-gray);
  font-size: 0.8rem;
  z-index: 99999;
  font-weight: bold;
  line-height: var(--logo-size);
  margin: 0 0 0 16px;
}

svg {
  width: var(--logo-size);
  height: var(--logo-size);
}
svg path {
  position: absolute;
  fill: none;
  stroke-width: 6;
  top: 0;
  left: 0;
  transform-origin: 50% 50%;
  transform: rotate(0deg);
  animation: 4s linear infinite;
}

/*


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
