<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      Stock&Co is a Shopify app that enables syncing of inventory levels (product quantities) across
      multiple stores. It addresses a major inconvenience because there is no full support for i18n
      in Shopify and users need to create separate stores for each language they require. At the
      moment the app is a prototype, it is used primarily internally but there is intent to release
      it in beta after a complete re-write with Vue3 and Fastify.
    </p>
  </div>
  <ProjectImage
    alt-text="stock&co list of products with quantities"
    url="/stockandco_variants.png"
    caption="Stock&co enables syncing of product quantities across multiple Shopify stores"
  />
  <div class="project-content">
    <h2>The problem</h2>
    <p>
      In early 2018 a decision was made to externalize order fulfillment for
      <a
        href="https://www.bentoandco.com/"
        :class="$props.modifier ? 'content-link' + ' ' + $props.modifier : 'content-link'"
        target="_blank"
        rel="noopener"
        aria-label="Click to see this awesome url"
      >
        <span>Bento&Co</span>
      </a>
      stores to a 3rd party warehouse and, consequently, this required Stock&co to integrate with
      the 3rd party systems. Also, with a growing team in Bento&Co, there was a need to unify
      product creation in all the Bento&Co stores.
    </p>
  </div>
  <ProjectImage
    alt-text="stock&co list of synced shopify stores"
    url="/stockandco_shops.png"
    caption="It is easy to connect a Shopify store in Stock&co"
  />
  <div class="project-content">
    <h2>Contribution</h2>
    <p>
      I worked back-end side to create the product and inventory levels sync between the 3rd party
      systems, Stock&co and Shopify. The main challenges for this task were a tight deadline and an
      insufficient integration between the 3rd party system and Shopify. Basically, Stock&co had to
      act as an in-between Shopify and the 3rd party system. Tasks included:
    </p>
    <ul class="content-list">
      <li>
        Restructure the Stock&Co MongoDB database to save the relevant order data required by the
        3rd party
      </li>
      <li>
        Restructure and enhance merging of product data by SKU inside Stock&co
      </li>
      <li>
        Create a REST API with endpoints to fetch product data and inventory levels from Stock&co
        and push inventory updates to Stock&co and subsequently to Shopify
      </li>
      <li>
        Set up user validation and authorization through transactional emails
      </li>
      <li>
        Basic support for Shopify multi-locations
      </li>
      <li>UI enhancements - e.g. a multi-select tag-cloud</li>
      <li>
        Post Covid19 pandemic the partnership with the 3rd party ended and I was in charge of
        refocusing Stock&co to its core- inventory level sync. I also completely rewrote the unified
        product creation feature, relying on Shopify web-hooks for syncing product data across
        multiple Shopify stores instead of having a custom product creation flow.
      </li>
    </ul>
  </div>

  <div class="project-content">
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script>
import ProjectSummary from './project_summary';
import ProjectImage from './project_image';

export default {
  name: 'StockandcoContent',
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: '' } },
  setup(props) {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Full-stack dev'],
      stack: ['Handlebars', 'Meteor', 'Express', 'MongoDB'],
      years: '2018 –',
    };

    return { summary };
  },
};
</script>
