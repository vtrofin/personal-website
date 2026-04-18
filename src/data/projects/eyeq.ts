import type { ProjectData } from '../types';

export const eyeqData: ProjectData = {
  slug: 'eyeq',
  title: 'EyeQ',
  excerpt: 'Video interview platform for structured candidate assessment',
  outcomeTag: 'Structured hiring in one place',
  accentColorToken: '--color-accent-eyeq',
  openingProblem:
    'EyeQ is a video interview platform that lets companies assess candidates through structured video interviews. It handles the full hiring loop — from sending invitations to collecting post-interview feedback — in one place.',
  narrative: [
    {
      type: 'text',
      content:
        'The platform is built for hiring teams who need to move quickly: candidates receive a secure link by email, join a video session without creating an account, and interviewers can submit structured feedback immediately after. Everything is tracked and accessible to the team in a shared dashboard.',
    },
    {
      type: 'text',
      content:
        'I joined the project in 2025 and worked across the full stack, from candidate-facing flows to back-end services and infrastructure.',
    },
    {
      type: 'text',
      content:
        'One of the first areas I tackled was the invitation system. Hiring teams often need to reach many candidates at once, so I built bulk invitation — letting companies send out batches of interview requests in one action, track who accepted or declined, and follow up with a single click. To make sure candidates actually received their emails, I built the magic link authentication flow: no password required, just a secure link sent to their inbox that gets them straight into the interview room.',
    },
    {
      type: 'text',
      content:
        'For companies that needed to onboard new team members, I built a registration flow via URL — a recruiter could share a link that automatically set up a new user account for their organisation.',
    },
    {
      type: 'text',
      content:
        'Once interviews were completed, interviewers needed a way to capture their thoughts before they forgot them. I built the post-interview feedback feature end-to-end — the back-end service, the list view for managers, and the form interviewers fill in. This was a full feature from scratch, and it is now a core part of how hiring decisions are made in the platform.',
    },
    {
      type: 'text',
      content:
        'On mobile, video interview platforms live or die by how well they work on a phone. I fixed several layout and UX issues — including a candidate self-registration flow with QR code support, layout problems in the video participant view, and audio routing issues on iOS.',
    },
    {
      type: 'text',
      content:
        'The platform handles sensitive candidate data, so security was a priority throughout. I added a Web Application Firewall in front of the platform and implemented supply chain protections to guard against compromised dependencies.',
    },
  ],
  stackItems: [
    'TypeScript',
    'React',
    'PostgreSQL',
    'AWS Lambda',
    'SST',
    'Sentry',
    'GitHub Actions',
  ],
};
