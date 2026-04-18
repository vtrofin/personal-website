import type { ProjectData } from '../types';

export const atsData: ProjectData = {
  slug: 'ats',
  title: 'Bluum Hire',
  excerpt: 'Applicant tracking system for handling job applications and hiring',
  outcomeTag: 'Hiring pipelines off spreadsheets',
  accentColorToken: '--color-accent-ats',
  openingProblem:
    'Bluum Hire is an applicant tracking system built using a modern tech stack with emphasis on type safety, flexibility and performance.',
  narrative: [
    {
      type: 'text',
      content:
        'The first iteration of the app leveraged Next.js and ReScript to create a server side rendered app while guaranteeing type safety and fast compile times. It also featured an identity provider service leveraging Next.js, TypeScript and ORY Hydra to implement the OAuth 2.0 authorization framework.',
    },
    {
      type: 'text',
      content:
        'The app has since been refactored into a Single Page Application leveraging TypeScript and React 18. URQL is used to build a light-weight and customizable GraphQL client. The app is now using an improved Identity Provider implementation leveraging ORY Hydra to manage identity across company-wide products and services.',
    },
    {
      type: 'text',
      content:
        'BluumHire features a GraphQL API built with Fastify, Apollo Server and a PostgreSQL database. Type safety is achieved by using TypeScript together with Prisma as a type-safe database client.',
    },
    {
      type: 'image',
      src: '/ats_candidates.png',
      alt: 'view the applicant tracking system dashboard',
    },
    {
      type: 'text',
      content:
        'This project allowed me to experience working in an Agile environment using modern languages and tools, while adhering to proven development practices such as sprints, building smaller features in small and easy to review PRs, integration testing and more.',
    },
  ],
  stackItems: [
    'ReScript',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'Fastify',
    'Apollo Server',
    'Prisma',
    'PostgreSQL',
    'AWS',
    'Terraform',
    'Github Actions',
    'CircleCI',
  ],
};
