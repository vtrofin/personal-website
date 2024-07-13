<template>
  <component :is="projectContentComponent" :modifier="modifierClass" />
</template>

<script lang="ts">
import { computed, ref, watch, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import ShipandcoContent from '@components/project_item/shipandco.vue';
import StockandcoContent from '@components/project_item/stockandco.vue';
import UtilsContent from '@components/project_item/utils.vue';
import StaffContent from '@components/project_item/staff.vue';
import BentoandcoContent from '@components/project_item/bentoandco.vue';
import AtsContent from '@components/project_item/ats.vue';
import CalliopeContent from '@components/project_item/calliope.vue';

export default defineComponent({
  name: 'ProjectItemContent',
  components: {
    ShipandcoContent,
    StockandcoContent,
    UtilsContent,
    StaffContent,
    BentoandcoContent,
    AtsContent,
    CalliopeContent,
  },
  setup() {
    const route = useRoute();
    const modifierClass = ref('');

    watch(
      () => route?.params?.project_item,
      (projectItem) => {
        if (!projectItem) {
          modifierClass.value = '';
        } else {
          modifierClass.value = `${projectItem}-link`;
        }
      }
    );

    const projectContentComponent = computed(() => {
      const current = route?.params?.project_item;
      if (!current) {
        return undefined;
      }

      return `${route.params.project_item}-content`;
    });

    return {
      projectContentComponent,
      modifierClass,
    };
  },
});
</script>
<style>
.project-content {
  text-align: initial;
  max-width: 800px;
  margin: 0 auto;
}

.project-content:first-of-type {
  padding-top: 10vh;
}

.project-content:last-of-type {
  padding-bottom: 20vh;
}

@media all and (min-width: 600px) {
  .project-content {
    padding-top: 3rem;
  }

  .project-content:first-of-type {
    padding-top: 5rem;
  }

  .project-content:last-of-type {
    padding-bottom: 10rem;
  }
}

.project-content h2 {
  margin: 2.5rem auto 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  scroll-margin-top: 2em;
}

.project-content h3 {
  margin: 2rem auto 0.5rem;
  font-size: 1.7rem;
  font-weight: 500;
  scroll-margin-top: 1.5em;
}

.project-content p {
  margin: 1.5rem auto 1rem;
  font-size: 1.2rem;
  scroll-margin-top: 1em;
  line-height: 1.5rem;
}

.project-content ul.content-list li {
  margin: 1.5rem auto 1rem;
  font-size: 1.2rem;
  line-height: 1.5rem;
}

.project-content span.italic-text {
  font-style: italic;
}

.project-content span.caption-text {
  width: 100%;
  display: block;
  text-align: center;
  font-size: 0.9rem;
  line-height: 150%;
  margin: 0 auto 2rem;
}

.content-image {
  width: 100%;
}
</style>
