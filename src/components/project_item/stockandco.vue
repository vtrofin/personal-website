<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      Stock&Co is a private Shopify app that enables syncing of inventory levels across multiple
      stores.
    </p>
  </div>
  <ProjectImage
    alt-text="stock&co list of products with quantities"
    url="/stockandco_variants.png"
    caption=""
  />
  <div class="project-content">
    <h2>Contribution</h2>
    <ul class="content-list">
      <li>Restructure the MongoDB database to save the relevant product data</li>
      <li>Restructure and enhance merging of product data by SKU inside Stock&co</li>
      <li>
        Create a REST API with endpoints to fetch product data and inventory levels from Stock&co
        and push inventory updates to Shopify
      </li>
      <li>Set up user validation and authorization through transactional emails</li>
      <li>Basic support for Shopify multi-locations</li>
      <li>UI enhancements, e.g. a multi-select tag-cloud</li>
    </ul>
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
  name: 'StockandcoContent',
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: '' } },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Full-stack dev'],
      stack: ['Handlebars', 'Meteor', 'Express', 'MongoDB'],
      years: '2018 – 2021',
    };

    return { summary };
  },
});
</script>
