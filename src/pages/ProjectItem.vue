<template>
  <ProjectItemContent />
</template>

<script lang="ts">
import { onBeforeRouteUpdate } from 'vue-router';
import ProjectItemContent from '@components/project_item/project_content.vue';
import { checkProjectRoute } from '@helpers/index';
import { defineComponent } from 'vue';

export default defineComponent({
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
});
</script>

<style></style>
