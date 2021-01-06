<template>
  <ProjectItemHeader :modifier-class="modifierClass" />
  <ProjectItemContent />
</template>

<script>
import { watch, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { checkProjectRoute } from '../helpers';
import ProjectItemHeader from '../components/project_item/project_header.vue';
import ProjectItemContent from '../components/project_item/project_content.vue';

export default {
  name: 'ProjectItem',
  components: { ProjectItemHeader, ProjectItemContent },
  setup() {
    const route = useRoute();
    const modifierClass = ref('');
    if (route?.params?.project_item) {
      modifierClass.value = `${route.params.project_item}-project-active`;
    }

    onBeforeRouteUpdate((to, from) => {
      const params = to?.params;
      const pathRedirect = checkProjectRoute(params);
      return pathRedirect;
    });

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

<style></style>
