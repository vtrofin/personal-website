import type { ProjectData } from '../types';

export const calliopeData: ProjectData = {
  slug: 'calliope',
  title: 'Calliope AI',
  excerpt: 'AI powered call center',
  outcomeTag: 'Agents handling 3× more calls',
  accentColorToken: '--color-accent-calliope',
  openingProblem:
    'Calliope is an AI-powered, web-based call center application that leverages AWS Connect to handle contact queuing and audio streaming. Calliope addresses challenges in understaffed call centers, particularly in call management, feedback loops for agents, and reporting.',
  narrative: [
    {
      type: 'text',
      content:
        'There are several productivity issues in call centers across Japan that require more staff to handle manual, repetitive, and error-prone tasks. The platform addresses the following pain points: manual contact selection from spreadsheets, manual dialing and reporting leading to data entry errors, and limited time for managers to listen to recorded calls and provide meaningful feedback.',
    },
    {
      type: 'text',
      content:
        'Calliope AI was built to address these pain points, resulting in significant improvements for the calling staff. Feedback from agents indicates that Calliope helps them handle three times more contacts in the same time. The solution incorporates a contact management UI, a real-time KPI dashboard, and a call panel for agents to make and receive voice calls efficiently.',
    },
    {
      type: 'image',
      src: '/calliope-call.webp',
      alt: 'view the calliope call panel',
    },
    {
      type: 'text',
      content:
        'My work on the project focused on crafting the UI for agents to handle phone calls and provide call reports. The UI needed to support both outbound and inbound calls, prompting the decision to build an SPA with ViteJS, React, and the Amazon Connect Streams API for handling voice calls.',
    },
    {
      type: 'text',
      content:
        'This project was my first opportunity to leverage React with a different code-base (iframes) and learn about state management across two different apps — the main React app and multiple iframes provided by Amazon Connect. The complexity of the UI necessitated the use of state machines to ensure the correct UI was displayed and impossible states were prevented.',
    },
    {
      type: 'text',
      content:
        'Initially, the plan was to use the out-of-the-box call panel UI provided by Amazon Connect. However, it became clear that it did not meet our needs, as agents found it difficult to understand. I built a custom call panel with task-based outbound calls, data integration via Amazon Connect Customer Profiles API, enhanced call reporting, and streamlined workflows.',
    },
    {
      type: 'image',
      src: '/calliope-report.webp',
      alt: 'view the calliope call report panel',
    },
    {
      type: 'text',
      content:
        'By implementing these solutions, Calliope has significantly improved the call center efficiency, enabling agents to handle more contacts with fewer errors and providing managers with better tools for monitoring and training.',
    },
  ],
  stackItems: [
    'React',
    'Amazon Connect',
    'TypeScript',
    'Tailwind CSS',
    'Terraform',
    'GitHub Actions',
    'Sentry',
    'Serverless',
    'ViteJS',
  ],
};
