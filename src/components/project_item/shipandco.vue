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
    <p>
      This is the project item content p A/B-testing is a guiding compass for making product
      decisions. More technically, it’s a method for quantifying the impact of product variations.
      The process can’t tell us if one variation is unequivocally “better” than another, but it can
      tell us which of a set of variations is better at producing a certain effect, encouraging a
      behavior, or achieving a goal.
    </p>
    <img class="content-image" src="/shipandco_app.png" alt="a wacky image" loading="lazy" />
    <br />
    <span class="caption-text"> a caption for my image</span>
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

export default {
  name: 'ShipandcoContent',
  components: { ProjectSummary },
  props: {
    modifier: { type: String, required: false, default: '' },
  },
};
</script>
