<template>
  <Header></Header>
  <main>
    <router-view></router-view>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
export default {
  name: 'MainLayout',
  components: { Header, Footer }
};
</script>
