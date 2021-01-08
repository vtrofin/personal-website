<template>
  <component :is="projectContentComponent" />
  <router-link
    :to="
      $route.params.project_item === 'stockandco' ? '/projects/shipandco' : '/projects/stockandco'
    "
    class="content-link"
  >
    <span>Work</span>
  </router-link>
  <section>{{ $route.params.project_item }}</section>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ShipandcoContent from './shipandco';
import StockandcoContent from './stockandco';
import UtilsContent from './utils';
import StaffContent from './staff';
import BentoandcoContent from './bentoandco';

export default {
  name: 'ProjectItemContent',
  components: {
    ShipandcoContent,
    StockandcoContent,
    UtilsContent,
    StaffContent,
    BentoandcoContent
  },
  setup(props) {
    const route = useRoute();
    const projectContentComponent = computed(() => {
      const current = route?.params?.project_item;
      if (!current) {
        return undefined;
      }

      return `${route.params.project_item}-content`;
    });

    return {
      projectContentComponent
    };
  }
};
</script>
<style>
.project-content {
  text-align: initial;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 10vh;
  padding-bottom: 20vh;
}
@media all and (min-width: 600px) {
  .project-content {
    padding-top: 5rem;
    padding-bottom: 10rem;
  }
}

/* .project-content h1 {
  margin: 3rem auto 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  scroll-margin-top: 2em;
} */
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

.project-content span.italic-text {
  font-style: italic;
}

.project-content span.caption-text {
  width: 100%;
  display: block;
  text-align: center;
  font-size: 0.9rem;
  line-height: 150%;
  margin: 2rem auto;
}
</style>
