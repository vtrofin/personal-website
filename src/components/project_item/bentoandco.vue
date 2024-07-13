<template>
  <div class="project-content">
    <p>
      <a
        href="https://www.bentoandco.com/"
        :class="$props.modifier
          ? 'content-link reversed' + ' ' + $props.modifier
          : 'content-link reversed'
          "
        target="_blank"
        rel="noopener"
        aria-label="Click to see this awesome url"
      >
        <span>Bento&Co</span>
      </a>
      sells bento boxes online, from Kyoto. It operates a series of Shopify stores, in English,
      French and Japanese.
    </p>

    <h2>Contribution</h2>
    <p>
      The Shop UI implements third party themes built using Liquid, Shopify’s proprietary template
      language. I helped debug and correct issues within these themes and shipped light
      enhancements.
    </p>
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script lang="ts">
import ProjectSummary from '@components/project_item/project_summary.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BentoandcoContent',
  components: { ProjectSummary },
  props: { modifier: { type: String, required: false, default: '' } },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Support dev work'],
      stack: ['Shopify', 'Liquid'],
      years: '2018 – 2021',
    };
    return { summary };
  },
});
</script>
