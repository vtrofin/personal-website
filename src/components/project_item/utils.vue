<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      Started as a learning project by two talented interns at Ship&Co, it became a useful tool for
      creating test orders for the day to day development work. It features multiple integrations
      such as Shopify, Magento and Base. It features an integration with the GitHub API enabling
      marketing staff to access GitHub issues without an account.
    </p>
    <p>
      Built on a Node.js server and with Handlebars on the front-end, it features server side
      rendering and data reactivity with Socket.io.
    </p>
  </div>
  <ProjectImage
    alt-text="view of available tools for testing ecommerce integrations in Ship&Co"
    url="/utils.png"
    caption="A tool for developers to test ecommerce integrations"
  />
  <div class="project-content">
    <h2>Contribution</h2>
    <p>
      I implemented a module to create and delete orders and shipments in a staging QuickBooks
      Commerce account. It’s a straightforward implementation using the official QB Commerce REST
      API, with basic API requests throttling to keep within API request limits.
    </p>
    <p>
      I fixed the throttling issues in the Shopify integration after Shopify drastically reduced API
      calling limits for development stores.
    </p>
  </div>
  <div class="project-content">
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script lang="ts">
import ProjectSummary from '@components/project_item/project_summary.vue';
import ProjectImage from '@components/project_item/project_image.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UtilsContent',
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: '' } },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Full-stack dev'],
      stack: ['Handlebars', 'Node.js', 'Bulma'],
      years: '2018 – 2021',
    };
    return { summary };
  },
});
</script>
