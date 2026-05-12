import type { ProjectName } from "@/globals";
import { projectDataBySlug } from "@/data/projects";

const baseUrl = __SITE_URL__;

const jsonLdScriptsPerson = {
  type: "application/ld+json",
  innerHTML: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Victor Trofin",
    jobTitle: "Web Engineer",
    url: baseUrl,
    sameAs: ["https://github.com/vtrofin"],
  }),
};

const homePageOgData = [
  { property: "og:url", content: baseUrl },
  { property: "og:type", content: "website" },
  { property: "og:image", content: `${baseUrl}/og_image.jpg` },
];

const metaTags = {
  notFound: {
    title: "Victor Trofin — Page not found",
    meta: [
      {
        name: "description",
        content: "I'm sorry, I can't find the page you are looking for.",
      },
      {
        name: "keywords",
        content:
          "React, Vue.js, Node.js, full stack, web engineer, developer, Kyoto, Japan",
      },
      { property: "og:title", content: "Victor Trofin — Page not found" },
      {
        property: "og:description",
        content: "I'm sorry, I can't find the page you are looking for.",
      },
      ...homePageOgData,
    ],
    script: [jsonLdScriptsPerson],
  },
  homePage: {
    title: "Victor Trofin — Web Engineer in Kyoto, Japan",
    meta: [
      {
        name: "description",
        content:
          "I build software tools that give people their time back. Web engineer based in Kyoto, Japan. See my work and get in touch.",
      },
      {
        property: "og:title",
        content: "Victor Trofin — Web Engineer in Kyoto, Japan",
      },
      {
        property: "og:description",
        content:
          "I build software tools that give people their time back. Web engineer based in Kyoto, Japan. See my work and get in touch.",
      },
      ...homePageOgData,
    ],
    script: [jsonLdScriptsPerson],
  },
  project: (slug?: ProjectName) => {
    if (!slug || !projectDataBySlug[slug]) {
      return {
        title: "Victor Trofin — Projects",
        meta: [
          {
            name: "description",
            content:
              "A selection of projects I've worked on as a web engineer. Full-stack development with React, Vue.js, Node.js, and more.",
          },
        ],
      };
    }

    const projectData = projectDataBySlug[slug];
    const techStack = projectData.stackItems.length
      ? projectData.stackItems.join(", ")
      : "various technologies";

    const metaTitle = `Victor Trofin — ${projectData.title} project`;
    const metaDescription = `Full-stack web engineer for ${projectData.title} - ${projectData.excerpt}`;
    const metaKeywords = techStack.trim().substring(0, 160);
    const url = `${baseUrl}/projects/${slug}`;

    return {
      title: metaTitle,
      meta: [
        {
          name: "description",
          content: metaDescription.trim().substring(0, 160),
        },
        { name: "keywords", content: metaKeywords },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: `${baseUrl}/og_image.jpg` },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: projectData.title,
            description: metaDescription,
            url,
            author: {
              "@type": "Person",
              name: "Victor Trofin",
              url: baseUrl,
            },
          }),
        },
      ],
    };
  },
};

export { metaTags };
