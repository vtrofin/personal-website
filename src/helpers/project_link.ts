import { projectDataBySlug } from "@/data/projects";
import type { ProjectName } from "@/globals";

function slugFromProjectsPath(path: string): ProjectName | undefined {
  const clean = path.split("?")[0]?.split("#")[0] ?? "";
  const m = /^\/projects\/([^/]+)\/?$/.exec(clean);
  const slug = m?.[1];
  if (slug && slug in projectDataBySlug) return slug as ProjectName;
  return undefined;
}

/** Resolve a project slug from `RouterLink` `to` when it targets a project page. */
export function projectSlugFromLinkTo(to: unknown): ProjectName | undefined {
  if (typeof to === "string") {
    return slugFromProjectsPath(to);
  }

  if (!to || typeof to !== "object") return undefined;

  const o = to as Record<string, unknown>;

  if (o.name === "projectItem") {
    const params = o.params as Record<string, unknown> | undefined;
    const raw = params?.project_item;
    const s = Array.isArray(raw) ? raw[0] : raw;
    if (typeof s === "string" && s in projectDataBySlug) return s as ProjectName;
  }

  if (typeof o.path === "string") {
    return slugFromProjectsPath(o.path);
  }

  return undefined;
}
