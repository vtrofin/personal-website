<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      Bluum Hire is an applicant tracking system built using a modern tech stack
      with emphasis on type safety, flexibility and performance. The first
      iteration of the app leveraged Next.js and ReScript to create a server
      side rendered app while guaranteeing type safety and fast compile times.
      It also featured an identity provider service leveraging Next.js,
      TypeScript and ORY Hydra to implement the OAuth 2.0 authorization
      framework.
    </p>
    <p>
      The app has since been refactored into a Single Page Application
      leveraging TypeScript and React 18. URQL is used to build a light-weight
      and customizable GraphQL client. The app is now using an improved Identity
      Provider implementation leveraging ORY Hydra to manage identity across
      company-wide products and services.
    </p>
    <p>
      BluumHire features a GraphQL API built with Fastify, Apollo Server and a
      PostgreSQL database. Type safety is achieved by using TypeScript together
      with Prisma as a type-safe database client.
    </p>
  </div>
  <ProjectImage
    alt-text="view the applicant tracking system dashboard"
    url="/ats_candidates.png"
    caption="Applicant tracking system"
  />
  <div class="project-content">
    <h2>Contribution</h2>
    <p>
      This project allowed me to experience working in an Agile environment
      using modern languages and tools, while adhering to proven development
      practices such as sprints, building smaller features in small and easy to
      review PRs, integration testing and more. I've worked on all sides of the
      app, initially focusing on the front-end side while getting familiar with
      type systems (ReScript and TypeScript) and subsequently transitioning to a
      full-stack role. The highlight for me has been the contribution towards
      provisioning the production environment using AWS and Terraform. Gaining
      essential DevOps skills marked my transition from an experienced developer
      role to that of a senior web engineer. Some of my contributions include:
    </p>
    <ul class="content-list">
      <li>
        Major releases: send and receive emails with SendGrid, schedule job
        applicants for events and interviews, export candidate data to CSV
      </li>
      <li>
        Build UI features using ReScript, React and Tailwind css. Worth
        mentioning: typeahead and multi select components, animation with
        framer-motion
      </li>
      <li>Refactor the UI layout with Tailwind CSS</li>
      <li>Refactor the ReScript SSR app into a TypeScript SPA</li>
      <li>
        Build GraphQL queries and mutations while leveraging Prisma to query the
        PostgreSQL database
      </li>
      <li>
        Contribute to provisioning the production app with AWS services and
        Terraform
      </li>
      <li>
        Refactor existing CircleCI pipelines and transition to Github Actions
      </li>
      <li>Set-up new CI/CD pipelines with Github Actions</li>
    </ul>
  </div>
  <div class="project-content">
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script lang="ts">
import ProjectSummary from "@components/project_item/project_summary.vue";
import ProjectImage from "@components/project_item/project_image.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AtsContent",
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: "" } },
  setup() {
    const summary = {
      position: "Web engineer",
      organization: "Scoville",
      work: ["Full-stack dev"],
      stack: [
        "ReScript",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Fastify",
        "Apollo Server",
        "Prisma",
        "PostgreSQL",
        "AWS",
        "Terraform",
        "Github Actions",
        "CircleCI",
      ],
      years: "2021 - 2023",
    };
    return { summary };
  },
});
</script>
