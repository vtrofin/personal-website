<template>
  <h1>This is the project item component</h1>
  <router-link
    :to="
      $route.params.project_item === 'stockandco' ? '/projects/shipandco' : '/projects/stockandco'
    "
  >
    <span class="nav-link-text">Work</span>
  </router-link>
  <section>{{ $route.params.project_item }}</section>
</template>

<script>
import { watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { checkProjectRoute } from '../helpers';

export default {
  name: 'ProjectItem',
  setup() {
    const route = useRoute();
    console.log('2. route -->', route);
    onBeforeRouteUpdate((to, from) => {
      const params = to?.params;
      const pathRedirect = checkProjectRoute(params);
      return pathRedirect;
    });
  },
};
</script>

<style></style>
