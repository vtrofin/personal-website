<template>
  <section>
    <h1>This is the project item component</h1>
    <div>{{ $route.params.project_item }}</div>
  </section>
</template>

<script>
import { watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { checkProjectRoute } from '../helpers';

export default {
  name: 'ProjectItem',
  setup() {
    onBeforeRouteUpdate((to, from) => {
      const params = to?.params;
      const pathRedirect = checkProjectRoute(params);
      return pathRedirect;
    });
  }
};
</script>
