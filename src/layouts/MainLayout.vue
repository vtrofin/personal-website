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
  bottom: -5px;
  left: 0;
  height: 3px;
  background-color: var(--scarlet);
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
  background-color: var(--shipandco);
  color: var(--black);
}
.stockandco-active,
.stockandco-project-active {
  background-color: var(--stockandco);
  color: var(--black);
}
.staff-active,
.staff-project-active {
  background-color: var(--staff);
  color: var(--black);
}
.utils-active,
.utils-project-active {
  background-color: var(--utils);
  color: var(--white);
}
.bentoandco-active,
.bentoandco-project-active {
  background-color: var(--bentoandco);
  color: var(--white);
}
.smoothjapan-active {
  background-color: var(--smoothjapan);
  color: var(--black);
}
.bertrandandco-active {
  background-color: var(--bertrandandco);
  color: var(--black);
}

/* .shipandco-project-active {
  transition: background-color 0.3s ease;
} */

/* Backgrounds  */
.shipandco-background {
  background-image: url('/bertrand_co.png');
  background-size: cover;
  background-position: right center;
}
.shipandco-project-active {
  background-image: url('/bertrand_co.png');
  background-size: cover;
  background-position: right center;
}

/* 
https://burst.shopify.com/photos/shipping-boxes-on-trolly-close-up?q=delivery
https://burst.shopify.com/photos/shipping-boxes-on-red-brick?q=delivery

backup
https://burst.shopify.com/photos/boxes-in-the-process-of-being-packed?q=lunch+box
https://burst.shopify.com/photos/man-holding-shipping-box-on-red-brick?q=delivery
doar cu modificari & crop https://burst.shopify.com/photos/signing-shipping-forms-for-large-box?q=delivery
https://burst.shopify.com/photos/the-final-packages-ready-for-shipment?q=delivery
https://www.shutterstock.com/image-photo/hand-holding-barcode-label-on-shipping-1520991479
*/

.stockandco-background {
  background-image: url('/stockandco_lowres_edited.jpg');
  background-size: cover;
}
.stockandco-project-active {
  background-image: url('/stockandco_highres.jpg');
  background-size: cover;
  background-position: center center;
}
/*
backup
https://unsplash.com/photos/UWpGHf8pKwU
*/

.staff-background {
  background-image: url('/aaa.jpg');
  background-size: cover;
}
.staff-project-active {
  background-image: url('/aaa.jpg');
  background-size: cover;
  background-position: center center;
}

/*
No background for staff  and utils
https://unsplash.com/photos/PcDGGex9-jA
https://unsplash.com/photos/unRkg2jH1j0 - to put to the bottom only.

*/

.bentoandco-background,
.bentoandco-project-active {
  background-image: url('https://burst.shopifycdn.com/photos/lunch-box-with-cutlery.jpg');
  background-size: cover;
  background-position: center center;
}

/*
show just bottom part!
https://burst.shopify.com/photos/lunch-box-with-cutlery?q=lunch+box

backup
https://unsplash.com/photos/IIzny_Qgw-g
https://unsplash.com/photos/HOZttZsnW48
https://unsplash.com/photos/2cpx1N7Us5Q
https://unsplash.com/photos/UQE3rtWMfV4
 */

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

.nav-links li a.staff {
  color: var(--black);
}

.nav-link-text.staff:before {
  background: var(--black);
}
</style>
