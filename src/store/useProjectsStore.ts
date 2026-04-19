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
        excerpt: eyeqData.excerpt,
        item_title: eyeqData.title,
        role: eyeqData.summary.position,
        outcomeTag: eyeqData.outcomeTag,
      },
      ats: {
        type: "project",
        excerpt: atsData.excerpt,
        item_title: atsData.title,
        role: atsData.summary.position,
        outcomeTag: atsData.outcomeTag,
      },
      shipandco: {
        type: "project",
        excerpt: shipandcoData.excerpt,
        item_title: shipandcoData.title,
        role: shipandcoData.summary.position,
        outcomeTag: shipandcoData.outcomeTag,
      },
      calliope: {
        type: "project",
        excerpt: calliopeData.excerpt,
        item_title: calliopeData.title,
        role: calliopeData.summary.position,
        outcomeTag: calliopeData.outcomeTag,
      },
      // dummy: {
      //   type: "project",
      //   excerpt: "A placeholder project for testing the grid layout",
      //   item_title: "Dummy Project",
      //   role: "Full-stack",
      //   outcomeTag: "Testing the grid",
      // },
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
