<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      BluumHire is an applicant tracking system built using a modern tech stack with emphasis on
      type safety, flexibility and performance.
    </p>
    <p>
      It uses Next.js to build a server side rendered app and introduces ReScript for guaranteed
      type safety and fast compile times on the front-end. Urql is used to build a light-weight and
      customizable GraphQL client.
    </p>
    <p>
      It features a GraphQL api built with Fastify, Apollo Server as middleware and a PostgreSQL
      database. Type safety is achieved by using TypeScript together with Prisma as a type-safe
      database client. BluumHire also includes an identity provider service leveraging Next.js,
      TypeScript and ORY Hydra to implement the OAuth 2.0 authorization framework.
    </p>
  </div>
  <ProjectImage
    alt-text="view of available tools for testing ecommerce integrations in Ship&Co"
    url="/ats_candidates.png"
    caption="Applicant tracking system"
  />
  <div class="project-content">
    <h2>Contribution</h2>
    <p>
      This project allowed me to experience working in an Agile environment using modern languages
      and tools, while adhering to proven development practices such as sprints, building smaller
      features in small and easy to review PRs, integration testing and more. I’ve worked on all
      sides of the app, initially focusing on the front-end side while getting familiar with type
      systems (ReScript and TypeScript) and subsequently transitioning to a full-stack role.
    </p>
    <ul class="content-list">
      <li>
        Build UI features using ReScript React and Tailwind css. Worth mentioning: typeahead and
        multi select components, animation with framer-motion
      </li>
      <li>Refactor the UI layout with Tailwind CSS</li>
      <li>Query the GraphQL api using the Urql client</li>
      <li>Build GraphQL queries and mutations</li>
      <li>Build Prisma models and use Prisma to query the PostgreSQL database</li>
      <li>Export data to CSV and upload it to Minio</li>
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
  name: 'AtsContent',
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: '' } },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Scoville',
      work: ['Full-stack dev'],
      stack: [
        'Rescript',
        'Next.js',
        'Tailwind CSS',
        'TypeScript',
        'Fastify',
        'Apollo Server',
        'Prisma',
        'PostgreSQL',
      ],
      years: '2021 –',
    };
    return { summary };
  },
};
</script>
