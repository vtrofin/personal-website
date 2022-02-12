<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>Cococs.</p>
    <p>Haplea fructaliu.</p>
  </div>
  <ProjectImage
    alt-text="view of available tools for testing ecommerce integrations in Ship&Co"
    url="/utils.png"
    caption="A tool for developers to test ecommerce integrations"
  />
  <div class="project-content">
    <h2>Contribution</h2>
    <p>This and that.</p>
    <p>The other one too.</p>
  </div>
  <div class="project-content">
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script>
import ProjectSummary from './project_summary';
import ProjectImage from './project_image';
export default {
  name: 'AtsContent',
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: '' } },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Scoville',
      work: ['Full-stack dev'],
      stack: ['Rescript', 'React', 'TypeScript', 'Fastify', 'GraphQL', 'Tailwind CSS'],
      years: '2021 –',
    };
    return { summary };
  },
};
</script>
