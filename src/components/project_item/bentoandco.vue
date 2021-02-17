<template>
  <div class="project-content">
    <p>
      <a
        href="https://www.bentoandco.com/"
        :class="
          $props.modifier
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
      French and Japanese and an additional store for enterprise customers.
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

<script>
import ProjectSummary from './project_summary';
export default {
  name: 'BentoandcoContent',
  components: { ProjectSummary },
  props: { modifier: { type: String, required: false, default: '' } },
  setup(props) {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Support dev work'],
      stack: ['Shopify', 'Liquid'],
      years: '2018 –',
    };
    return { summary };
  },
};
</script>
