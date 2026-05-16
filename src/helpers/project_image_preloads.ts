import { projectDataBySlug } from "@/data/projects";
import type { ProjectName } from "@/globals";

/** Same breakpoints as `project_image.vue` picture sources. */
const SM = "(max-width: 768px)";
const LG = "(min-width: 769px)";

type PreloadLink = {
  rel: "preload";
  as: "image";
  href: string;
  media?: string;
};

export function getProjectPreloadLinks(slug: ProjectName): PreloadLink[] {
  const data = projectDataBySlug[slug];

  if (!data) {
    return [];
  }

  const links: PreloadLink[] = [];

  for (const b of data.narrative) {
    if (b.type !== "image") {
      continue;
    }

    if (b.srcSmall) {
      links.push({ rel: "preload", as: "image", href: b.srcSmall, media: SM });
    }

    links.push({
      rel: "preload",
      as: "image",
      href: b.src,
      media: b.srcSmall ? LG : undefined,
    });
  }

  return links;
}
