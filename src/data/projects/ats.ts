import type { ProjectData } from "../types";

export const atsData: ProjectData = {
  slug: "ats",
  title: "Bluum Hire",
  excerpt: "Applicant tracking system",
  outcomeTag: "Seamless graduate tracking, all in one pipeline",
  accentColorToken: "--color-accent-ats",
  openingProblem:
    "In Japan, hiring entry-level graduates is nothing like posting a job and waiting for applications. Companies run year-long recruitment campaigns targeting students who all start work in April. Most hiring software is built for Western-style hiring and don\u2019t fit this cycle. The few Japanese options that existed were clunky or incomplete — leaving recruiters to manage candidates across spreadsheets and email chains.",
  narrative: [
    {
      type: "text",
      content:
        "Bluum Hire was built specifically for this market. It gave recruiters a single pipeline view — post a role, track every candidate through each stage, and keep the whole hiring team on the same page across a campaign that could stretch over twelve months.",
    },
    {
      type: "image",
      src: "/ats_candidates.webp",
      alt: "The candidate pipeline view showing applicants across hiring stages",
    },
    {
      type: "text",
      content:
        "I joined the project during its first version and stayed through a full rebuild. I moved the codebase from a mix of languages to a single one used across the entire application (TypeScript), then reorganised it so the different parts of the product could be worked on and released independently.",
    },
    {
      type: "text",
      content:
        "I also set up the systems that kept the product running reliably — automated testing and deployment, email delivery for candidate notifications, and the infrastructure that served the application to users.",
    },
    {
      type: "text",
      content:
        "The project has since been closed, but the work shaped how I approach building products from early stage through to production.",
    },
  ],
  stackItems: [
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
  summary: {
    position: "Web engineer",
    organization: "Scoville",
    work: ["Full-stack dev"],
    years: "2021 - 2023",
  },
};
