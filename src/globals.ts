export const allProjects = [
  "calliope",
  "ats",
  "shipandco",
] as const;

export type ProjectName = (typeof allProjects)[number];
