<template>
  <ProjectItemContent />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useHead } from '@unhead/vue';
import ProjectItemContent from '@components/project_item/project_content.vue';
import { checkProjectRoute } from '@helpers/index';
import type { ProjectName } from '@/globals';
import { metaTags } from '@/helpers/meta_tags';

export default defineComponent({
  name: 'ProjectItem',
  components: { ProjectItemContent },
  setup() {
    const route = useRoute();
    const slug = computed((): ProjectName | undefined => {
      const param = route.params.project_item;
      return typeof param === 'string' ? (param as ProjectName) : undefined;
    });

    useHead(computed(() => metaTags.project(slug.value)));

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
