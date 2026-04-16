export const allProjects = [
  "eyeq",
  "calliope",
  "ats",
  "shipandco",
] as const;

export type ProjectName = (typeof allProjects)[number];
