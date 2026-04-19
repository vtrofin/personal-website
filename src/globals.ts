export const allProjects = [
  "eyeq",
  "calliope",
  "ats",
  "shipandco",
  // "dummy",
] as const;

export type ProjectName = (typeof allProjects)[number];
