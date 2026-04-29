import type { ProjectData } from "../types";
import { calliopeData } from "./calliope";
import { atsData } from "./ats";
import { shipandcoData } from "./shipandco";
import { eyeqData } from "./eyeq";
import type { ProjectName } from "src/globals";

export const projectDataBySlug: Record<ProjectName, ProjectData> = {
  calliope: calliopeData,
  ats: atsData,
  shipandco: shipandcoData,
  eyeq: eyeqData,
};
