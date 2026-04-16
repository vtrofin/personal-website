import { defineStore } from "pinia";
import { allProjects, type ProjectName } from "src/globals";
import type { Project, ProjectsModuleState } from "@store/modules/module_types";

type ProjectsState = ProjectsModuleState & {
  projectsData: Record<ProjectName, Project>;
};

export const useProjectsStore = defineStore("projects", {
  state: (): ProjectsState => ({
    projects: allProjects,
    activeProject: "",
    projectsData: {
      ats: {
        type: "project",
        backgroundClass: "ats-background",
        excerpt:
          "Applicant tracking system for handling job applications and hiring",
        item_title: "Bluum Hire",
        role: "Full-stack web engineer",
      },
      shipandco: {
        type: "project",
        logoClass: "shipandco-logo",
        backgroundClass: "shipandco-background",
        excerpt: "Shipping management solution for eCommerce",
        item_title: "Ship&Co",
        role: "Full-stack web engineer",
      },
      calliope: {
        type: "project",
        backgroundClass: "calliope-background",
        excerpt: "AI powered call center",
        item_title: "Calliope AI",
        role: "Full-stack web engineer",
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
    setActiveProject(project: string) {
      this.activeProject = project;
    },
  },
});
