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

export function getProjectImageUrls(slug: ProjectName): string[] {
  const data = projectDataBySlug[slug];

  if (!data) {
    return [];
  }

  const urls: string[] = [];

  for (const b of data.narrative) {
    if (b.type !== "image") {
      continue;
    }

    if (b.srcSmall) {
      urls.push(b.srcSmall);
    }

    urls.push(b.src);
  }

  return urls;
}

const seen = new Set<string>();

export function warmImageUrls(urls: string[]): void {
  if (import.meta.env.SSR || typeof Image === "undefined") {
    return;
  }

  for (const href of urls) {
    if (!href || seen.has(href)) {
      continue;
    }

    seen.add(href);
    new Image().src = href;
  }
}
