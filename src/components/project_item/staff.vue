<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      This app is for internal use only, acting as a dashboard and analytics platform to support
      management decisions and operations within
      <a
        href="https://www.shipandco.com/"
        :class="$props.modifier ? 'content-link' + ' ' + $props.modifier : 'content-link'"
        target="_blank"
        rel="noopener"
        aria-label="Click to see this awesome url"
      >
        <span>Ship&co</span>
      </a>
      . It comes with sections to manage users and shipments and it also features an analytics
      section.
    </p>
  </div>
  <ProjectImage
    alt-text="view of top users in Ship&co and last shipments made"
    url="/staff_dashboard.png"
    caption="The app is a dashboard supporting marketing and operations"
  />

  <div class="project-content">
    <h2>Contribution</h2>
    <p>
      Built before starting my employment at Ship&Co using React, FeathersJS and Bulma, I was the
      main contributor to maintaining and shipping new features for this app. Some of the tasks I’ve
      shipped include:
    </p>
    <ul class="content-list">
      <li>Improvements to the data visualizations and KPIs using VictoryChart and Bulma</li>

      <li>
        Version updates for both React and Feathers JS. Some major releases in Feathers JS came with
        substantial breaking changes requiring a complete review of the app
      </li>

      <li>
        Performance optimizations, such as replacing inefficient MongoDB queries with aggregations
        ($lookup), leveraging server side caching, setting up query parameters for client-side
        routing
      </li>

      <li>
        Operations management and monitoring in Ship&co: blocking fraudulent users, data searching
        and filtering
      </li>

      <li>Export KPI data to files</li>

      <li>Server side logging with Logentries</li>
    </ul>
  </div>
  <ProjectImage
    alt-text="view of all labels made with Ship&co in the last two weeks"
    url="/staff_shipments.png"
    caption="The app enables managing of shipping labels and user data within Ship&co"
  />
  <div class="project-content">
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script lang="ts">
import ProjectSummary from '@components/project_item/project_summary.vue';
import ProjectImage from '@components/project_item/project_image.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StaffContent',
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: '' } },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Full-stack dev'],
      stack: ['Feathers JS', 'React', 'Bulma'],
      years: '2018 – 2021',
    };
    return { summary };
  },
});
</script>
