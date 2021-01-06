<template>
  <ProjectItemContent />
</template>

<script>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { checkProjectRoute } from '../helpers';
import ProjectItemContent from '../components/project_item/project_content.vue';

export default {
  name: 'ProjectItem',
  components: { ProjectItemContent },
  setup() {
    const route = useRoute();
    return {};
  },
};
</script>

<style></style>
