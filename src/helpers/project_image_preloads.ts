import { projectDataBySlug } from "@/data/projects";
import type { ProjectName } from "@/globals";

/** Same breakpoints as `project_image.vue` picture sources. */
const SM = "(max-width: 768px)";
const LG = "(min-width: 769px)";

type PreloadLink = { rel: "preload"; as: "image"; href: string; media?: string };

const seen = new Set<string>();

/** Head preload entries + URL lists for warming (single pass over narrative). */
export function projectImageAssets(slug: ProjectName): {
  links: PreloadLink[];
  urls: string[];
  heroUrls: string[];
} {
  const data = projectDataBySlug[slug];
  if (!data) return { links: [], urls: [], heroUrls: [] };

  const links: PreloadLink[] = [];
  const urls: string[] = [];
  let heroUrls: string[] | undefined;

  for (const b of data.narrative) {
    if (b.type !== "image") continue;

    if (!heroUrls) heroUrls = b.srcSmall ? [b.srcSmall, b.src] : [b.src];

    if (b.srcSmall) {
      links.push(
        { rel: "preload", as: "image", href: b.srcSmall, media: SM },
        { rel: "preload", as: "image", href: b.src, media: LG },
      );
      urls.push(b.srcSmall, b.src);
    } else {
      links.push({ rel: "preload", as: "image", href: b.src });
      urls.push(b.src);
    }
  }

  return { links, urls: [...new Set(urls)], heroUrls: heroUrls ?? [] };
}

/** `new Image().src` once per URL per tab (hover + route). */
export function warmImageUrls(urls: string[]): void {
  if (import.meta.env.SSR || typeof Image === "undefined") return;
  for (const href of urls) {
    if (!href || seen.has(href)) continue;
    seen.add(href);
    new Image().src = href;
  }
}
