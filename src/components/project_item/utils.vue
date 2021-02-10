<template>
  <div class="project-content">
    <h3>This is the project item content h3</h3>
    <p>
      This is the project item content p A/B-testing is a guiding compass for making product
      decisions. More technically, it’s a method for quantifying the impact of product variations.
      The process can’t tell us if one variation is unequivocally “better” than another, but it can
      tell us which of a set of variations is better at producing a certain effect, encouraging a
      behavior, or achieving a goal.
    </p>
  </div>
  <ProjectImage
    alt-text="view of available tools for testing ecommerce integrations in Ship&Co"
    url="/utils.png"
    caption="A tool for developers to test ecommerce integrations"
  />
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
  setup(props) {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Full-stack dev'],
      stack: ['Handlebars', 'Node.js'],
      years: '2018 –',
    };
    return { summary };
  },
};
</script>
