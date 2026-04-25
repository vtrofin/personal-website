import type { ProjectData } from "../types";

export const eyeqData: ProjectData = {
  slug: "eyeq",
  title: "EyeQ",
  excerpt: "Video interview platform for structured candidate assessment",
  outcomeTag: "Screening effort cut by automating first rounds",
  accentColorToken: "--color-accent-eyeq",
  openingProblem:
    "In Japan\u2019s year-long graduate recruitment campaigns, hiring teams can spend weeks just on first-round interviews \u2014 sitting through hundreds of screening calls that mostly ask the same questions. It\u2019s repetitive work that ties up the people who should be making final hiring decisions.",
  narrative: [
    {
      type: "text",
      content:
        "EyeQ is an AI-powered video interview platform that screens candidates before they ever reach a human interviewer. Candidates receive a link, join a video session without creating an account, and answer a set of questions on camera. The platform records, transcribes, and evaluates their responses — giving hiring teams a shortlist of vetted candidates to review, including the recorded interviews.",
    },
    {
      type: "text",
      content:
        "It can be configured for different interview formats: standard screening questions, structured behavioural interviews, or case interviews like those used by management consulting firms to test junior hires.",
    },
    {
      type: "image",
      src: "/eyeq-placeholder.webp",
      alt: "TBD",
    },
    {
      type: "text",
      content:
        "I joined the project in 2025 and worked across everything from what candidates see to the services running behind the scenes. The largest piece I delivered was the bulk invitation system \u2014 hiring teams can send a batch of interview requests in one action, see who accepted or declined, and follow up with a single click.",
    },
    {
      type: "text",
      content:
        "I also helped build the post-interview feedback workflow that managers and interviewers now use to make hiring decisions, a registration flow that lets recruiters onboard new team members with a shared link, and the passwordless login that gets candidates into their sessions without creating an account.",
    },
    {
      type: "text",
      content:
        "On the reliability side, I added protections against common web attacks, supply chain safeguards, and error tracking so the team knows when something breaks before users do.",
    },
  ],
  stackItems: [
    "TypeScript",
    "React Router",
    "PostgreSQL",
    "AWS Lambda",
    "SST",
    "Sentry",
    "GitHub Actions",
  ],
  summary: {
    position: "Full-stack web engineer",
    organization: "Scoville",
    work: ["Full-stack dev"],
    years: "2025 – present",
  },
};
