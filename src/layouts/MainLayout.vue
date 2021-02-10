<template>
  <Header :modifier="modifier" @toggle-toolbox="relayToggle" />
  <main>
    <div class="content">
      <router-view />
    </div>
  </main>
  <Footer :modifier="modifier" />
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';

export default {
  name: 'MainLayout',
  components: { Header, Footer },
  props: {
    modifier: { type: String, required: false, default: '' },
  },
  emits: {
    relayToggleToolbox: null,
  },
  setup(props, context) {
    const { emit } = context;
    const relayToggle = () => emit('relayToggleToolbox');
    return { relayToggle };
  },
};
</script>
<style>
main {
  width: 100%;
}

main .content,
.project-header-container .content {
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
}

.content-link,
.contact-link {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  z-index: 10;
  color: #232320;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out; /* linear */
  touch-action: manipulation;
}

.contact-link span,
.content-link span {
  z-index: 10;
  position: relative;
}

.content-link:before,
.contact-link:before {
  display: block;
  z-index: 5;
  content: '';
  width: 100%;
  position: absolute;
  bottom: -3px;
  left: 0;
  height: 3px;
  background-color: var(--red);
  transition: all 0.2s ease-in-out; /* linear */
  transform: rotate(-1deg);
}

.content-link.reversed:before,
.contact-link.reversed:before {
  transform: rotate(1deg);
}

@media (hover: hover) {
  .content-link:hover:before,
  .contact-link:hover:before {
    height: 10px;
  }
}

.content-image {
  width: 100%;
  filter: drop-shadow(0 52px 74px rgba(0, 21, 64, 0.14));
  border-radius: var(--base-border);
}

/* Modifier classes */
/* Font and background colors */
.shipandco-active,
.shipandco-project-active {
  background-color: var(--pink);
  color: var(--black);
}
.stockandco-active,
.stockandco-project-active {
  color: var(--black);
}
.staff-active,
.staff-project-active {
  background-color: var(--light-yellow);
  color: var(--black);
}
.utils-active,
.utils-project-active {
  background-color: var(--red);
  color: var(--white);
}
.bentoandco-active,
.bentoandco-project-active {
  background-color: var(--light-green);
  color: var(--white);
}
.bertrandco-active {
  background-color: var(--pink);
  color: var(--black);
}
.smoothjapan-active {
  background-color: var(--light-yellow);
  color: var(--black);
}

/* Backgrounds  */
.shipandco-background,
.shipandco-project-active {
  background-image: url('/shipandco.png');
  background-size: cover;
  background-repeat: no-repeat;
}
.shipandco-background {
  background-position: -150px center;
}
.shipandco-project-active {
  background-position: right center;
}
@media all and (min-width: 800px) {
  .shipandco-background,
  .shipandco-project-active {
    background-position: center center;
  }
}
@media all and (min-width: 1400px) {
  .shipandco-project-active {
    background-position: center top;
    background-image: url('/shipandco_highres.png');
  }
}

.stockandco-background,
.stockandco-project-active {
  background-image: url('/stockandco.jpg');
  background-size: cover;
  background-position: center center;
}

.bentoandco-background,
.bentoandco-project-active {
  background-image: url('/bentoandco.png');
  background-size: cover;
  background-position: center 450px;
  background-repeat: no-repeat;
}

.bentoandco-project-active {
  background-position: center 450px;
}

/* Icons and Logos  */
.shipandco-logo {
  background-image: url('/logo-shipandco.svg');
}
.stockandco-logo {
  background-image: url('/logo-stockandco.svg');
}
.bentoandco-logo {
  background-image: url('/logo-bentoandco.svg');
}

/* links modifiers */
.nav-links li a.utils,
.nav-links li a.bentoandco,
.nav-links li.toolbox.utils,
.nav-links li.toolbox.bentoandco {
  color: var(--white);
}
.nav-link-text.utils:before,
.nav-link-text.bentoandco:before {
  background: var(--white);
}
.nav-link-text.stockandco:before {
  background: var(--yellow);
}

.nav-links li a.bentoandco {
  color: var(--white);
}
.nav-link-text.bentoandco:before {
  background: var(--yellow);
}
</style>
