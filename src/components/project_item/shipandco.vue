<template>
  <div class="project-content" tabindex="0">
    <h1>This is the project item content h1</h1>
    <h2>This is the project item content h2</h2>
    <h3>This is the project item content h3</h3>
    <p>
      This is the project item content p A/B-testing is a guiding compass for making product
      decisions. More technically, it’s a method for quantifying the impact of product variations.
      The process can’t tell us if one variation is unequivocally “better” than another, but it can
      tell us which of a set of variations is better at producing a certain effect, encouraging a
      behavior, or achieving a goal.
      <span class="italic-text" />
    </p>
    <ProjectImage
      alt-text="shipandco orders page view"
      url="/shipandco_orders.png"
      caption="Ship&co imports orders from users' ecommerce platforms"
    />
    <p>
      This is the project item content p A/B-testing is a guiding compass for making product
      decisions. More technically, it’s a method for quantifying the impact of product variations.
      The process can’t tell us if one variation is unequivocally “better” than another, but it can
      tell us which of a set of variations is better at producing a certain effect, encouraging a
      behavior, or achieving a goal.
    </p>
    <ProjectImage
      alt-text="shipandco order page detailed view with rates displayed"
      url="/shipandco_order_rates.png"
      caption="Ship&co makes it easy to choose the cheapest/ fastest shipping method"
    />

    <ProjectImage
      alt-text="shipandco shipment label detail view"
      url="/shipandco_label.png"
      caption="Ship&co makes it easy to print shipping labels"
    />

    <a
      href="#"
      :class="modifier ? 'content-link reversed' + ' ' + modifier : 'content-link reversed'"
      target="_blank"
      rel="noopener"
      aria-label="Click to see this awesome url"
    >
      <span>some link</span>
    </a>
    <br />
    <ProjectSummary :modifier="modifier" />
  </div>
</template>

<script>
import ProjectSummary from './project_summary';
import ProjectImage from './project_image';

export default {
  name: 'ShipandcoContent',
  components: { ProjectSummary, ProjectImage },
  props: {
    modifier: { type: String, required: false, default: '' },
  },
};
</script>
