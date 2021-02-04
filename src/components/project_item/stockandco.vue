<template>
  <div class="project-content">
    <h3>This is the project item content h3</h3>
    <ProjectImage
      alt-text="stock&co list of products with quantities"
      url="/stockandco_variants.png"
      caption="Stock&co enables syncing of product quantities across multiple Shopify stores"
    />
    <p>
      This is the project item content p A/B-testing is a guiding compass for making product
      decisions. More technically, it’s a method for quantifying the impact of product variations.
      The process can’t tell us if one variation is unequivocally “better” than another, but it can
      tell us which of a set of variations is better at producing a certain effect, encouraging a
      behavior, or achieving a goal.
    </p>
    <ProjectImage alt-text="stock&co list of synced shopify stores" url="/stockandco_shops.png" />
    <ProjectSummary />
  </div>
</template>

<script>
import ProjectSummary from './project_summary';
import ProjectImage from './project_image';

export default {
  name: 'StockandcoContent',
  components: { ProjectSummary, ProjectImage },
};
</script>
