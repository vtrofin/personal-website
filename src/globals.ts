export const allProjects = [
  "calliope",
  "ats",
  "staff",
  "stockandco",
  "shipandco",
  "utils",
  "bentoandco",
] as const;

export type ProjectName = (typeof allProjects)[number];
