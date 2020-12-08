<template>
  <Header></Header>
  <main>
    <div class="content">
      <router-view></router-view>
    </div>
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
