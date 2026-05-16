import { projectDataBySlug } from "@/data/projects";
import type { ProjectName } from "@/globals";

/** Matches `<picture>` breakpoints in `project_image.vue`. */
const MEDIA_SMALL = "(max-width: 768px)";
const MEDIA_LARGE = "(min-width: 769px)";

export type ProjectImagePreloadLink = {
  rel: "preload";
  as: "image";
  href: string;
  media?: string;
};

/** Collect preload descriptors for every narrative image on a project page. */
export function getProjectImagePreloadDescriptors(
  slug: ProjectName,
): ProjectImagePreloadLink[] {
  const data = projectDataBySlug[slug];
  if (!data) return [];

  const links: ProjectImagePreloadLink[] = [];

  for (const block of data.narrative) {
    if (block.type !== "image") continue;

    if (block.srcSmall) {
      links.push({
        rel: "preload",
        as: "image",
        href: block.srcSmall,
        media: MEDIA_SMALL,
      });
      links.push({
        rel: "preload",
        as: "image",
        href: block.src,
        media: MEDIA_LARGE,
      });
    } else {
      links.push({ rel: "preload", as: "image", href: block.src });
    }
  }

  return links;
}

function preloadHrefSet(slug: ProjectName): Set<string> {
  return new Set(getProjectImagePreloadDescriptors(slug).map((e) => e.href));
}

/** Removes preload hints for a project's images (SSR + client-injected). */
export function removeHeadPreloadsForProject(slug: ProjectName): void {
  if (import.meta.env.SSR || typeof document === "undefined") return;

  const hrefs = preloadHrefSet(slug);
  document.querySelectorAll('link[rel="preload"][as="image"]').forEach((el) => {
    const h = el.getAttribute("href");
    if (h && hrefs.has(h)) el.remove();
  });
}

/** Unique asset URLs for all narrative images (full-size + small variants). */
export function getProjectImageWarmupUrls(slug: ProjectName): string[] {
  const data = projectDataBySlug[slug];
  if (!data) return [];

  const urls: string[] = [];
  for (const block of data.narrative) {
    if (block.type !== "image") continue;
    if (block.srcSmall) urls.push(block.srcSmall);
    urls.push(block.src);
  }
  return [...new Set(urls)];
}

/** URLs for the first narrative image only (cheap hover hint before navigation). */
export function getProjectHeroImageWarmupUrls(slug: ProjectName): string[] {
  const data = projectDataBySlug[slug];
  if (!data) return [];

  for (const block of data.narrative) {
    if (block.type !== "image") continue;
    if (block.srcSmall) return [block.srcSmall, block.src];
    return [block.src];
  }
  return [];
}

/**
 * Prime HTTP + image decoder caches (`<img>` hits cache sooner than preload alone on some paths).
 */
export function warmImageUrls(urls: string[]): void {
  if (import.meta.env.SSR || typeof Image === "undefined") return;
  for (const href of urls) {
    const img = new Image();
    img.src = href;
  }
}

/**
 * Client-only: starts image fetches before route components render (SPA navigations).
 * Skips entries already present from SSG. When switching projects, call
 * `removeHeadPreloadsForProject` for the previous slug first (see router guard).
 */
export function injectDomProjectImagePreloads(slug: ProjectName): void {
  if (import.meta.env.SSR || typeof document === "undefined") return;

  for (const entry of getProjectImagePreloadDescriptors(slug)) {
    const alreadyInHead = [...document.head.querySelectorAll('link[rel="preload"][as="image"]')].some(
      (el) =>
        el.getAttribute("href") === entry.href &&
        (entry.media ? el.media === entry.media : !el.media),
    );
    if (alreadyInHead) continue;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = entry.href;
    if (entry.media) link.media = entry.media;
    document.head.appendChild(link);
  }
}
