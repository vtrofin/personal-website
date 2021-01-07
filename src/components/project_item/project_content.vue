<template>
  <component :is="projectContentComponent"></component>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ShipandcoContent from './shipandco';
import StockandcoContent from './stockandco';
import UtilsContent from './utils';
import StaffContent from './staff';
import ShopifyContent from './shopify';

export default {
  name: 'ProjectItemContent',
  components: {
    ShipandcoContent,
    StockandcoContent,
    UtilsContent,
    StaffContent,
    ShopifyContent
  },
  setup(props) {
    const route = useRoute();
    const projectContentComponent = computed(() => {
      console.log('route --->', route);
      const current = route?.params?.project_item;
      if (!current) {
        return undefined;
      }

      return `${route.params.project_item}-content`;
    });
    // <shipandco-content></shipandco-content>
    // <stockandco-content></stockandco-content>

    return {
      projectContentComponent
    };
  }
};
</script>
<style></style>
