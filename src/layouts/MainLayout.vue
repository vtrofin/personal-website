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
.shipandco-project-active {
  background-color: var(--shipandco);
  color: var(--black);
  transition: background-color 0.3s ease; /* keep it here */
}
</style>
