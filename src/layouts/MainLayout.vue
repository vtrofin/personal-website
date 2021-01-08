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
  setup(props) {
    return {};
  }
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

.content-image {
  width: 100%;
  filter: drop-shadow(0 52px 74px rgba(0, 21, 64, 0.14));
  border-radius: var(--base-border);
}

/* Modifier classes */
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

.shipandco-project-active {
  transition: background-color 0.3s ease;
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
.bentoandco-logo {
  background-image: url('/logo-bentoandco.svg');
}
</style>
