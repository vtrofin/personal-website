<template>
  <ProjectItemContent />
</template>

<script>
import { onBeforeRouteUpdate } from 'vue-router';
import ProjectItemContent from '../components/project_item/project_content.vue';

export default {
  name: 'ProjectItem',
  components: { ProjectItemContent },
  setup(props) {
    onBeforeRouteUpdate((to, from) => {
      const params = to?.params;
      const pathRedirect = checkProjectRoute(params);
      return pathRedirect;
    });
    return {};
  },
};
</script>

<style></style>
