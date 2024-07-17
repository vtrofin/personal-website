<template>
  <div class="brand">
    <router-link to="/" aria-label="Go to the Homepage" class="main-link">
      <div :class="modifierClass ? 'logo' + ' ' + modifierClass : 'logo'">
        <svg viewBox="0 0 200 200" height="50" width="50">
          <path
            :class="modifierClass ? modifierClass : ''"
            stroke-width="0"
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
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderLogo',
  props: { modifierClass: { type: String, default: '', required: false } },
});
</script>
<style scoped>
.brand {
  --logo-size: 50px;
}

.main-link {
  display: none;
  position: absolute;
  left: 50%;
  bottom: -15px;
  transform: translate3d(-50%, 0, 0);
}

@media all and (min-width: 600px) {
  .main-link {
    display: block;
  }
}

.logo {
  position: relative;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media (hover: hover) {
  .logo:hover {
    transform: rotate(10deg) scale(1.1);
  }
}

.logo:before {
  content: '>_';
  position: absolute;
  text-align: center;
  color: var(--black);
  font-size: 0.7rem;
  z-index: 99999;
  font-weight: bold;
  line-height: var(--logo-size);
  margin: 0 0 0 17px;
}

svg path {
  position: absolute;
  fill: none;
  stroke-width: 6;
  top: 0;
  left: 0;
  stroke: #232320;
}

/* modifiers */
.logo.bentoandco:before,
.logo.utils:before {
  color: var(--white);
}

.logo.staff:before {
  color: var(--black);
}

svg path.bentoandco,
svg path.utils {
  stroke: var(--white);
}

svg path.staff {
  stroke: var(--black);
}
</style>
