<template>
  <ProjectItemContent />
</template>

<script>
import { onBeforeRouteUpdate } from 'vue-router';
import ProjectItemContent from '../components/project_item/project_content.vue';
import { checkProjectRoute } from '../helpers';

export default {
  name: 'ProjectItem',
  components: { ProjectItemContent },
  setup() {
    onBeforeRouteUpdate((to) => {
      const params = to?.params;
      const pathRedirect = checkProjectRoute(params);
      return pathRedirect;
    });
    return {};
  },
};
</script>

<style></style>
