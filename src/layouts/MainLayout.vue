<template>
  <Header />
  <main>
    <div class="content">
      <router-view />
    </div>
  </main>
  <Footer />
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';

export default {
  name: 'MainLayout',
  components: { Header, Footer },
  setup() {
    return {};
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
}

/* add multiple classes here for each item (staff, stockandco) etc */
.shipandco-active {
  background-color: var(--shipandco);
  color: var(--black);
}

.shipandco-project-active {
  background-color: var(--shipandco);
  color: var(--black);
  transition: background-color 0.3s ease; /* keep it here */
}

.shipandco-background {
  background-image: url('/shipandco_app.png');
  /* background-size: cover; */
}

.shipandco-logo {
  background-image: url('/logo-shipandco.svg');
}

.stockandco-logo {
  background-image: url('/logo-stockandco.svg');
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

.content-link:hover:before,
.contact-link:hover:before {
  height: 10px;
}

/*




.nav-link-text:before {
  z-index: 5;
  content: '';
  width: 100%;
  position: absolute;
  bottom: -10px;
  height: 3px;
  left: 0;
  display: block;
  background: var(--scarlet);
  transform: translate3d(0, 5px, 0);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
}

.nav-links li:hover .nav-link-text:before {
  opacity: 1;
  transform: translateZ(0) scale3d(1.1, 1.1, 1.1) rotate(2deg);
}

 */
</style>
