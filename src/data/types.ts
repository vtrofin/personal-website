export type NarrativeBlock =
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt: string };

export interface ProjectData {
  slug: string;
  title: string;
  excerpt: string;
  outcomeTag: string;
  accentColorToken: string;
  openingProblem: string;
  narrative: NarrativeBlock[];
  stackItems: string[];
}

export interface HeroData {
  animationTextLines: string[];
}
