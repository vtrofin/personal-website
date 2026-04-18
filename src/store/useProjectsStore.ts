import { defineStore } from "pinia";
import { allProjects, type ProjectName } from "src/globals";
import type { Project, ProjectsModuleState } from "@store/modules/module_types";
import { calliopeData } from "../data/projects/calliope";
import { atsData } from "../data/projects/ats";
import { shipandcoData } from "../data/projects/shipandco";
import { eyeqData } from "../data/projects/eyeq";

type ProjectsState = ProjectsModuleState & {
  projectsData: Record<ProjectName, Project>;
};

export const useProjectsStore = defineStore("projects", {
  state: (): ProjectsState => ({
    projects: allProjects,
    activeProject: undefined,
    projectsData: {
      eyeq: {
        type: "project",
        backgroundClass: "eyeq-background",
        excerpt: eyeqData.excerpt,
        item_title: eyeqData.title,
        role: "Full-stack web engineer",
        outcomeTag: eyeqData.outcomeTag,
      },
      ats: {
        type: "project",
        backgroundClass: "ats-background",
        excerpt: atsData.excerpt,
        item_title: atsData.title,
        role: "Full-stack web engineer",
        outcomeTag: atsData.outcomeTag,
      },
      shipandco: {
        type: "project",
        logoClass: "shipandco-logo",
        backgroundClass: "shipandco-background",
        excerpt: shipandcoData.excerpt,
        item_title: shipandcoData.title,
        role: "Full-stack web engineer",
        outcomeTag: shipandcoData.outcomeTag,
      },
      calliope: {
        type: "project",
        backgroundClass: "calliope-background",
        excerpt: calliopeData.excerpt,
        item_title: calliopeData.title,
        role: "Full-stack web engineer",
        outcomeTag: calliopeData.outcomeTag,
      },
    },
  }),
  getters: {
    getProjectByName:
      (state) =>
      (name: ProjectName): Project => {
        const project = state.projectsData[name];

        if (!project) {
          throw new Error(`Project not found: ${name}`);
        }

        return project;
      },
  },
  actions: {
    setActiveProject(project: ProjectName | undefined) {
      this.activeProject = project;
    },
  },
});
