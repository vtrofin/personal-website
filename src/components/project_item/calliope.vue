<template>
  <div class="project-content">
    <h2>The Project</h2>
    <p>
      Calliope is an AI-powered, web-based call center application that leverages AWS Connect to handle contact queuing and audio streaming. Calliope addresses challenges in understaffed call centers, particularly in call management, feedback loops for agents, and reporting.
    </p>
    <p>
      There are several productivity issues in call centers across Japan that require more staff to handle manual, repetitive, and error-prone tasks. Through our research and specific use cases, we identified the following pain points:
    </p>
    <ul class="content-list">
      <li>
        Manual Contact Selection: Managers manually select contact lists from spreadsheets and forward them to agents daily. This is particularly painful in Japan, where spreadsheet usage is prevalent, limiting managers' time for value-added tasks such as providing feedback and training new agents.
      </li>
      <li>
        Manual Dialing and Reporting: Agents manually pick and dial numbers from spreadsheets and provide call reports, leading to numerous data entry errors.
      </li>
      <li>Feedback Limitations: Managers have limited time to listen to all recorded calls and provide meaningful feedback to improve conversions, mainly due to the time-consuming nature of the task.</li>
    </ul>
    <h2>The Solution</h2>
    <p>
      We developed Calliope AI to address these pain points, resulting in significant improvements for the calling staff. Feedback from agents indicates that Calliope helps them handle three times more contacts in the same time. The solution incorporates the following features:
    </p>
    <ul class="content-list">
      <li>
        Contact Management UI: A user interface for the call center manager to easily create filters in the contacts' database and schedule new contacts for each agent.
      </li>
      <li>
        Real-Time KPI Dashboard: A UI for the manager to fetch real-time KPIs for each agent and campaign, allowing easy identification of issues that require intervention or further training.
      </li>
      <li>Call Panel for Agents: A call panel for agents to make and receive voice calls efficiently.</li>
    </ul>
    <ProjectImage
      alt-text="view the calliope call panel"
      url="/calliope-call.webp"
      caption="Calliope Call Panel"
    />
    <p>
      My work on the project focused on crafting the UI for agents to handle phone calls and provide call reports. The UI needed to support both outbound and inbound calls, prompting the decision to build an SPA with ViteJS, React, and the Amazon Connect Streams API for handling voice calls. While Amazon Connect offered significant benefits, including integration with AWS AI tools for transcription and sentiment analysis, there were challenges such as unreliable typings, integration difficulties with SAML authentication, slow initialization, and certain API limitations.
    </p>
    <p>
      This project was my first opportunity to leverage React with a different code-base (iframes) and learn about state management across two different apps—the main React app and multiple iframes provided by Amazon Connect. The complexity of the UI, with multiple cards appearing and disappearing based on call states (connecting, connected, after call), necessitated the use of state machines to ensure the correct UI was displayed and impossible states were prevented. I utilized Jotai for atomic state changes and persisted state, ensuring no progress was lost if an agent refreshed the page. React Query was employed for making API calls to various endpoints.
    </p>
  </div>
  <div class="project-content">
    <h2>Key Implementations</h2>
    <p>
      Initially, we planned to use the out-of-the-box call panel UI provided by Amazon Connect. However, it became clear that it did not meet our needs, as agents found it difficult to understand. Therefore, we customized our own call panel with the following features:
    </p>
    <ul class="content-list">
      <li>
        Task-Based Outbound Calls: For outbound calls, we created tasks in Amazon Connect populated with relevant information and phone numbers that agents could click to call, reducing errors and repetitive dialing.
      </li>
      <li>
        Data Integration: Leveraged Amazon Connect Customer Profiles API and React Query to fetch necessary information for each contact. Due to some Amazon Connect features not being available in Japan, we set up an API using the Serverless framework and a DocumentDB instance to manage unstructured datasets.
      </li>
      <li>Enhanced Call Reporting: Added a form for agents to provide comments and statuses after handling calls, greatly reducing data entry errors.</li>
      <li>Streamlined Workflow: Removed unnecessary steps, automatically closing tasks after call reports were submitted to save agents time and improve efficiency.</li>
      <li>
        Monitoring and Issue Resolution: Implemented monitoring via Sentry. One great feature I’ve experimented with is Sentry Session Replays to record and stream UIs along with errors for easier troubleshooting.
      </li>
      <li>
        One significant challenge was the authentication process with Amazon Connect, which had limited compatibility with external SAML providers. We resolved this by using AWS Cognito as Identity provider, to retrieve a federation token, allowing the front-end to authenticate with Amazon Connect using the same email address.
      </li>
    </ul>
    <ProjectImage
      alt-text="view the calliope call report panel"
      url="/calliope-report.webp"
      caption="Call panel - make a call report"
    />
    <p>
      By implementing these solutions, Calliope has significantly improved the call center efficiency, enabling agents to handle more contacts with fewer errors and providing managers with better tools for monitoring and training.
    </p>
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
  name: "CalliopeContent",
  components: { ProjectSummary, ProjectImage },
  props: { modifier: { type: String, required: false, default: "" } },
  setup() {
    const summary = {
      position: "Web engineer",
      organization: "Scoville",
      work: ["Front-end dev"],
      stack: [
        "React",
        "Amazon Connect",
        "TypeScript",
        "Tailwind CSS",
        "Terraform",
        "Jenkins",
        "Sentry",
        "Serverless",
        "ViteJS"
      ],
      years: "2023 -",
    };
    return { summary };
  },
});
</script>
