<template>
  <Header :modifier-class="modifierClass" />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default {
  name: 'MainLayout',
  components: { Header, Footer },
  setup() {
    const route = useRoute();
    const modifierClass = ref('');

    watch(
      () => route.params,
      () => {
        if (route?.params?.project_item) {
          return (modifierClass.value = `${route.params.project_item}-project-active`);
        }

        return (modifierClass.value = '');
      }
    );

    return {
      modifierClass
    };
  }
};
</script>
