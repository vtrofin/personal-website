export type NarrativeBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt: string; srcSmall?: string };

export interface ProjectSummary {
  position: string;
  organization: string;
  work: string[];
  years: string;
}

/** Props for `project_summary.vue` — project `summary` plus UI `stack` from `stackItems`. */
export type ProjectSummaryOptions = ProjectSummary & {
  stack: string[];
};

export interface ProjectData {
  slug: string;
  title: string;
  excerpt: string;
  outcomeTag: string;
  accentColorToken: string;
  openingProblem: string;
  narrative: NarrativeBlock[];
  stackItems: string[];
  summary: ProjectSummary;
}

export interface HeroData {
  animationTextLines: string[];
}
