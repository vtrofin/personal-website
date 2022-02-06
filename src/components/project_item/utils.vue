<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      Started for fun, as a learning project, by two talented interns at Ship&Co, it became quite a
      useful tool for creating test orders for the day to day development work. It features multiple
      integrations such as Shopify, Magento, Base and more. It features an integration with the
      GitHub API to create a way for non-devs to access GitHub issues without an account.
    </p>
    <p>
      Built on a standard Node.js server with Handlebars on the front-end, it features server side
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
      I implemented a module to create and delete test orders and shipments in a staging QuickBooks
      Commerce account. It’s a straightforward implementation using the official QB Commerce REST
      API and with basic API requests throttling to keep within API request limits.
    </p>
    <p>
      I fixed throttling issue in the Shopify integration after Shopify drastically reduced API
      calling limits for development stores.
    </p>
  </div>
  <div class="project-content">
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script>
import ProjectSummary from './project_summary';
import ProjectImage from './project_image';
export default {
  name: 'UtilsContent',
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: '' } },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Full-stack dev'],
      stack: ['Handlebars', 'Node.js', 'Bulma'],
      years: '2018 –',
    };
    return { summary };
  },
};
</script>
