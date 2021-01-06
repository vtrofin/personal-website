<template>
  <Header :modifier-class="modifierClass" />
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
</style>
