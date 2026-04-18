import type { ProjectData } from "../types";

export const eyeqData: ProjectData = {
  slug: "eyeq",
  title: "EyeQ",
  excerpt: "Video interview platform for structured candidate assessment",
  outcomeTag: "Structured hiring in one place",
  accentColorToken: "--color-accent-eyeq",
  openingProblem:
    "Screening candidates takes a lot of time and ties up human resources. In Japan\u2019s year-long entry-level recruitment campaigns, the interviewing process alone can consume weeks of a hiring team\u2019s time — time better spent on other meaningful work.",
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
        "I joined the project in 2025 and worked across the full stack, from candidate-facing flows to back-end services.",
    },
    {
      type: "text",
      content:
        "I built the bulk invitation system end to end. Hiring teams can send a batch of interview requests in one action, see who accepted or declined, and follow up with a single click. I also worked on the passwordless authentication flow, building the email templates that deliver secure login links straight to candidates\u2019 inboxes.",
    },
    {
      type: "text",
      content:
        "I built the post-interview feedback feature — the list view for managers, and the form interviewers fill in. It\u2019s now a core part of how hiring decisions are made on the platform.",
    },
    {
      type: "text",
      content:
        "For companies onboarding new team members, I built registration via a shareable URL — a recruiter shares a link that automatically sets up a new user account for their organisation.",
    },
    {
      type: "text",
      content:
        "On the security and infrastructure side, I added a web application firewall, implemented supply chain protections, and set up error tracking with release-level source maps.",
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
};
